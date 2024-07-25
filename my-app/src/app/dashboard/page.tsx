
import React from "react";
import { Carousel } from "flowbite-react";
import { Foot } from "../component/Footer";
import { Navbar } from "../component/์Navbar";
type Props = {};

export default function DashBoard({}: Props) {
  return (
    <>
      <Navbar />
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <header className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
              หน้าแรก
            </h1>
          </div>
        </header>
        <main className="bg-[#F7F9FB]">
          <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
            <div className="relative isolate px-6 pt-14 lg:px-8">
              <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
              >
                {/* <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] clip-custom"></div> */}
              </div>
              <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    ติดต่อสอบถามเพิ่มเติม.{" "}
                    <a
                      href="https://www.facebook.com/EntaneerMindFriendCMU"
                      className="font-semibold text-[#8FC1E3]"
                    >
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                      Facebook : Entaneer Mind Friend
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-[#8FC1E3] sm:text-6xl">
                    Entaneer Mind Friend
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Entaneer Mind Friend - คณะวิศวกรรมศาสตร์
                    มหาวิทยาลัยเชียงใหม่
                    เว็บไซต์สำหรับการนัดคิวเพื่อบริการให้คำปรึกษาและดูและสุขภาพจิต
                    งานบริการศึกษาและพัฒนาคุณภาพนักศึกษา คณะวิศวกรรมศาสตร์
                    มหาวิทยาลัยเชียงใหม่
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                      href="/register"
                      className="rounded-md bg-[#8FC1E3] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4338ca] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      ลงทะเบียน
                    </a>
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      วิธีการจองสำหรับรับบริการครั้งแรก{" "}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
              >
                {/* <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] clip-custom"></div> */}
              </div>
            </div>
          </div>
        </main>
        <Foot />
      </div>
    </>
  );
}
