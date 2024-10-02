import axios from "axios";
import React from "react";

export function Navbar() {
  const signOut = async () => {
    try {
      await axios.post("/api/signOut");
      window.location.href = "/";
      // Additional actions after signing out, if needed.
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
                <img
                  className="h-20 w-20"
                  src="/logoent.png"
                  alt="Your Company"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">

                  <a
                    href="/dashboard"
                    className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                    aria-current="page"
                  >
                    หน้าแรก
                  </a>
                  <a
                    href="/register"
                    className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                  >
                    ลงทะเบียน
                  </a>
                  <a
                    href="/appointment"
                    className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                  >
                    จองคิว
                  </a>
                  <a
                    href="/profile"
                    className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                  >
                    ประวัติการพบนักจิตทางคณะ
                  </a>
                  <a
                    href="/Evaluationform"
                    className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                    aria-current="page"
                  >
                    แบบประเมิน
                  </a>
                  {/* <a
                    href="/article"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    บทความ
                  </a> */}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <a
                    className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
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
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-blue"
            >
              หน้าแรก
            </a>
            {/* <a
              href="/register"
             className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              ลงทะเบียน
            </a> */}
            <a
              href="/appointment"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              จองคิว
            </a>
            <a
              href="/profile"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              ประวัติการพบนักจิตทางคณะ
            </a>
            <a
              href="/Evaluationform"
             className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              แบบประเมิน
            </a>

            {/* <a
              href="/artical"
             className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white""
            >
              บทความ
            </a> */}


          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">


            </div>
            <div className="mt-3 space-y-1 px-2">

              <a
                className="block rounded-md px-3 py-2 text-base font-medium text-zinc-100 hover:bg-[#8FC1E3] hover:text-white"
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