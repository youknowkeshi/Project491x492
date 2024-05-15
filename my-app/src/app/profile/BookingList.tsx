import React from 'react'

function bookinglist() {
  return (
    <div className='flex gap-4 items-center mt-5 border rounded-lg p-5'>
      <img
      src = "https://www.wellingtonregional.com/sites/wellingtonregional.com/files/doctors_visit_1200x900.jpg"
      width= "200"
      height= "200"
      className='border rounded-lg ml-4'
      />
    
      <div className='flex flex-col gap-4 p-5'>
      <h2 className='font-bold text-[18px]'>
          Dr : Pongtante Namsawat
        </h2>
        <h2>
          Room 1,Faculty of Engineering
        </h2>
        <h2>
          Time : 9.00-10.00 
        </h2>
        <h2>
          Appointment : 16-Feb-2024
        </h2>
        
      </div>
    </div>
  )
}

export default bookinglist
