import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="w-screen h-screen flex justify-center items-center bg-green-500">
      <h1 className="text-3xl font-bold underline center">
        Hello world!
      </h1>
    </div>
    </>
  )
}

export default App
