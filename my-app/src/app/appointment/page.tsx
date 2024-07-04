"use client";
import { Inter } from "next/font/google";
import React, { use, useEffect, useState } from "react";
import BookAppointment from "./BookAppointment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

type Props = {};
const inter = Inter({ subsets: ["latin"] });
export default function page({}: Props) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt=""
              src="https://as2.ftcdn.net/v2/jpg/07/52/73/81/1000_F_752738114_CcWpaa9ymekp84jwjd7yBK0t34NA72Zz.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl text-cyan-100 font-sans">
              Counseling Room 1
            </h2>

            <p className="mt-4 text-zinc-950 font-mono">
              รับคำปรึกษาจากพี่ป็อปในห้องให้คำปรึกษาที่ 1
              ไม่ว่าคุณจะกำลังเผชิญกับความท้าทายส่วนตัวหรือต้องการใครสักคนที่พร้อมรับฟัง
              พี่ป็อปพร้อมช่วยคุณในการแก้ไขปัญหา
              จองนัดวันนี้และเริ่มต้นก้าวแรกสู่ตัวคุณที่ดีกว่าเดิม
            </p>
            <div className="mt-4 text-red-600">
              หมายเหตุ: ก่อนจองต้องลงทะเบียนก่อน
            </div>
            <div>
              <BookAppointment room="1" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt=""
              src="https://as1.ftcdn.net/v2/jpg/08/07/16/10/1000_F_807161055_esCWhvC0BIhdHw2HLgn4WSUkOZydeF4B.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Counseling Room 2
            </h2>

            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
              hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
              minus veniam tempora deserunt? Molestiae eius quidem quam
              repellat.
            </p>
            <div>
              <BookAppointment room="2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
