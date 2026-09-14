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
      availability_requests: {
        Row: {
          accommodation_area: string | null
          adults: number
          alternative_date: string | null
          certification: string | null
          child_ages: string | null
          children: number
          client_email_status: string
          client_provider_id: string | null
          created_at: string
          desired_duration: string | null
          details: string | null
          dive_count: string | null
          drivers: number | null
          email: string
          email_error: string | null
          experience_id: string
          experience_slug: string
          flexible_dates: boolean
          flow: string
          full_name: string
          guest_type: string | null
          hotel_name: string | null
          id: string
          idempotency_key: string | null
          internal_email_status: string
          internal_provider_id: string | null
          language: string
          last_dive_date: string | null
          passengers: number | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          prior_experience: string | null
          product_name: string
          reference: string
          responsible_adult: string | null
          source_page: string | null
          status: string
          updated_at: string
          variant: string | null
        }
        Insert: {
          accommodation_area?: string | null
          adults?: number
          alternative_date?: string | null
          certification?: string | null
          child_ages?: string | null
          children?: number
          client_email_status?: string
          client_provider_id?: string | null
          created_at?: string
          desired_duration?: string | null
          details?: string | null
          dive_count?: string | null
          drivers?: number | null
          email: string
          email_error?: string | null
          experience_id: string
          experience_slug: string
          flexible_dates?: boolean
          flow?: string
          full_name: string
          guest_type?: string | null
          hotel_name?: string | null
          id?: string
          idempotency_key?: string | null
          internal_email_status?: string
          internal_provider_id?: string | null
          language?: string
          last_dive_date?: string | null
          passengers?: number | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          prior_experience?: string | null
          product_name: string
          reference: string
          responsible_adult?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
          variant?: string | null
        }
        Update: {
          accommodation_area?: string | null
          adults?: number
          alternative_date?: string | null
          certification?: string | null
          child_ages?: string | null
          children?: number
          client_email_status?: string
          client_provider_id?: string | null
          created_at?: string
          desired_duration?: string | null
          details?: string | null
          dive_count?: string | null
          drivers?: number | null
          email?: string
          email_error?: string | null
          experience_id?: string
          experience_slug?: string
          flexible_dates?: boolean
          flow?: string
          full_name?: string
          guest_type?: string | null
          hotel_name?: string | null
          id?: string
          idempotency_key?: string | null
          internal_email_status?: string
          internal_provider_id?: string | null
          language?: string
          last_dive_date?: string | null
          passengers?: number | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          prior_experience?: string | null
          product_name?: string
          reference?: string
          responsible_adult?: string | null
          source_page?: string | null
          status?: string
          updated_at?: string
          variant?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_code: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          date: string
          guests: number
          hotel: string | null
          id: string
          locale: string
          notes: string | null
          pre_notice_accepted: boolean
          room: string | null
          slug: string
          status: string
          time: string
          title: string
          updated_at: string
          waiver_checked: boolean
          waiver_url: string | null
        }
        Insert: {
          booking_code?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          date: string
          guests?: number
          hotel?: string | null
          id?: string
          locale: string
          notes?: string | null
          pre_notice_accepted?: boolean
          room?: string | null
          slug: string
          status?: string
          time: string
          title: string
          updated_at?: string
          waiver_checked?: boolean
          waiver_url?: string | null
        }
        Update: {
          booking_code?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          date?: string
          guests?: number
          hotel?: string | null
          id?: string
          locale?: string
          notes?: string | null
          pre_notice_accepted?: boolean
          room?: string | null
          slug?: string
          status?: string
          time?: string
          title?: string
          updated_at?: string
          waiver_checked?: boolean
          waiver_url?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          error_code: string | null
          guest_type: string | null
          id: string
          language: string
          message: string
          name: string
          phone: string | null
          preferred_date: string | null
          provider_message_id: string | null
          source_page: string | null
          status: string
          topic: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          error_code?: string | null
          guest_type?: string | null
          id?: string
          language?: string
          message: string
          name: string
          phone?: string | null
          preferred_date?: string | null
          provider_message_id?: string | null
          source_page?: string | null
          status?: string
          topic?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          error_code?: string | null
          guest_type?: string | null
          id?: string
          language?: string
          message?: string
          name?: string
          phone?: string | null
          preferred_date?: string | null
          provider_message_id?: string | null
          source_page?: string | null
          status?: string
          topic?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      booking_availability: {
        Row: {
          date: string | null
          slug: string | null
          status: string | null
          time: string | null
        }
        Insert: {
          date?: string | null
          slug?: string | null
          status?: string | null
          time?: string | null
        }
        Update: {
          date?: string | null
          slug?: string | null
          status?: string | null
          time?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
