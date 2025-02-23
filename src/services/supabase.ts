import { createClient } from "@supabase/supabase-js";

import type { Database } from "../lib/database.types";

const SUPABASE_URL: string = "https://shmudslyygfusqtxygpa.supabase.co";

const SERVICE_KEY: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobXVkc2x5eWdmdXNxdHh5Z3BhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTg4MTQzNSwiZXhwIjoyMDU1NDU3NDM1fQ.m_VahMjDODCr7VeVTzsAC23k3CgL64Dd_AUKm-Q9JAc";

const supabase = createClient<Database>(SUPABASE_URL, SERVICE_KEY);

export default supabase;
