// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; // Access the Supabase URL from env
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY; // Access the Supabase anon key from env

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
