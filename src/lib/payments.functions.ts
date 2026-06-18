import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ScheduleRow = z.object({
  n: z.number().int().min(1).max(24),
  label: z.string().min(1).max(64),
  amount: z.number().int().min(0),
});

const CreateOrderInput = z.object({
  programKey: z.string().min(1).max(64),
  programName: z.string().min(1).max(200),
  planType: z.enum(["full", "emi3", "emi6"]),
  baseAmount: z.number().int().min(1),
  gstAmount: z.number().int().min(0),
  processingFee: z.number().int().min(0),
  totalAmount: z.number().int().min(1),
  schedule: z.array(ScheduleRow).min(1).max(24),
  buyerName: z.string().trim().min(1).max(200),
  buyerEmail: z.string().trim().email().max(255),
  buyerPhone: z.string().trim().min(6).max(20),
});

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator((data) => CreateOrderInput.parse(data))
  .handler(async ({ data }) => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new Error("Payment gateway is not configured.");
    }

    // Server-side amount sanity check
    const expected = data.baseAmount + data.gstAmount + data.processingFee;
    if (expected !== data.totalAmount) {
      throw new Error("Amount mismatch.");
    }
    const scheduleSum = data.schedule.reduce((s, r) => s + r.amount, 0);
    if (scheduleSum !== data.totalAmount) {
      throw new Error("EMI schedule does not match total.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Try to get current user (optional — guests can also pay)
    let userId: string | null = null;
    try {
      const { getRequestHeader } = await import("@tanstack/react-start/server");
      const auth = getRequestHeader("authorization");
      if (auth?.startsWith("Bearer ")) {
        const { data: u } = await supabaseAdmin.auth.getUser(auth.slice(7));
        userId = u.user?.id ?? null;
      }
    } catch {
      // ignore — guest checkout allowed
    }

    // amount in paise
    const amountPaise = data.totalAmount * 100;
    const receipt = `ind_${Date.now().toString(36)}`;

    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt,
        notes: {
          program: data.programName,
          plan: data.planType,
          buyer: data.buyerEmail,
        },
      }),
    });

    if (!rzpRes.ok) {
      const text = await rzpRes.text();
      console.error("Razorpay order error:", rzpRes.status, text);
      throw new Error("Could not create payment order.");
    }
    const rzpOrder = (await rzpRes.json()) as { id: string; amount: number; currency: string };

    const { data: row, error } = await supabaseAdmin
      .from("payment_orders")
      .insert({
        user_id: userId,
        program_key: data.programKey,
        program_name: data.programName,
        plan_type: data.planType,
        base_amount: data.baseAmount,
        gst_amount: data.gstAmount,
        processing_fee: data.processingFee,
        total_amount: data.totalAmount,
        schedule: data.schedule,
        razorpay_order_id: rzpOrder.id,
        buyer_name: data.buyerName,
        buyer_email: data.buyerEmail,
        buyer_phone: data.buyerPhone,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Insert payment_order failed:", error);
      throw new Error("Could not save payment order.");
    }

    return {
      orderId: row.id,
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId, // publishable
    };
  });

const VerifyInput = z.object({
  orderId: z.string().uuid(),
  razorpayOrderId: z.string().min(1).max(64),
  razorpayPaymentId: z.string().min(1).max(64),
  razorpaySignature: z.string().min(1).max(256),
});

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .inputValidator((data) => VerifyInput.parse(data))
  .handler(async ({ data }) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) throw new Error("Payment gateway is not configured.");
    const { createHmac, timingSafeEqual } = await import("node:crypto");

    const expected = createHmac("sha256", keySecret)
      .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
      .digest("hex");

    const ok =
      expected.length === data.razorpaySignature.length &&
      timingSafeEqual(Buffer.from(expected), Buffer.from(data.razorpaySignature));

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (!ok) {
      await supabaseAdmin
        .from("payment_orders")
        .update({ status: "failed" })
        .eq("id", data.orderId);
      throw new Error("Payment signature verification failed.");
    }

    const { data: row, error } = await supabaseAdmin
      .from("payment_orders")
      .update({
        status: "paid",
        razorpay_payment_id: data.razorpayPaymentId,
        razorpay_signature: data.razorpaySignature,
        paid_at: new Date().toISOString(),
      })
      .eq("id", data.orderId)
      .eq("razorpay_order_id", data.razorpayOrderId)
      .select(
        "id, program_name, plan_type, base_amount, gst_amount, processing_fee, total_amount, schedule, buyer_name, buyer_email, buyer_phone, paid_at, razorpay_payment_id, razorpay_order_id"
      )
      .single();

    if (error || !row) {
      console.error("Update payment_order failed:", error);
      throw new Error("Could not finalize payment.");
    }

    return { order: row };
  });
