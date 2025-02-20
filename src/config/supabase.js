import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cslnkpnxwqahipwrjqna.supabase.co"; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcMiOiJzdXBhYmFzZSIsInJlZiI6ImNzbG5rcG54d3FhaGlwd3JqcW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MzAxNDksImV4cCI6MjA1NTIwNjE0OX0.jqJ9wbyVFx09RvlNXnLZipCzFvjY2RTfcbO4XoiTfU8"; // Replace with your Supabase Anon Key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
