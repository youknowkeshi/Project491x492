"use client";
import React, { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./BookingList";
import { Navbar } from "../component/์Navbar";

function Profile() {

  return (
    <div>
      <Navbar />
      <div className="mt-7">
        <h2 className="ml-10 font-bold text-2xl">ประวัติการพบนักจิตทางคณะ</h2>
        <Tabs defaultValue="account" className="w-full mt-5">
          <TabsContent value="account">
            <BookingList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
