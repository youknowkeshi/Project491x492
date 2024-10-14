import axios from "axios";
import React from "react";
import { Button, Tooltip, Dropdown } from "flowbite-react";

export function Navbaradmin() {

  const signOut = async () => {
    try {

      await axios.post("api/signOutGoogle");
      await axios.post("/api/signOut");
      window.location.href = "/adminlogin";

    } catch (error) {
      console.error("Error signing out:", error);
    }
  };



  return (
    <div>
      <nav className="bg-[#bbd9ee]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/List">
                  <img
                    className="h-20 w-20"
                    src="/logoent.png"
                    alt="Your Company"
                  />
                </a>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/List"
                    className="rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
                  >
                    รายการนัด
                  </a>
                  <a
                    href="/UserInfomation"
                    className="rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
                  >
                    ข้อมูลผู้รับบริการ
                  </a>
                  <a
                    href="/report"
                    className="rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
                  >
                    รายงานประจำเดือน
                  </a>
                  {/* <a
                    href="/articleadmin"
                    className="rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
                  >
                    บทความ
                  </a> */}
                  <a
                    href="/accessCode"
                    className="rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
                  >
                    รหัสสำหรับผู้เข้ารับบริการครั้งแรก
                  </a>

                  <div className="group relative cursor-pointer py-2">
                    <a className="menu-hover rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800" >
                      เปิด/ปิดเวลานัด
                    </a>
                    <div
                      className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

                      <a href="/appointmentadmin"
                        className="rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800">
                        ปิดเวลานัด
                      </a>

                      <a href="/openappointmentadmin"
                        className="rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800">
                        เปิดเวลา
                      </a>

                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <a
                    className="rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
                    onClick={signOut}
                  >
                    ออกจากระบบ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a
              href="/List"
              className="block rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
            // aria-current="page"
            >
              รายการนัด
            </a>
            <a
              href="/UserInfomation"
              className="block rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
            >
              ข้อมูลผู้รับบริการ
            </a>
            <a
              href="/report"
              className="block rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
            >
              รายงานประจำเดือน
            </a>
            <a
              href="/accessCode"
              className="block rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
            >
              รหัสสำหรับผู้เข้ารับบริการครั้งแรก
            </a>




            <div className="group relative cursor-pointer py-2">
              <a className="menu-hover rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800" >
                เปิด/ปิดเวลานัด
              </a>
              <div
                className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

                <a href="/appointmentadmin"
                  className="block rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800">
                  ปิดเวลานัด
                </a>

                <a href="/openappointmentadmin"
                  className="block rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800">
                  เปิดเวลา
                </a>

              </div>
            </div>


            {/* <a
              href="/articleadmin"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
            >
              บทความ
            </a> */}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="mt-3 space-y-1 px-2">
              <a
                className="block rounded-md px-3 py-2 text-md font-semibold text-gray-800 hover:bg-[#8FC1E3] hover:text-gray-800"
                onClick={signOut}
              >
                ออกจากระบบ
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
