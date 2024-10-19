import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./components/appRoutes"
import Headerbar from "./components/header"

function App() {

  return (
    <>
      <Router>
        <div className="flex flex-col box-border w-screen min-h-screen">
        <div>
          <Headerbar />
        </div>
        <div>
          <AppRoutes />
        </div>
        //Footer
        </div>
      </Router>
    </>
  )
}

export default App
