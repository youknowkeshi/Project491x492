import axios from "axios";
import React from "react";

export function Navbar() {
  const signOut = () => {
    try {
      axios.post("/api/signOut");
      // Additional actions after signing out, if needed.
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <nav className="bg-white ">
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
                    className="rounded-md spx-3 py-2 text-sm font-semibold text-gray-700"
                    aria-current="page"
                  >
                    หน้าแรก
                  </a>
                  <a
                    href="/register"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-indigo-500 hover:text-zinc-100"
                  >
                    ลงทะเบียน
                  </a>
                  <a
                    href="/appointment"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    จองคิว
                  </a>
                  <a
                    href="/profile"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    ประวัติการพบนักจิตทางคณะ
                  </a>
                  <a
                    href="/Evaluationform"
                    className="rounded-md spx-3 py-2 text-sm font-semibold text-gray-700"
                    aria-current="page"
                  >
                    แบบประเมิน
                  </a>
                  <a
                    href="/article"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    บทความ
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <a
                    href="/"
                    className="bg-indigo-500 rounded-md px-3 py-2 text-sm font-semibold text-white hover:bg-[#8FC1E3] hover:text-zinc-100"
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
      </nav>
    </div>
  );
}
