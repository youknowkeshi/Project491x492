import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // ใช้ SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
} as SMTPTransport.Options);

type SendEmailDto = {
  sender: Mail.Address;
  receipients: Mail.Address[];
  subject: string;
  message: string;
};

export const sendEmail = async (dto: SendEmailDto) => {
  const { sender, receipients, subject, message } = dto;
  try {
    const info = await transport.sendMail({
      from: sender,
      to: receipients,
      subject,
      html: message,
      text: message,
    });
    return info;
  } catch (error) {
    console.error("Error details:", error); // แสดงรายละเอียดข้อผิดพลาด
    throw error;
  }
};
