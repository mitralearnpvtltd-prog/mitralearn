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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          capstone_submitted: boolean | null
          certificate_id: string
          coding_challenge_score: number | null
          completion_date: string
          course_name: string | null
          created_at: string
          final_mcq_score: number
          id: string
          overall_band: string
          status: string | null
          student_name: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          capstone_submitted?: boolean | null
          certificate_id: string
          coding_challenge_score?: number | null
          completion_date?: string
          course_name?: string | null
          created_at?: string
          final_mcq_score: number
          id?: string
          overall_band: string
          status?: string | null
          student_name: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          capstone_submitted?: boolean | null
          certificate_id?: string
          coding_challenge_score?: number | null
          completion_date?: string
          course_name?: string | null
          created_at?: string
          final_mcq_score?: number
          id?: string
          overall_band?: string
          status?: string | null
          student_name?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          applicable_courses: string[] | null
          applies_to_all: boolean | null
          code: string
          created_at: string
          discount_type: string
          discount_value: number
          expiry_date: string | null
          id: string
          is_active: boolean | null
          minimum_order_value: number | null
          updated_at: string
          usage_count: number | null
          usage_limit: number | null
        }
        Insert: {
          applicable_courses?: string[] | null
          applies_to_all?: boolean | null
          code: string
          created_at?: string
          discount_type: string
          discount_value: number
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
          minimum_order_value?: number | null
          updated_at?: string
          usage_count?: number | null
          usage_limit?: number | null
        }
        Update: {
          applicable_courses?: string[] | null
          applies_to_all?: boolean | null
          code?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
          minimum_order_value?: number | null
          updated_at?: string
          usage_count?: number | null
          usage_limit?: number | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          badge: string | null
          badge_color: string | null
          category: string
          category_badge: string | null
          concepts: string[]
          created_at: string
          description: string
          duration: string
          extra_concepts_count: number | null
          icon_bg: string | null
          icon_type: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          original_price: number | null
          price: number
          rating: number | null
          reviews_count: string | null
          status: string
          students_count: string | null
          title: string
          updated_at: string
        }
        Insert: {
          badge?: string | null
          badge_color?: string | null
          category: string
          category_badge?: string | null
          concepts?: string[]
          created_at?: string
          description: string
          duration: string
          extra_concepts_count?: number | null
          icon_bg?: string | null
          icon_type?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          original_price?: number | null
          price?: number
          rating?: number | null
          reviews_count?: string | null
          status?: string
          students_count?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          badge?: string | null
          badge_color?: string | null
          category?: string
          category_badge?: string | null
          concepts?: string[]
          created_at?: string
          description?: string
          duration?: string
          extra_concepts_count?: number | null
          icon_bg?: string | null
          icon_type?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          original_price?: number | null
          price?: number
          rating?: number | null
          reviews_count?: string | null
          status?: string
          students_count?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          course_opted: boolean | null
          created_at: string
          email: string
          email_verified: boolean | null
          id: string
          last_login: string | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          course_opted?: boolean | null
          created_at?: string
          email: string
          email_verified?: boolean | null
          id?: string
          last_login?: string | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          course_opted?: boolean | null
          created_at?: string
          email?: string
          email_verified?: boolean | null
          id?: string
          last_login?: string | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          certificate_earned: boolean | null
          certificate_id: string | null
          coding_challenges_completed: number[] | null
          completed_days: number[] | null
          completed_quizzes: Json | null
          completed_weekly_assessments: number[] | null
          created_at: string
          current_streak: number | null
          final_assessment_score: number | null
          final_project_submitted: boolean | null
          id: string
          last_active_date: string | null
          longest_streak: number | null
          project_github_link: string | null
          project_video_link: string | null
          total_time_spent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          certificate_earned?: boolean | null
          certificate_id?: string | null
          coding_challenges_completed?: number[] | null
          completed_days?: number[] | null
          completed_quizzes?: Json | null
          completed_weekly_assessments?: number[] | null
          created_at?: string
          current_streak?: number | null
          final_assessment_score?: number | null
          final_project_submitted?: boolean | null
          id?: string
          last_active_date?: string | null
          longest_streak?: number | null
          project_github_link?: string | null
          project_video_link?: string | null
          total_time_spent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          certificate_earned?: boolean | null
          certificate_id?: string | null
          coding_challenges_completed?: number[] | null
          completed_days?: number[] | null
          completed_quizzes?: Json | null
          completed_weekly_assessments?: number[] | null
          created_at?: string
          current_streak?: number | null
          final_assessment_score?: number | null
          final_project_submitted?: boolean | null
          id?: string
          last_active_date?: string | null
          longest_streak?: number | null
          project_github_link?: string | null
          project_video_link?: string | null
          total_time_spent?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
      check_is_admin: { Args: { _user_id: string }; Returns: boolean }
      get_admin_dashboard_data: {
        Args: never
        Returns: {
          cert_id: string
          certificate_earned: boolean
          certificate_id: string
          certificate_status: string
          completed_days: number[]
          completed_modules_count: number
          completed_quizzes: Json
          completion_date: string
          course_opted: boolean
          email: string
          email_verified: boolean
          final_assessment_score: number
          final_project_submitted: boolean
          last_login: string
          name: string
          overall_band: string
          registered_at: string
          user_id: string
        }[]
      }
      get_admin_stats: {
        Args: never
        Returns: {
          active_users: number
          completion_rate: number
          total_certificates: number
          total_users: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      setup_first_admin: { Args: { _user_id: string }; Returns: boolean }
      verify_certificate: {
        Args: { cert_id: string }
        Returns: {
          capstone_submitted: boolean
          certificate_id: string
          coding_challenge_score: number
          completion_date: string
          final_mcq_score: number
          overall_band: string
          student_name: string
          verified: boolean
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
