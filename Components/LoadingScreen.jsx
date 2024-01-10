import React from 'react'
import LoadingIcons from 'react-loading-icons'

const LoadingScreen = () => {
  return (
    <main className='h-[100vh] w-full bg-[#111111c6] absolute z-[100] top-0 flex justify-center items-center' >
        <LoadingIcons.Oval/>
    </main>
  )
}

export default LoadingScreen
