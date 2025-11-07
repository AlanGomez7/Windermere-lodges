import { createEnquiryData } from "@/app/queries/feedback";
import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { name, phone, email, subscribe, message, subject } =
      await request.json();


    if (!name || !phone || !email || !message || !subject) {
      throw new Error("invalid inputs");
    }

    const html = emailTemplate({
      name,
      message,
      subject,
      mail: email,
      mobile: phone,
    });

    await createEnquiryData({
      name,
      phone,
      email,
      subscribe,
      message,
      subject,
    });

    const response = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html,
    });

    return NextResponse.json(
      {
        message: "Your message has been received",
        ok: true,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    const message = getErrorMessage(e);
    return NextResponse.json({ message, ok: false }, { status: 409 });
  }
}
const emailTemplate = ({
  name,
  message,
  subject,
  mail,
  mobile,
}: {
  name: string;
  message: string;
  subject: string;
  mail: string;
  mobile: string;
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Message</title>
    <style>
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        background-color: #f0fdf4;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 40px auto;
        border-radius: 16px;
        border: 1px solid #059669;
        overflow: hidden;
      }
      .header {
        background-color: #e6e6e6;
        color: white;
        text-align: center;
        padding: 24px 16px;
      }
      .header h2 {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
      }
      .content {
        padding: 24px;
        color: #1f2937;
        line-height: 1.7;
      }
      .info-box {
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
      }
      .info-box strong {
        color: #059669;
      }
      .message-box {
        background-color: #ecfdf5;
        border: 1px solid #a7f3d0;
        border-radius: 8px;
        padding: 16px;
        color: #065f46;
        margin-bottom: 16px;
      }
      a.reply-btn {
        display: inline-block;
        background-color: #059669;
        color: white !important;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
      }
      a.reply-btn:hover {
        background-color: #047857;
      }
      .footer {
        text-align: center;
        font-size: 13px;
        color: #6b7280;
        border-top: 1px solid #e5e7eb;
        padding: 16px;
        background-color: #f9fafb;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Message from ${name}</h2>
      </div>
      <div class="content">
        <p>You've received a new message from a visitor via your website:</p>

        <div class="info-box">
          <strong>Subject:</strong> ${subject}
        </div>

        <div class="message-box">
          <strong>Message:</strong>
          <p style="white-space: pre-line; margin-top: 8px;">${message}</p>
        </div>

        ${
          mobile
            ? `<div class="info-box"><strong>Phone:</strong> ${mobile}</div>`
            : ""
        }

        <p style="text-align: center; margin-top: 24px;">
          <a href="mailto:${mail}" class="reply-btn">Reply to ${name}</a>
        </p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} Windermere Lodges. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;