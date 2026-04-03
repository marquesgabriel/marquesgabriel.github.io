import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = import.meta.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey: string = import.meta.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
