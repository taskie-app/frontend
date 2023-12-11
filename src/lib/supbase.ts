import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfacmpirjrvdgusdxgfo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYWNtcGlyanJ2ZGd1c2R4Z2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NzQwMjQsImV4cCI6MjAxNDI1MDAyNH0.Z_3NyaWtoh3f4ZEkllSibxJp9NnF22NKud2uoM66Gjo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
