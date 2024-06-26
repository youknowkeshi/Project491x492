"use client"
import React from 'react'


export default function ErrorPage({error,reset}: any) {
  return (
    <div className='mt-7 w-full text-center'>
        <div className='text-2xl text-red-500'>
            Error due to : {error.message}{" "}
        </div>
        <p>Handled by error.tsx in AppRouter</p>
    </div>
  )
}