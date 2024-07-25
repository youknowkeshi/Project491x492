"use client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";

export function Navbar() {
  const admin = process.env.NEXT_PUBLIC_ADMIN as string;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  function signOut() {
    axios.post("/api/signOut").finally(() => {
      router.push("/");
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/register");
        const token = response.data.ok;
        if (token) {
          setIsLoggedIn(true);
        }
        // if (adminCMUAccount === admin) {
        //   setIsAdmin(true);
        // }
      } catch (err) {
        console.log("This is error: ", err);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
                  {isLoggedIn ? (
                    <>
                      <a
                        href="/dashboard"
                        className="rounded-md spx-3 py-2 text-sm font-semibold text-zinc-100"
                        aria-current="page"
                      >
                        หน้าแรก
                      </a>
                      <a
                        href="/register"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                      >
                        ลงทะเบียน
                      </a>
                      <a
                        href="/appointment"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                      >
                        จองคิว
                      </a>
                      <a
                        href="/report"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                      >
                        รายงานประจำเดือน
                      </a>
                      <a
                        href="/List"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                      >
                        รายการนัด
                      </a>
                      <a
                        href="/UserInfomation"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                      >
                        ข้อมูลผู้รับบริการ
                      </a>
                    </>
                    
                  ) : 
                  (
                    <a
                      href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}
                      className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
                    >
                      Log in
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-[#95BDFF] p-1 text-zinc-100 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>

                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <a
                        href="/accessCode"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                      >
                        สร้างรหัสสำหรับผู้รับบริการ
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-1"
                      >
                        Settings
                      </a>
                      <a
                        href=""
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                        onClick={signOut}
                      >
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg[-gray-800] p-2 text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a
              href="/dashboard"
              className="block rounded-md bg-[#8FC1E3] px-3 py-2 text-base font-semibold text-zinc-100"
              aria-current="page"
            >
              หน้าแรก
            </a>
            <a
              href="/register"
              className="block rounded-md px-3 py-2 text-base font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
            >
              ลงทะเบียน
            </a>
            <a
              href="/appointment"
              className="block rounded-md px-3 py-2 text-base font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
            >
              จองคิว
            </a>
            <a
              href="/artical"
              className="block rounded-md px-3 py-2 text-base font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
            >
              Artical
            </a>
            <a
              href="/report"
              className="block rounded-md px-3 py-2 text-base font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
            >
              รายงานประจำเดือน
            </a>
            <a
              href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}
              className="block rounded-md px-3 py-2 text-base font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
            >
              Login
            </a>
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-semibold leading-none text-zinc-100">
                  Tom Cook
                </div>
                <div className="text-sm font-semibold leading-none text-zinc-100">
                  tom@example.com
                </div>
              </div>
              <button
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-zinc-100 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <a
                href="#accessCode"
                className="block rounded-md px-3 py-2 text-base font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
              >
                สร้างรหัสสำหรับผู้รับบริการ
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-semibold text-zinc-100 hover:bg-[#8FC1E3] hover:text-zinc-100"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
