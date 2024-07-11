"use client";
import React, { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./BookingList";
import axios from "axios";
import { Navbar } from "../component/์Navbar";

function Profile() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const apiUrl = "http://localhost:3000/api/events";

    try {
      const response = await axios.post(apiUrl);
      setEvents(response.data); // Assuming the API response contains event data
    } catch (error) {
      console.error(
        "Oh no! An error has arisen from the depths of the internet:",
        error
      );
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-7">
        <h2 className="font-bold text-2xl">My Booking</h2>
        <Tabs defaultValue="account" className="w-full mt-5">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <BookingList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
