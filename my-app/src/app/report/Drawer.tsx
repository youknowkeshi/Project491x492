"use client";

import { Drawer, Sidebar } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineChecklist } from "react-icons/md";
import { PiStudent } from "react-icons/pi";

export function ComponentDrawer() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex items-center justify-end mr-10">
        <Button onClick={() => setIsOpen(true)}>Show Menu</Button>
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
                    <Sidebar.Item href="/" icon={HiChartPie}>
                      รูปแบบกราฟแสดงจำนวน
                      <br />
                      ผู้รับบริการแต่ละสาขา
                    </Sidebar.Item>
                    <Sidebar.Item href="/e-commerce/products" icon={PiStudent}>
                      รูปแบบกราฟแสดงจำนวน
                      <br />
                      ผู้รับบริการแต่ละชั้นปี
                    </Sidebar.Item>
                    <Sidebar.Item href="/users/list" icon={MdOutlineChecklist}>
                      รูปแบบกราฟแสดง
                      <br />
                      จำนวนผู้รับบริการแต่ละ
                      <br />
                      ชนิดของสุขภาพจิต
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    {/* <Sidebar.Item href="https://github.com/themesberg/flowbite-react/" icon={HiClipboard}>
                      Docs
                    </Sidebar.Item> */}
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
