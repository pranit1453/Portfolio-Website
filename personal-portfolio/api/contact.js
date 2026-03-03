export default async function handler(req, res) {
    // Only allow POST requests for secure form submission
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { name, email, message } = req.body;

        // Basic spam protection: Reject empty fields
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are all required.' });
        }

        // Basic payload validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format provided.' });
        }

        // Native zero-dependency REST request to Resend
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's free testing domain
                to: process.env.CONTACT_EMAIL || 'pranitbhangale14@gmail.com', // The secure email to receive messages at
                subject: `New Portfolio Message from ${name}`,
                reply_to: email, // This allows you to click "Reply" in Gmail and send it directly back to the user
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #6366f1;">New Contact Form Submission</h2>
                        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eaeaea;">
                            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
                        </div>
                    </div>
                `
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Resend API Error:', errorData);
            return res.status(500).json({ error: 'Failed to dispatch email via Resend.' });
        }

        // Successfully dispatched
        return res.status(200).json({ success: true, message: 'Email dispatched successfully!' });

    } catch (error) {
        console.error('Serverless Function Initialization Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
