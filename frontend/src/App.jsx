import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/appRoutes";
import Headerbar from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <div className="flex container flex-col min-h-screen w-full max-w-full overflow-hidden">
        <header className="w-full">
          <Headerbar />
        </header>
        
        <main className="flex-grow">
          <AppRoutes />
        </main>
        
        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
