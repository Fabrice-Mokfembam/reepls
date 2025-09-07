import { Loader } from 'lucide-react'
import React from 'react'

const ProfileRightBarLoader:React.FC = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center relative'>
         <div  className="bg-neutral-700 p-4 rounded-md gap-2 flex flex-col absolute top-0 w-full ">
            <div className="h-4 w-1/3 bg-neutral-600 rounded animate-pulse" />
           
          </div>
       <Loader className='animate-spin text-primary-400'/>
    </div>
  )
}

export default ProfileRightBarLoader