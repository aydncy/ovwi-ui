export async function POST(req) {
  const { email, password } = await req.json();
  
  if (!email || !password) {
    return Response.json({ error: 'Email and password required' }, { status: 400 });
  }

  return Response.json({ 
    success: true, 
    message: 'Signup successful',
    user: { email }
  });
}
