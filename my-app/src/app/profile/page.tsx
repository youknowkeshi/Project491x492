import React from "react";
import Nav from "../component/Nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./BookingList";

function profile() {
  return (
    <div>
      <Nav />
      <div className="mt-7">
        <h2 className="font-bold text-2xl">My Booking</h2>
        <Tabs defaultValue="account" className="w-full mt-5">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <BookingList />
          </TabsContent>
          <TabsContent value="password"></TabsContent>
          <TabsContent value="account">
            <BookingList />
          </TabsContent>
          <TabsContent value="account">
            <BookingList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default profile;
