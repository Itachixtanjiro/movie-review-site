import React from 'react'

export default function Spinner() {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
        <div className='h-10 w-10 border-solid border-4 border-t-transparent border-grey-200 rounded-full animate-spin'>
        </div>
    </div>
  )
}
