# Parent Login, Portal, and Lead Conversion Plan

## Goal
Give families one account for their enquiry and parent portal, while showing the full journey from first lead through booking, payment, and enrolment.

## Parent account and login
- Add a public **Parent Login** page with email/password and Google sign-in.
- Allow open registration, with email confirmation before password accounts become active.
- Reuse the existing parent profile record created at registration; do not create a second identity system.
- Add **Parent Login** to the desktop and mobile navigation. When signed in, show **My Portal** and **Sign out** instead.
- Include forgot-password and reset-password screens.

## Registration details
Collect these required fields during registration:
- Parent full name
- Email address
- Mobile number
- Child name
- Child age
- Primary concern
- City / district
- PIN / ZIP code

Match an existing lead by verified email or normalized phone number. If no match exists, create a parent-owned lead without allowing the browser to set internal stage or ownership fields.

## Recommended conversion journey
Track these milestones with timestamps:
1. **New enquiry** — a lead or booking form is submitted.
2. **Contacted** — the team makes first contact.
3. **Counselling scheduled** — an appointment is booked.
4. **Counselling completed** — the appointment is completed.
5. **Payment pending** — a payment request/order exists.
6. **Paid** — payment is confirmed.
7. **Enrolled family** — the child begins the programme.

Preserve the original source, campaign, first enquiry time, booking time, first payment time, and enrolment time so conversion rates and time-to-convert can be measured accurately.

## Parent portal
Create a secure **My Portal** area with four sections:
- **Overview:** child summary, current programme stage, next session, and payment status.
- **Progress:** weekly reports, milestones, and assigned activities/modules.
- **Sessions:** upcoming and past appointments with date, time, format, location, and status.
- **Payments:** paid/pending status and payment history only; no card or bank details are stored.
- **Profile:** parent and child information, with safe contact-detail editing.

Empty states will explain that records appear after the IND team connects the family account.

## Security and data rules
- Protect the portal before it renders and verify the signed-in parent again for every private data request.
- Families can view only records linked to their own account.
- Profile edits cannot change ownership, internal lead stages, payment status, clinical records, or staff-managed fields.
- Link leads to accounts on the trusted server only after matching verified identity details.
- Keep staff-only operations unavailable from the parent portal.

## Technical details
- Use the existing `profiles`, `children`, `leads`, `appointments`, `modules`, `progress_reports`, and `payment_orders` records.
- Add a conversion-event history table with explicit access grants and row-level access controls, plus timestamp columns on leads for milestone reporting.
- Add protected server functions for portal reads and allowed profile updates.
- Enable email/password authentication and managed Google sign-in.
- Use the existing authenticated route gate and bearer-token middleware.
- Keep all public pages crawlable; login and portal pages will not be indexed.

## Verification
- Test registration, email login, Google login entry, sign-out, password recovery, and protected-route redirects.
- Verify one parent cannot read or modify another family’s records.
- Verify an existing lead links correctly after registration and a new registration creates a safe parent-owned lead.
- Verify progress, appointments, and payments render correctly, including empty states.
- Run production and development build checks.
