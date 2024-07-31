
import axios from "axios";
import React from "react";


export function Navbaradmin() {

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
            <nav className="bg-[#95BDFF]">
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
                                        href="/List"
                                        className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                                        aria-current="page"
                                    >
                                        รายการนัด
                                    </a>
                                    <a
                                        href="/UserInfomation"
                                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                                    >
                                        ข้อมูลผู้รับบริการ
                                    </a>
                                    <a
                                        href="/report"
                                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                                    >
                                        รายงานประจำเดือน
                                    </a>
                                    {/* <a
                  href="/Evaluationform"
                  className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                  aria-current="page"
                >
                  แบบประเมิน
                </a> */}
                                    <a
                                        href="/articleadmin"
                                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                                    >
                                        บทความ
                                    </a>
                                    
                                    <a
                                        href="/accessCode"
                                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                                    >
                                        รห้สสำหรับผู้เข้ารับบริการครั้งแรก
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <div className="relative ml-3">
                                    <a
                                        href="/"
                                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
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
