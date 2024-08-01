"use client";
import React from "react";
import { Navbar } from "../component/์Navbar";
import { Foot } from "../component/Footer";

type Props = {};

export default function page({}: Props) {
  const callouts = [
    {
      name: "Desk and Office",
      description: "First Time",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
      imageAlt:
        "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      href: "#",
    },
    {
      name: "Self-Improvement",
      description: "Have been here",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
      imageAlt:
        "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
      href: "#",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-indigo-500">
              Dashboard
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
                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left mt-0">
                  <h2 className="text-3xl font-bold tracking-tight text-indigo-500 sm:text-4xl mt-20">
                    ENTANEER MIND FRIEND
                    <br />
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-900">
                    Entaneer Mind Friend - คณะวิศวกรรมศาสตร์
                    มหาวิทยาลัยเชียงใหม่
                    เว็บไซต์สำหรับการนัดคิวเพื่อบริการให้คำปรึกษาและดูและสุขภาพจิต
                    งานบริการศึกษาและพัฒนาคุณภาพนักศึกษา คณะวิศวกรรมศาสตร์
                    มหาวิทยาลัยเชียงใหม่
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                    <a
                      href="#"
                      className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white  hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Log in
                    </a>
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className=" flex justify-center text-2xl font-bold text-gray-900 ">
                      Collections
                    </h2>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
                      {callouts.map((callout) => (
                        <div key={callout.name} className="group relative">
                          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                            <img
                              alt={callout.imageAlt}
                              src={callout.imageSrc}
                              className="h-full w-full object-cover object-center"
                            />
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
        </main>
      </div>
      <Foot />
    </>
  );
}
