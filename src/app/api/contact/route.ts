import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z, ZodError } from "zod";

// Define the schema for input validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Invalid phone number")
    .optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000),
});

// HTML email template for the company
const getCompanyEmailTemplate = (
  name: string,
  email: string,
  phone: string | undefined,
  message: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background-color: #007bff; color: #fff; padding: 10px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 20px; }
    .content p { margin: 10px 0; }
    .footer { text-align: center; padding: 10px; font-size: 12px; color: #777; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Client Message</h2>
    </div>
    <div class="content">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
    <div class="footer">
      <p>Received from Velante Solutions GROVIA</p>
    </div>
  </div>
</body>
</html>
`;

// HTML email template for the client
const getClientEmailTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background-color: #28a745; color: #fff; padding: 10px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 20px; }
    .content p { margin: 10px 0; }
    .footer { text-align: center; padding: 10px; font-size: 12px; color: #777; }
    .whatsapp-link { color: #25D366; text-decoration: none; font-weight: bold; }
    .whatsapp-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Thank You for Your Message!</h2>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to Velante Solutions. We have successfully received your message.</p>
      <p>Please note that this is a dummy landing page created for demonstration purposes. To discuss your needs directly, feel free to contact us via WhatsApp at <a href="https://wa.me/201148620380" class="whatsapp-link">+201148620380</a>.</p>
      <p>We look forward to assisting you!</p>
      <p>Best regards,<br>Velante Solutions Team</p>
    </div>
    <div class="footer">
      <p>Velante Solutions &copy; 2025</p>
    </div>
  </div>
</body>
</html>
`;

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const { name, email, phone, message } = contactSchema.parse(body);

    // Define environment variables just before email sending
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      throw new Error("Missing Gmail credentials in environment variables");
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Send email to the company
    await transporter.sendMail({
      from: `"Velante Solutions" <${gmailUser}>`,
      to: "velante.Solutions@gmail.com",
      subject: "New Client Message from GROVIA",
      html: getCompanyEmailTemplate(name, email, phone, message),
    });

    // Send confirmation email to the client
    await transporter.sendMail({
      from: `"Velante Solutions" <${gmailUser}>`,
      to: email,
      subject: "Thank You for Contacting Velante Solutions",
      html: getClientEmailTemplate(name),
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof ZodError) {
      // Explicitly type the error to access the 'issues' property
      const zodError = error as ZodError;
      return NextResponse.json({ error: zodError.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
