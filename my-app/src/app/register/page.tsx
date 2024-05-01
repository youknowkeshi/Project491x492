"use client";
import { Button, Card, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import React from 'react'

type Props = {}

export default function RegisterPage({}: Props) {
  return (
    <div className="justify-center">
            <Card  className="max-w-2xl">
            <form className="flex flex-col gap-4">
            <div>
                <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput id="password1" type="password" required />
            </div>
            <div className="max-w-md">
            <div className="mb-2 block">
                <Label htmlFor="comment" value="Your message" />
            </div>
            <Textarea id="comment" placeholder="Leave a comment..." required rows={4} />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
            </form>
        </Card>
  </div>
  )
}