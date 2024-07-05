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
              src="https://images.unsplash.com/photo-1488901512066-cd403111aeb2?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl text-neutral-950 font-sans">
            ห้องให้คำปรึกษาที่ 1
            </h2>

            <p className="mt-4 text-gray-600 font-mono">
              รับคำปรึกษาจากพี่ป็อปในห้องให้คำปรึกษาที่ 1
              ไม่ว่าคุณจะกำลังเผชิญกับความท้าทายส่วนตัวหรือต้องการใครสักคนที่พร้อมรับฟัง
              พี่ป็อปพร้อมช่วยคุณในการแก้ไขปัญหา
              จองนัดวันนี้และเริ่มต้นก้าวแรกสู่ตัวคุณที่ดีกว่าเดิม
            </p>
            <div className="mt-4 text-gray-600text-inherit text-justify font-bold">
              หมายเหตุ : ก่อนจองต้องลงทะเบียนก่อน
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
              src="https://images.unsplash.com/photo-1488901512066-cd403111aeb2?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
            ห้องให้คำปรึกษาที่ 2
            </h2>

            <p className="mt-4 text-gray-600 text-justify">
            รับคำปรึกษาจากพี่ป็อปในห้องให้คำปรึกษาที่ 1
              ไม่ว่าคุณจะกำลังเผชิญกับความท้าทายส่วนตัวหรือต้องการใครสักคนที่พร้อมรับฟัง
              พี่ป็อปพร้อมช่วยคุณในการแก้ไขปัญหา
              จองนัดวันนี้และเริ่มต้นก้าวแรกสู่ตัวคุณที่ดีกว่าเดิม
            </p>
            <div className="mt-4 text-gray-600text-inherit text-justify font-bold">
              หมายเหตุ : ก่อนจองต้องลงทะเบียนก่อน
            </div>
            <div>
              <BookAppointment room="2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
