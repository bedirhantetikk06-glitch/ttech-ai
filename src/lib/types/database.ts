export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          is_premium: boolean;
          locale: string;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_premium?: boolean;
          locale?: string;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_premium?: boolean;
          locale?: string;
          onboarding_completed?: boolean;
          updated_at?: string;
        };
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          life_area: string | null;
          agent_context: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          life_area?: string | null;
          agent_context?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          life_area?: string | null;
          agent_context?: Json;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          session_id: string;
          role: "user" | "assistant" | "system" | "tool";
          content: string;
          agent_id: string | null;
          tool_calls: Json | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          role: "user" | "assistant" | "system" | "tool";
          content: string;
          agent_id?: string | null;
          tool_calls?: Json | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          content?: string;
          metadata?: Json;
        };
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          life_area: string;
          target_date: string | null;
          progress: number;
          status: "active" | "completed" | "paused" | "cancelled";
          milestones: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          life_area: string;
          target_date?: string | null;
          progress?: number;
          status?: "active" | "completed" | "paused" | "cancelled";
          milestones?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          life_area?: string;
          target_date?: string | null;
          progress?: number;
          status?: "active" | "completed" | "paused" | "cancelled";
          milestones?: Json;
          updated_at?: string;
        };
      };
      life_areas: {
        Row: {
          id: string;
          user_id: string;
          area: string;
          score: number;
          notes: string | null;
          last_reviewed: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          area: string;
          score?: number;
          notes?: string | null;
          last_reviewed?: string;
          created_at?: string;
        };
        Update: {
          score?: number;
          notes?: string | null;
          last_reviewed?: string;
        };
      };
      daily_streaks: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          completed: boolean;
          tasks_done: number;
          notes: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          completed?: boolean;
          tasks_done?: number;
          notes?: string | null;
        };
        Update: {
          completed?: boolean;
          tasks_done?: number;
          notes?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      life_area_type: "career" | "health" | "finance" | "relationships" | "personal";
      goal_status: "active" | "completed" | "paused" | "cancelled";
      message_role: "user" | "assistant" | "system" | "tool";
    };
  };
}
