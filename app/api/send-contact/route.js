import {
  ContactUsFormTemlate,
  ContactUsThankYouTemplate,
} from "@/shared/mailTemplate";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const payload = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Define the email options to send contact details to your email
    const contactMailOptions = {
      from: process.env.EMAIL_USER,
      to: "noreply.multi.tool@gmail.com",
      subject: `New Contact Form Submission from ${payload?.name}`,
      html: ContactUsFormTemlate(payload),
    };

    const thankYouMailOptions = {
      from: process.env.EMAIL_USER,
      to: payload?.email,
      subject: "Thank You for Contacting Us!",
      html: ContactUsThankYouTemplate(payload),
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(contactMailOptions),
      transporter.sendMail(thankYouMailOptions),
    ]);

    return new Response(
      JSON.stringify({ message: "Emails sent successfully" ,success : true}),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" , success : false}), {
      status: 500,
    });
  }
}
