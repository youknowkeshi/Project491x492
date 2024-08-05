"use client";
import React, { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./BookingList";
import { Navbar } from "../component/์Navbar";

function Profile() {
  return (
    <div>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
            ประวัติการพบนักจิตทางคณะ
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-row  gap-7">
          <Tabs defaultValue="account" className="w-full mt-5">
            <TabsContent value="account">
              <BookingList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
