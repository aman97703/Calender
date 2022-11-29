import { format } from 'date-fns'
import React, { useState } from 'react'
import './App.css'
import Calender from './Calender/Calender'

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  return (
    <div className='mt-16 flex flex-col items-center w-[100vw]'>
      <p className='mb-5'>Selected Date : {format(currentDate, "dd LLLL yyyy")}</p>
      <button className='px-4 py-1 mb-5 text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-800' onClick={()=>setCurrentDate(new Date())}>Today</button>
      <Calender
        value={currentDate}
        onChange={setCurrentDate}
      />
    </div>
  )
}

export default App