"use client";
import React from "react";
import { Navbar } from "../component/Navbar";
import { Foot } from "../component/Footer";

type Props = {};

export default function page({}: Props) {
  const callouts = [
    {
      name: "Desk and Office",
      description: "ยังไม่เคยรับบริการ",
      imageSrc: "/student1.png",
      imageAlt:
        "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      href: "/policy",
    },
    {
      name: "Self-Improvement",
      description: "เคยรับบริการแล้ว",
      imageSrc: "/student2.png",
      imageAlt:
        "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
      href: "/appointment",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
              หน้าแรก
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-white">
              <div className="mt-7 relative isolate overflow-hidden bg-white px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <svg
                  viewBox="0 0 1024 1024"
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                >
                  <circle
                    r={512}
                    cx={512}
                    cy={512}
                    fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                    fillOpacity="0.7"
                  />
                  <defs>
                    <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                      <stop stopColor="#7775D6" />
                      <stop offset={1} stopColor="#E935C1" />
                    </radialGradient>
                  </defs>
                </svg>
                <div className="flex items-center">
                  <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 className="text-2xl font-bold tracking-tight text-[#8FC1E3] sm:text-4xl ">
                      ENTANEER MIND FRIEND
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-900">
                      Entaneer Mind Friend - คณะวิศวกรรมศาสตร์
                      มหาวิทยาลัยเชียงใหม่
                      เว็บไซต์สำหรับการนัดคิวเพื่อบริการให้คำปรึกษาและดูและสุขภาพจิต
                      งานบริการศึกษาและพัฒนาคุณภาพนักศึกษา คณะวิศวกรรมศาสตร์
                      มหาวิทยาลัยเชียงใหม่
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                      {/* <a
                        href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}
                        className="rounded-md bg-[#8FC1E3] px-3.5 py-2.5 text-sm font-semibold text-white  hover:bg-[#bbd9ee] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Log in
                      </a> */}
                      <a
                        href="#register"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        วิธีการลงทะเบียน <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                      <h2 className=" flex justify-center text-2xl font-bold text-[#8FC1E3] ">
                        คุณเคยเข้ารับคำปรึกษาแล้วหรือยัง ?
                      </h2>
                      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
                        {callouts.map((callout) => (
                          <div key={callout.name} className="group relative">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-transparent sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 md:h-76 md:aspect-h-1 md:aspect-w-2">
                              {" "}
                              {/* Adjust the height for iPad */}
                              <a href={callout.href}>
                                <img
                                  alt={callout.imageAlt}
                                  src={callout.imageSrc}
                                  className="object-cover object-center "
                                />
                              </a>
                            </div>
                            <h3 className="mt-6 text-sm text-gray-500"></h3>
                            <p className="text-base font-semibold text-gray-900 flex justify-center">
                              {callout.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="dark:bg-gray-100 dark:text-gray-800 mt-7">
            <div className="container mx-auto flex flex-col p-6">
              <h2 id="register" className="py-4 text-3xl font-bold text-center">
                วิธีการจองสำหรับรับบริการครั้งแรก
              </h2>
              <div className="divide-y dark:divide-gray-300">
                <div className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                  <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="w-16 h-16"
                    >
                      <path d="M472,16H168a24,24,0,0,0-24,24V344a24,24,0,0,0,24,24H472a24,24,0,0,0,24-24V40A24,24,0,0,0,472,16Zm-8,320H176V48H464Z"></path>
                      <path d="M112,400V80H80V408a24,24,0,0,0,24,24H432V400Z"></path>
                      <path d="M48,464V144H16V472a24,24,0,0,0,24,24H368V464Z"></path>
                    </svg> */}
                  </div>
                  <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                    <span className="text-xs tracking-wider uppercase dark:text-violet-600">
                      Step 1
                    </span>
                    <span className="mt-2  font-bold text-[#8FC1E3]">
                      ติดต่อ Entaneer Mind Friend - คณะวิศวกรรมศาสตร์
                      มหาวิทยาลัยเชียงใหม่
                    </span>
                    <span className="mt-2 dark:text-gray-700">
                      ผู้ใช้ต้องติดต่อเพจ Entaneer Mind Friend -
                      คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่
                      ก่อนเข้ารับบริการเพื่อพูดคุยเบื้องต้น
                    </span>
                  </div>
                </div>
                <div className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                  <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="w-16 h-16"
                    >
                      <path d="M285.177,179l15.513-3.914-7.827-31.028-15.514,3.913a176.937,176.937,0,0,0-129.3,133.557l-3.407,15.633,31.266,6.814,3.406-15.634A145.559,145.559,0,0,1,285.177,179Z"></path>
                      <path d="M363.624,147.871C343.733,72.077,274.643,16,192.7,16,95.266,16,16,95.266,16,192.7c0,82.617,57,152.163,133.735,171.4A176.769,176.769,0,0,0,320.7,496c97.431,0,176.7-79.266,176.7-176.695C497.392,238.071,441.64,167.336,363.624,147.871ZM48,192.7C48,112.91,112.91,48,192.7,48s144.7,64.91,144.7,144.7-64.911,144.7-144.7,144.7S48,272.481,48,192.7ZM320.7,464c-60.931,0-115.21-38.854-135.843-94.792,2.6.115,5.214.184,7.843.184a176.862,176.862,0,0,0,32.7-3.047l97.625,97.625C322.247,463.983,321.473,464,320.7,464Zm41.528-6.083L260.26,355.954a176.9,176.9,0,0,0,43.662-26.072L408.37,434.33A144.385,144.385,0,0,1,362.223,457.917Zm69.3-45.692L326.851,307.557a177.082,177.082,0,0,0,27.911-44.5L457.67,365.964A144.661,144.661,0,0,1,431.519,412.225Zm33.594-84.073-99.42-99.42a176.785,176.785,0,0,0,3.7-36.036c0-3.285-.1-6.547-.276-9.787a145.054,145.054,0,0,1,96.276,136.4C465.392,322.276,465.291,325.224,465.113,328.152Z"></path>
                    </svg> */}
                  </div>
                  <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                    <span className="text-xs tracking-wider uppercase dark:text-violet-600">
                      Step 2
                    </span>
                    <span className="mt-2  font-bold text-[#8FC1E3]">
                      นำรหัสที่ได้จากการรับมาจากนักจิตวิทยาไปลงทะเบียน
                    </span>
                    <span className="mt-2 dark:text-gray-700">
                      หลังจากพูดคุยเบื้องต้นกับนักจิตวิทยาแล้วจะได้รับรหัสสำหรับเข้ารับบริการครั้งแรกมา
                      ให้ผู้ใช้ไปที่หน้าลงทะเบียน
                      นำไปกรอกสำหรับการลงทะเบียนเเละกรอกข้อมูลอื่นๆให้ครบถ้วน
                    </span>
                  </div>
                </div>
                <div className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                  <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="w-16 h-16"
                    >
                      <path d="M412.284,294.37l-12.5,15.642c-8.354,10.454-50.027,64.208-50.027,95.883,0,36.451,28.049,66.105,62.526,66.105s62.527-29.654,62.527-66.105c0-31.675-41.673-85.429-50.028-95.883Zm0,145.63c-16.832,0-30.526-15.3-30.526-34.105,0-11.662,15.485-37.883,30.531-59.2,15.043,21.3,30.522,47.509,30.522,59.2C442.811,424.7,429.116,440,412.284,440Z"></path>
                      <path d="M122.669,51.492,96.133,124.4,30.092,97.205,17.908,126.8l67.271,27.7L26.9,314.606a48.056,48.056,0,0,0,28.689,61.523l184.719,67.232a48,48,0,0,0,61.523-28.688L397.6,151.56Zm149.1,352.236a16,16,0,0,1-20.508,9.563L66.537,346.059a16,16,0,0,1-9.563-20.507L73.553,280H316.8ZM85.2,248l29.594-81.311,36.333,14.961a32.644,32.644,0,1,0,11.236-29.98l-36.615-15.077,16.046-44.085,214.79,78.177L328,249.219V248Z"></path>
                    </svg> */}
                  </div>
                  <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                    <span className="text-xs tracking-wider uppercase dark:text-violet-600">
                      Step 3
                    </span>
                    <span className="mt-2  font-bold text-[#8FC1E3]">
                      จองคิวนัดปรึกษา
                    </span>
                    <span className="mt-2 dark:bg-gray-100 dark:text-gray-700">
                      ผู้ใช้สามารถจองคิวตามวันที่ว่างได้ หมายเหตุ
                      ไม่สามารถจองคิวห้องเดิมซ้ำได้
                    </span>
                  </div>
                </div>
                <div className="grid justify-center grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0">
                  <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="w-16 h-16"
                    >
                      <polygon points="388.632 393.82 495.823 255.94 388.684 118.178 363.424 137.822 455.288 255.944 363.368 374.18 388.632 393.82"></polygon>
                      <polygon points="148.579 374.181 56.712 255.999 148.629 137.823 123.371 118.177 16.177 255.993 123.314 393.819 148.579 374.181"></polygon>
                      <polygon points="330.529 16 297.559 16 178.441 496 211.412 496 330.529 16"></polygon>
                    </svg> */}
                  </div>
                  <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                    <span className="text-xs tracking-wider uppercase dark:text-violet-600">
                      Step 4
                    </span>
                    <span className="mt-2 font-bold text-[#8FC1E3]">
                      เช็คการจอง
                    </span>
                    <span className="mt-2 dark:text-gray-700">
                      ผู้ใช้บริการสามารถเช็คการจองโดยไปที่เมนู ประวัติการจอง
                      {/* โดยก่อนวันนัด 1 วันจะมีเมลไปแจ้งเตือนผ่าน Gmail หรือ
                      Outlook{" "} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Foot />
    </>
  );
}
