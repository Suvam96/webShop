export async function POST(request) {
    try {
      const body = await request.json();
      const { fullName, mobileNumber, email, password, confirmPassword } = body;
      
      // Basic validation
      if (!fullName || !mobileNumber || !email || !password || !confirmPassword) {
        return Response.json({ error: 'All fields are required' }, { status: 400 });
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return Response.json({ error: 'Please enter a valid email address' }, { status: 400 });
      }
      
      // Mobile number validation
      if (!/^[0-9]{10}$/.test(mobileNumber)) {
        return Response.json({ error: 'Please enter a valid 10-digit mobile number' }, { status: 400 });
      }
      
      // Password validation
      if (password.length < 6) {
        return Response.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
      }
      
      // Confirm password validation
      if (password !== confirmPassword) {
        return Response.json({ error: 'Passwords do not match' }, { status: 400 });
      }
      
      // In a real application, you would:
      // 1. Hash the password
      // 2. Check if user already exists
      // 3. Store user in database
      
      // For demo purposes, just return success
      return Response.json({ 
        success: true, 
        message: 'Registration successful',
        user: {
          id: Math.floor(Math.random() * 1000),
          fullName,
          email,
          mobileNumber
        }
      });
    } catch (error) {
      return Response.json({ error: 'Registration failed' }, { status: 500 });
    }
  }
  