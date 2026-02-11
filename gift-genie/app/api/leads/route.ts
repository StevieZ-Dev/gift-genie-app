import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Client
// These keys are pulled automatically from your .env.local file
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, score, source } = body;

    // Validate email (Basic check to ensure it has an @ symbol)
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Insert into Supabase "leads" table
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { 
          email, 
          score: score || 0,
          source: source || 'game'
        }
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Lead captured' });

  } catch (error) {
    console.error('Lead Capture Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}