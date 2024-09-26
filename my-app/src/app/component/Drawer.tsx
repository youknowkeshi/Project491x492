"use client";

import { Drawer, Sidebar } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  HiChartPie,
} from "react-icons/hi";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineChecklist } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa6";

export function ComponentDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex items-center justify-end mr-10">
        <Button className="bg-[#5044e4]" onClick={() => setIsOpen(true)}>แสดงรูปแบบกราฟ</Button>
      </div>
      <Drawer backdrop={false} open={isOpen} onClose={handleClose}>
        <Drawer.Header title="รูปแบบของกราฟ" titleIcon={FaChartBar} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden"></form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/report" icon={HiChartPie}>
                      รูปแบบกราฟแสดงจำนวน
                      <br />
                      ผู้รับบริการแต่ละสาขา
                    </Sidebar.Item>
                    <Sidebar.Item href="/reportgradelevel" icon={PiStudent}>
                      รูปแบบกราฟแสดงจำนวน
                      <br />
                      ผู้รับบริการแต่ละชั้นปี
                    </Sidebar.Item>
                    <Sidebar.Item href="/reportchecklist" icon={MdOutlineChecklist}>
                      รูปแบบกราฟแสดง
                      <br />
                      จำนวนผู้รับบริการแต่ละ
                      <br />
                      ชนิดของสุขภาพจิต
                    </Sidebar.Item>
                    <Sidebar.Item href="/reportevaluation" icon={FaWpforms}>
                      จำนวนผู้ที่กดแบบประเมิน
                     
                      
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>

                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
