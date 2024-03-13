import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const smtpOptions = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "user",
      pass: process.env.SMTP_PASSWORD || "password",
    },
  };
  try {
    const transporter = nodemailer.createTransport(smtpOptions);
    const data = await request.json();
    console.log("body:", data);
    // const formData = await request.json();

    if (data) {
      await transporter.sendMail({
        from: process.env.SMTP_USER || "jitsung.wu@gmail.com",
        to: data.email || "053792@mail.fju.edu.tw",
        subject: data.subject || "歡迎加入輔大資管大家庭",
        html: data.html || "<h1>歡迎加入輔大資管大家庭</h1>",
      });
      return NextResponse.json({ message: "成功送出信件" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
/*
const formData = await request.formData();
// const formData = await request.json();
console.log("data:", formData);

if (formData) {
  await transporter.sendMail({
    from: process.env.SMTP_USER || "jitsung.wu@gmail.com",
    to: formData.get("email")?.toString() || "053792@mail.fju.edu.tw",
    subject:
      formData.get("subject")?.toString() || "歡迎加入輔大資管大家庭",
    html:
      formData.get("html")?.toString() || "<h1>歡迎加入輔大資管大家庭</h1>",
  });
  return NextResponse.json(
    { message: "Email sent successfully" },
    { status: 200 }
  );
} else {
  return NextResponse.json({ message: "error" }, { status: 500 });
}
*/

// export async function POST(request: Request) {
//   try {
//     // Create a Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       host: "smtp.example.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "

// }

/*
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
          user: 'your-email@example.com',
          pass: 'your-password',
        },
      });

      // Send the email
      await transporter.sendMail({
        from: 'your-email@example.com',
        to: 'recipient@example.com',
        subject: 'Hello from Next.js 13 API',
        text: 'This is a test email sent from a Next.js 13 API route.',
      });

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
*/
