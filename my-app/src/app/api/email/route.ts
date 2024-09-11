import { sendEmail } from "@/utils/mail.utils";

export async function POST() {
  const sender = {
    name: "Pongtanate",
    address: "pongtanate12@gmail.com", // ผู้ส่ง
  };
  const receipients = [
    {
      name: "สวัสดี",
      address: "nithikon_jansanitsri@cmu.ac.th", // ผู้รับ
    },
  ];
  try {
    const result = await sendEmail({
      sender,
      receipients,
      subject: "Test Email ",
      message: "ไอ่โต้ง", // ข้อความ
    });
    return Response.json({
      accepted: result.accepted,
    });
  } catch (error) {
    return Response.json({ message: "Unable to send email this time" });
  }
}
