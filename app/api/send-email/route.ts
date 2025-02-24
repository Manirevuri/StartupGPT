import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            margin: auto;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-content {
            font-size: 16px;
        }
        .email-footer {
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <p class="email-content">
            Dear Founder,<br><br>
            I hope this message finds you well. I am writing to seek your availability for a meeting to discuss your business model and funding needs. Please share your availability.<br><br>
            Thank you in advance for your time.<br><br>
            Best regards,<br>
            <strong>StartupGPT</strong>
            | "AI-powered startup scouting for investors."
        </p>
    </div>
</body>
</html>
`

export async function POST(req: NextRequest) {
    const email = process.env.EMAIL_ADDRESS
    const resendApiKey = process.env.RESEND_API_KEY
    if (!email) {
        throw Error('EMAIL_ADDRESS is not set')
    }
    if (!resendApiKey) {
        throw Error('RESEND_API_KEY is not set')
    }

    const resend = new Resend('re_P5F17Ps1_9257diNgnXposRHQ5T31Tnby');

    resend.emails.send({
        from: 'StartupGPT@resend.dev',
        to: 'manikantarevuri18@gmail.com',
        subject: 'Request for Meeting Schedule',
        html: htmlTemplate,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
}