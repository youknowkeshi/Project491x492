import { sendEmail } from "@/utils/mail.utils";
import { NextRequest, NextResponse } from "next/server";

const isCurrentAppointment = (start_datetime: string): string => {
  const [date, timeWithZone] = start_datetime.split('T');
  const time = timeWithZone.substring(0, 5);
  const formattedTime = time.startsWith('0') ? time.slice(1) : time;
  const finalTime = formattedTime.endsWith(':') ? formattedTime.slice(0, -1) : formattedTime;

  return `${date} ${finalTime}`;
};

export async function POST(request: NextRequest) {

  const req = await request.json();
  // const { cmuaccount, firstname_lastname, start_datetime, end_datetime, room ,sendername,sendermail,subject,message} = req;
  const { cmuaccount, firstname_lastname, sendername, sendermail, subject, message } = req;

  const sender = {
    name: `${sendername}`,
    address: `${sendermail}`, // ผู้ส่ง
  };
  const receipients = [
    {
      name: `${firstname_lastname}`,
      address: `${cmuaccount}`, // ผู้รับ
    },
  ];
  try {
    const result = await sendEmail({
      sender,
      receipients,
      subject: `${subject}`,
      message: `${message}`,
    });



    return NextResponse.json({
      accepted: result.accepted,
    });
  } catch (error) {
    return NextResponse.json({ message: "Unable to send email this time" });
  }
}
