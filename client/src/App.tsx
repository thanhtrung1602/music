// import { useState } from 'react'
import './App.scss'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <h1 className='font-bold text-xl underline'>Hello world! {import.meta.env.VITE_LOCAL}</h1>
      </div>
    </>
  )
}

export default App
