import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export class SupabaseConfigurationError extends Error {
  constructor(readonly missingVariables: string[]) {
    super(`Missing Supabase configuration: ${missingVariables.join(', ')}.`);
    this.name = 'SupabaseConfigurationError';
  }
}

export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    const missingVariables = [
      !url ? 'NEXT_PUBLIC_SUPABASE_URL' : null,
      !serviceRoleKey ? 'SUPABASE_SERVICE_ROLE_KEY' : null,
    ].filter((name): name is string => name !== null);
    throw new SupabaseConfigurationError(missingVariables);
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
