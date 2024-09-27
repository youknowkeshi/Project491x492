import axios from "axios";
import React from "react";

export function Navbaradmin() {

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop()?.split(';').shift();
            if (cookieValue !== undefined) {
                return cookieValue;
            }
        }
        return undefined;
    };
    
   
    const signOut = async () => {
        try {
            const responese = await axios.get("api/register")
            const token_cmu = getCookie("cmu-oauth-example-token");
            const token_google = getCookie("google-oauth-example-token");
            

            await axios.post("api/signOutGoogle");
            await axios.post("/api/signOut");
            window.location.href = "/adminlogin"; 
            
            if(token_cmu){
                await axios.post("api/signOutGoogle") 
                window.location.href = "/adminlogin";        
            }
            else if(token_google){
              await axios.post("/api/signOut") 
              window.location.href = "/adminlogin";        
          }
           
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
                <a href="/dash3">
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
                    className="rounded-md px-3 py-2 text-md font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    รายการนัด
                  </a>
                  <a
                    href="/UserInfomation"
                    className="rounded-md px-3 py-2 text-md font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    ข้อมูลผู้รับบริการ
                  </a>
                  <a
                    href="/report"
                    className="rounded-md px-3 py-2 text-md font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    รายงานประจำเดือน
                  </a>
                  <a
                    href="/articleadmin"
                    className="rounded-md px-3 py-2 text-md font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    บทความ
                  </a>
                  <a
                    href="/accessCode"
                    className="rounded-md px-3 py-2 text-md font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    รหัสสำหรับผู้เข้ารับบริการครั้งแรก
                  </a>
                  <a
                    href="/appointmentadmin"
                    className="rounded-md px-3 py-2 text-md font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                  >
                    ปิดเวลานัด
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <a
                    href="/"
                    className="rounded-md px-3 py-2 text-md font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
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
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-blue"
              // aria-current="page"
            >
              รายการนัด
            </a>
            <a
              href="/UserInfomation"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              ข้อมูลผู้รับบริการ
            </a>
            <a
              href="/report"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              จองคิว
            </a>
            <a
              href="/profile"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              รายงานประจำเดือน
            </a>
            <a
              href="/accessCode"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              รหัสสำหรับผู้เข้ารับบริการครั้งแรก
            </a>

            <a
              href="/articleadmin"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#8FC1E3] hover:text-white"
            >
              บทความ
            </a>
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="mt-3 space-y-1 px-2">
              <a
                href="/"
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
