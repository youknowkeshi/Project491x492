"use client"
import React from "react";
import { Nav } from "../component/Nav";

type Props = {};

const Page: React.FC<Props> = () => {
  return (
    <>
      <Nav />
      <div className="bg-[#F7F9FB]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 pd-7">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
              เลือกประเภทบัญชีของคุณ
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 pd-7">
              <div className="group relative">
                <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 hover:-translate-y-1 hover:shadow-2xl ">
                  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-[#ffa602] bg-clip-border rounded-xl h-96 group-hover:bg-yellow-300">
                    <img
                      src="/student1.png"
                      alt="card-image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-6 p-6 pt-0 text-center">
                    <a href="/register" className="font-bold text-3xl">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 "
                      ></span>
                      มาครั้งแรก
                    </a>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-red-600 bg-clip-border rounded-xl h-96 group-hover:bg-red-500">
                    <img
                      src="/student2.png"
                      alt="card-image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-6 p-6 pt-0 text-center">
                    <a href="/appointment" className="font-bold text-3xl">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      เคยมาแล้ว
                    </a>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96 group-hover:bg-purple-500">
                    <img
                      src="/psyco.jpg"
                      alt="card-image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-6 p-6 pt-0 text-center">
                    <a href="/List" className="font-bold text-3xl">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      นักจิตวิทยา
                    </a>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
