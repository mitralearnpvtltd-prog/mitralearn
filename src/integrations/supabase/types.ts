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
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
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
      course_change_logs: {
        Row: {
          action: string
          course_id: string | null
          log_id: string
          new_data: Json | null
          old_data: Json | null
          target_table: string
          timestamp: string | null
          user_id: string
        }
        Insert: {
          action: string
          course_id?: string | null
          log_id?: string
          new_data?: Json | null
          old_data?: Json | null
          target_table: string
          timestamp?: string | null
          user_id: string
        }
        Update: {
          action?: string
          course_id?: string | null
          log_id?: string
          new_data?: Json | null
          old_data?: Json | null
          target_table?: string
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_change_logs_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_lessons: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          lesson_id: string
          lesson_order: number
          lesson_type: Database["public"]["Enums"]["lesson_type"] | null
          module_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          lesson_id?: string
          lesson_order: number
          lesson_type?: Database["public"]["Enums"]["lesson_type"] | null
          module_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          lesson_id?: string
          lesson_order?: number
          lesson_type?: Database["public"]["Enums"]["lesson_type"] | null
          module_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["module_id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string | null
          description: string | null
          module_id: string
          module_order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          course_id: string
          created_at?: string | null
          description?: string | null
          module_id?: string
          module_order: number
          title: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string | null
          description?: string | null
          module_id?: string
          module_order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_settings: {
        Row: {
          allow_ai_changes: boolean | null
          course_id: string
          created_at: string | null
          curriculum_locked: boolean | null
          updated_at: string | null
        }
        Insert: {
          allow_ai_changes?: boolean | null
          course_id: string
          created_at?: string | null
          curriculum_locked?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allow_ai_changes?: boolean | null
          course_id?: string
          created_at?: string | null
          curriculum_locked?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_settings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: true
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          badge: string | null
          badge_color: string | null
          category: string
          category_badge: string | null
          concepts: string[]
          course_code: string | null
          created_at: string
          created_by: string | null
          description: string
          duration: string
          duration_weeks: number | null
          extra_concepts_count: number | null
          icon_bg: string | null
          icon_type: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          level: Database["public"]["Enums"]["course_level"] | null
          original_price: number | null
          price: number
          rating: number | null
          reviews_count: string | null
          slug: string | null
          status: string
          students_count: string | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          badge?: string | null
          badge_color?: string | null
          category: string
          category_badge?: string | null
          concepts?: string[]
          course_code?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          duration: string
          duration_weeks?: number | null
          extra_concepts_count?: number | null
          icon_bg?: string | null
          icon_type?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          level?: Database["public"]["Enums"]["course_level"] | null
          original_price?: number | null
          price?: number
          rating?: number | null
          reviews_count?: string | null
          slug?: string | null
          status?: string
          students_count?: string | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          badge?: string | null
          badge_color?: string | null
          category?: string
          category_badge?: string | null
          concepts?: string[]
          course_code?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          duration?: string
          duration_weeks?: number | null
          extra_concepts_count?: number | null
          icon_bg?: string | null
          icon_type?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          level?: Database["public"]["Enums"]["course_level"] | null
          original_price?: number | null
          price?: number
          rating?: number | null
          reviews_count?: string | null
          slug?: string | null
          status?: string
          students_count?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lesson_resources: {
        Row: {
          content: string | null
          created_at: string | null
          lesson_id: string
          metadata: Json | null
          resource_id: string
          resource_order: number | null
          resource_type: Database["public"]["Enums"]["resource_type"]
          source: Database["public"]["Enums"]["resource_source"] | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          lesson_id: string
          metadata?: Json | null
          resource_id?: string
          resource_order?: number | null
          resource_type: Database["public"]["Enums"]["resource_type"]
          source?: Database["public"]["Enums"]["resource_source"] | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          lesson_id?: string
          metadata?: Json | null
          resource_id?: string
          resource_order?: number | null
          resource_type?: Database["public"]["Enums"]["resource_type"]
          source?: Database["public"]["Enums"]["resource_source"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_resources_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["lesson_id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string | null
          description: string | null
          key: string
          permission_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          key: string
          permission_id?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          key?: string
          permission_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age_group: string | null
          course_opted: boolean | null
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          device_info: string | null
          email: string
          email_verified: boolean | null
          enrolled_course_id: string | null
          first_landing_page: string | null
          id: string
          last_login: string | null
          location: string | null
          name: string
          onboarding_completed: boolean | null
          phone: string | null
          referral_code: string | null
          referred_by: string | null
          registration_source: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string
          user_id: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          age_group?: string | null
          course_opted?: boolean | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          device_info?: string | null
          email: string
          email_verified?: boolean | null
          enrolled_course_id?: string | null
          first_landing_page?: string | null
          id?: string
          last_login?: string | null
          location?: string | null
          name: string
          onboarding_completed?: boolean | null
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
          registration_source?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
          user_id: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          age_group?: string | null
          course_opted?: boolean | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          device_info?: string | null
          email?: string
          email_verified?: boolean | null
          enrolled_course_id?: string | null
          first_landing_page?: string | null
          id?: string
          last_login?: string | null
          location?: string | null
          name?: string
          onboarding_completed?: boolean | null
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
          registration_source?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
          user_id?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_enrolled_course_id_fkey"
            columns: ["enrolled_course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_settings: {
        Row: {
          coupon_id: string | null
          default_discount_percentage: number | null
          id: string
          is_enabled: boolean | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          coupon_id?: string | null
          default_discount_percentage?: number | null
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          coupon_id?: string | null
          default_discount_percentage?: number | null
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_settings_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          conversion_date: string | null
          course_id: string | null
          created_at: string | null
          discount_applied: number | null
          id: string
          referee_user_id: string
          referral_code: string
          referrer_user_id: string
          revenue_generated: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          conversion_date?: string | null
          course_id?: string | null
          created_at?: string | null
          discount_applied?: number | null
          id?: string
          referee_user_id: string
          referral_code: string
          referrer_user_id: string
          revenue_generated?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          conversion_date?: string | null
          course_id?: string | null
          created_at?: string | null
          discount_applied?: number | null
          id?: string
          referee_user_id?: string
          referral_code?: string
          referrer_user_id?: string
          revenue_generated?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          role_id: string
          role_name: Database["public"]["Enums"]["role_name"]
        }
        Insert: {
          created_at?: string | null
          role_id?: string
          role_name: Database["public"]["Enums"]["role_name"]
        }
        Update: {
          created_at?: string | null
          role_id?: string
          role_name?: Database["public"]["Enums"]["role_name"]
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
          role_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          role_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          role_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_permission: { Args: { _user_id: string }; Returns: boolean }
      check_is_admin: { Args: { _user_id: string }; Returns: boolean }
      generate_referral_code: { Args: { _user_id: string }; Returns: string }
      get_admin_dashboard_data: {
        Args: never
        Returns: {
          age_group: string
          candidate_status: string
          cert_id: string
          certificate_earned: boolean
          certificate_id: string
          certificate_status: string
          completed_days: number[]
          completed_modules_count: number
          completed_quizzes: Json
          completion_date: string
          course_opted: boolean
          deleted_at: string
          device_info: string
          email: string
          email_verified: boolean
          enrolled_course_id: string
          enrolled_course_title: string
          final_assessment_score: number
          final_project_submitted: boolean
          last_login: string
          location: string
          name: string
          onboarding_completed: boolean
          overall_band: string
          phone: string
          referral_code: string
          referral_count: number
          referred_by: string
          registered_at: string
          registration_source: string
          user_id: string
          utm_campaign: string
          utm_medium: string
          utm_source: string
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
      has_permission: {
        Args: { _permission_key: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_curriculum_locked: { Args: { _course_id: string }; Returns: boolean }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
      setup_first_admin: { Args: { _user_id: string }; Returns: boolean }
      soft_delete_candidate: {
        Args: { _deleted_by: string; _user_id: string }
        Returns: boolean
      }
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
      app_role:
        | "admin"
        | "moderator"
        | "user"
        | "manager"
        | "supporter"
        | "viewer"
      course_category: "Course" | "Internship" | "Course+Internship"
      course_level: "Beginner" | "Intermediate" | "Advanced"
      course_status: "Draft" | "Published" | "Archived"
      lesson_type: "Video" | "Reading" | "Quiz" | "Project"
      resource_source: "Notion" | "YouTube" | "Upload" | "Manual"
      resource_type: "Video" | "PDF" | "Link" | "Table" | "Markdown" | "Image"
      role_name: "SuperAdmin" | "Admin" | "Manager" | "Support" | "Instructor"
      user_status: "Active" | "Inactive"
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
        "admin",
        "moderator",
        "user",
        "manager",
        "supporter",
        "viewer",
      ],
      course_category: ["Course", "Internship", "Course+Internship"],
      course_level: ["Beginner", "Intermediate", "Advanced"],
      course_status: ["Draft", "Published", "Archived"],
      lesson_type: ["Video", "Reading", "Quiz", "Project"],
      resource_source: ["Notion", "YouTube", "Upload", "Manual"],
      resource_type: ["Video", "PDF", "Link", "Table", "Markdown", "Image"],
      role_name: ["SuperAdmin", "Admin", "Manager", "Support", "Instructor"],
      user_status: ["Active", "Inactive"],
    },
  },
} as const
