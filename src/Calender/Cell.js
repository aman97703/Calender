import React, { useEffect, useState } from 'react'

const Cell = ({children, className, onClick, isActive, eventDate, edate}) => {
  const [eventExist, setEventExist] = useState(false)
  useEffect(()=>{
    if(eventDate && eventDate.length > 0){
      setEventExist(eventDate.includes(edate))
    }
  },[eventDate])
  return (
    <div onClick={onClick} className={className+` h-12 flex items-center justify-center border-r border-b ${!isActive && onClick && "hover:bg-gray-100 cursor-pointer active:bg-gray-200" } ${isActive && 'bg-blue-600 text-white'} ${eventExist ? 'bg-green-600 text-white hover:bg-green-500':''}`}>{children}</div>
  )
}

export default Cell