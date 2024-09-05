import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://awpidqelsyoytjqvtjvp.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3cGlkcWVsc3lveXRqcXZ0anZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwMzM4OTMsImV4cCI6MjAzNDYwOTg5M30.vURcUGY5LfWyDRZM-7T6SdkJfHMFvIBmqwkfhtZU02A";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
