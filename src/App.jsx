import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
function App() {

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4'>
      <div className='text-center mb-8'><h1 className='text-5xl font-bold mb-2'>AI Image Enhancer⭐</h1><p className='text-3xl font-semibold'>Enhance your images with ease</p></div>
      <Home />
      <div className='text-xl font-medium text-gray-600 text-center mt-8'>
        <p>
          This is a simple image enhancer application built with React.
        </p>
      </div>

    </div>
  )
}

export default App
