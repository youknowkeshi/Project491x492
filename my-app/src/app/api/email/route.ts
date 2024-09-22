import { sendEmail } from "@/utils/mail.utils";

export async function POST() {
  const sender = {
    name: "Pongtanate",
    address: "pongtanate12@gmail.com", // ผู้ส่ง
  };
  const receipients = [
    {
      name: "น้องพิ้ง",
      address: "pongthanat_n@cmu.ac.th", // ผู้รับ
    },
  ];
  try {
    const result = await sendEmail({
      sender,
      receipients,
      subject: "pink",
      message: "Text sent mail", // ข้อความ
    });
    return Response.json({
      accepted: result.accepted,
    });
  } catch (error) {
    return Response.json({ message: "Unable to send email this time" });
  }
}
