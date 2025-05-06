export async function POST(request) {
    try {
      const body = await request.json();
      const { mobileNumber, password } = body;
      
      // Basic validation
      if (!mobileNumber || !password) {
        return Response.json({ error: 'All fields are required' }, { status: 400 });
      }
      
      // In a real application, you would:
      // 1. Find the user in database
      // 2. Compare hashed passwords
      // 3. Generate JWT token
      
      // For demo purposes, validate a dummy user
      // In production, you would check against a database
      if (mobileNumber === '1234567890' && password === 'password123') {
        return Response.json({
          success: true,
          message: 'Login successful',
          user: {
            id: 123,
            fullName: 'Demo User',
            email: 'demo@example.com',
            mobileNumber: '1234567890'
          },
          token: 'demo-jwt-token'
        });
      } else {
        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
      }
    } catch (error) {
      return Response.json({ error: 'Login failed' }, { status: 500 });
    }
  }
  