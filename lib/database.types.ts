export type AppointmentStatus = 'pending' | 'contacted' | 'cancelled';

export interface Database {
  public: {
    Tables: {
      page_views: {
        Row: {
          id: string;
          page_url: string;
          referrer: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_url: string;
          referrer?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          page_url?: string;
          referrer?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      appointments: {
        Row: {
          id: string;
          full_name: string;
          phone_number: string;
          service_requested: string;
          appointment_time: string;
          notes: string | null;
          status: AppointmentStatus;
          created_at: string;
          request_key: string | null;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone_number: string;
          service_requested: string;
          appointment_time: string;
          notes?: string | null;
          status?: AppointmentStatus;
          created_at?: string;
          request_key?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone_number?: string;
          service_requested?: string;
          appointment_time?: string;
          notes?: string | null;
          status?: AppointmentStatus;
          created_at?: string;
          request_key?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
