export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          child_id: string | null
          coordinator_id: string | null
          created_at: string
          id: string
          location: string | null
          mode: Database["public"]["Enums"]["appt_mode"]
          notes: string | null
          parent_id: string
          scheduled_at: string
          status: Database["public"]["Enums"]["appt_status"]
          updated_at: string
        }
        Insert: {
          child_id?: string | null
          coordinator_id?: string | null
          created_at?: string
          id?: string
          location?: string | null
          mode?: Database["public"]["Enums"]["appt_mode"]
          notes?: string | null
          parent_id: string
          scheduled_at: string
          status?: Database["public"]["Enums"]["appt_status"]
          updated_at?: string
        }
        Update: {
          child_id?: string | null
          coordinator_id?: string | null
          created_at?: string
          id?: string
          location?: string | null
          mode?: Database["public"]["Enums"]["appt_mode"]
          notes?: string | null
          parent_id?: string
          scheduled_at?: string
          status?: Database["public"]["Enums"]["appt_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          age_years: number | null
          created_at: string
          current_therapies: string | null
          id: string
          name: string | null
          notes: string | null
          parent_id: string | null
          primary_concern: string | null
        }
        Insert: {
          age_years?: number | null
          created_at?: string
          current_therapies?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          parent_id?: string | null
          primary_concern?: string | null
        }
        Update: {
          age_years?: number | null
          created_at?: string
          current_therapies?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          parent_id?: string | null
          primary_concern?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "children_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          tl_name: string | null
          tl_user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          tl_name?: string | null
          tl_user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          tl_name?: string | null
          tl_user_id?: string | null
        }
        Relationships: []
      }
      escalations: {
        Row: {
          assigned_role: Database["public"]["Enums"]["app_role"]
          created_at: string
          id: string
          lead_id: string
          resolution_note: string | null
          resolved_at: string | null
          severity: number
          sla_due_at: string | null
          status: Database["public"]["Enums"]["escalation_status"]
          type: Database["public"]["Enums"]["escalation_type"]
        }
        Insert: {
          assigned_role: Database["public"]["Enums"]["app_role"]
          created_at?: string
          id?: string
          lead_id: string
          resolution_note?: string | null
          resolved_at?: string | null
          severity?: number
          sla_due_at?: string | null
          status?: Database["public"]["Enums"]["escalation_status"]
          type: Database["public"]["Enums"]["escalation_type"]
        }
        Update: {
          assigned_role?: Database["public"]["Enums"]["app_role"]
          created_at?: string
          id?: string
          lead_id?: string
          resolution_note?: string | null
          resolved_at?: string | null
          severity?: number
          sla_due_at?: string | null
          status?: Database["public"]["Enums"]["escalation_status"]
          type?: Database["public"]["Enums"]["escalation_type"]
        }
        Relationships: [
          {
            foreignKeyName: "escalations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_snippets: {
        Row: {
          active: boolean
          category: string
          content: string
          display_order: number
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          active?: boolean
          category: string
          content: string
          display_order?: number
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          active?: boolean
          category?: string
          content?: string
          display_order?: number
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_snippets_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          lead_id: string
          role: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          lead_id: string
          role: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          lead_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_messages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          anon_session_id: string | null
          child_id: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          id: string
          owner_id: string | null
          parent_id: string | null
          source: string
          stage: Database["public"]["Enums"]["lead_stage"]
          summary: string | null
          updated_at: string
          urgency: number
        }
        Insert: {
          anon_session_id?: string | null
          child_id?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          owner_id?: string | null
          parent_id?: string | null
          source?: string
          stage?: Database["public"]["Enums"]["lead_stage"]
          summary?: string | null
          updated_at?: string
          urgency?: number
        }
        Update: {
          anon_session_id?: string | null
          child_id?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          owner_id?: string | null
          parent_id?: string | null
          source?: string
          stage?: Database["public"]["Enums"]["lead_stage"]
          summary?: string | null
          updated_at?: string
          urgency?: number
        }
        Relationships: [
          {
            foreignKeyName: "leads_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          child_id: string
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          parent_id: string
          phase: string
          status: Database["public"]["Enums"]["task_status"]
          title: string
          week: number
        }
        Insert: {
          child_id: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          parent_id: string
          phase: string
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          week?: number
        }
        Update: {
          child_id?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          parent_id?: string
          phase?: string
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          week?: number
        }
        Relationships: [
          {
            foreignKeyName: "modules_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_orders: {
        Row: {
          base_amount: number
          buyer_email: string | null
          buyer_name: string | null
          buyer_phone: string | null
          created_at: string
          currency: string
          gst_amount: number
          id: string
          notes: Json | null
          paid_at: string | null
          plan_type: string
          processing_fee: number
          program_key: string
          program_name: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          schedule: Json
          status: string
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          base_amount: number
          buyer_email?: string | null
          buyer_name?: string | null
          buyer_phone?: string | null
          created_at?: string
          currency?: string
          gst_amount: number
          id?: string
          notes?: Json | null
          paid_at?: string | null
          plan_type: string
          processing_fee?: number
          program_key: string
          program_name: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          schedule?: Json
          status?: string
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          base_amount?: number
          buyer_email?: string | null
          buyer_name?: string | null
          buyer_phone?: string | null
          created_at?: string
          currency?: string
          gst_amount?: number
          id?: string
          notes?: Json | null
          paid_at?: string | null
          plan_type?: string
          processing_fee?: number
          program_key?: string
          program_name?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          schedule?: Json
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          assigned_at: string
          child_id: string | null
          id: string
          link: string | null
          name: string
          notes: string | null
          parent_id: string
          type: string | null
        }
        Insert: {
          assigned_at?: string
          child_id?: string | null
          id?: string
          link?: string | null
          name: string
          notes?: string | null
          parent_id: string
          type?: string | null
        }
        Update: {
          assigned_at?: string
          child_id?: string | null
          id?: string
          link?: string | null
          name?: string
          notes?: string | null
          parent_id?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          department_id: string | null
          full_name: string | null
          id: string
          is_tl: boolean
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          department_id?: string | null
          full_name?: string | null
          id: string
          is_tl?: boolean
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          department_id?: string | null
          full_name?: string | null
          id?: string
          is_tl?: boolean
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      progress_reports: {
        Row: {
          author_id: string | null
          child_id: string
          created_at: string
          id: string
          parent_id: string
          phase: string | null
          summary: string
          week_start: string
        }
        Insert: {
          author_id?: string | null
          child_id: string
          created_at?: string
          id?: string
          parent_id: string
          phase?: string | null
          summary: string
          week_start: string
        }
        Update: {
          author_id?: string | null
          child_id?: string
          created_at?: string
          id?: string
          parent_id?: string
          phase?: string | null
          summary?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_reports_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_by: string | null
          assignee_id: string | null
          created_at: string
          department_id: string
          description: string | null
          due_date: string | null
          id: string
          month_bucket: string
          priority: Database["public"]["Enums"]["task_priority"]
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_by?: string | null
          assignee_id?: string | null
          created_at?: string
          department_id: string
          description?: string | null
          due_date?: string | null
          id?: string
          month_bucket: string
          priority?: Database["public"]["Enums"]["task_priority"]
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_by?: string | null
          assignee_id?: string | null
          created_at?: string
          department_id?: string
          description?: string | null
          due_date?: string | null
          id?: string
          month_bucket?: string
          priority?: Database["public"]["Enums"]["task_priority"]
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_department_coordinator: {
        Args: { _dept: string; _user: string }
        Returns: boolean
      }
      is_department_member: {
        Args: { _dept: string; _user: string }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "parent_prospect"
        | "parent_enrolled"
        | "coordinator"
        | "clinical_advisor"
        | "sales"
        | "content_manager"
        | "admin"
        | "employee"
      appt_mode: "in_person" | "call" | "video"
      appt_status: "scheduled" | "completed" | "cancelled" | "no_show"
      escalation_status: "open" | "in_progress" | "resolved"
      escalation_type:
        | "emotional_distress"
        | "clinical_complexity"
        | "payment_issue"
        | "technical_issue"
        | "conversion_ready"
        | "other"
      lead_stage:
        | "new"
        | "diagnostic"
        | "trust_building"
        | "offer"
        | "paid"
        | "onboarded"
        | "lost"
      task_priority: "low" | "normal" | "high" | "urgent"
      task_status: "todo" | "in_progress" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "parent_prospect",
        "parent_enrolled",
        "coordinator",
        "clinical_advisor",
        "sales",
        "content_manager",
        "admin",
        "employee",
      ],
      appt_mode: ["in_person", "call", "video"],
      appt_status: ["scheduled", "completed", "cancelled", "no_show"],
      escalation_status: ["open", "in_progress", "resolved"],
      escalation_type: [
        "emotional_distress",
        "clinical_complexity",
        "payment_issue",
        "technical_issue",
        "conversion_ready",
        "other",
      ],
      lead_stage: [
        "new",
        "diagnostic",
        "trust_building",
        "offer",
        "paid",
        "onboarded",
        "lost",
      ],
      task_priority: ["low", "normal", "high", "urgent"],
      task_status: ["todo", "in_progress", "done"],
    },
  },
} as const
