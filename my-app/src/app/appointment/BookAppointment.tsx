"use client";
import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";

function BookAppointment() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Dialog>
  <DialogTrigger asChild>
  <Button className="mt-5">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogDescription>
        <div>
            <div className='grid grid-col-2'>
                <div>
            <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />
  </div>
            </div>
            <div>

            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default BookAppointment
