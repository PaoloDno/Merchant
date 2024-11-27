import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/appRoutes";
import Headerbar from "./components/header";
import Footer from "./components/footer";

import ThemeWrapper from "./components/themeWrapper";

function App() {
  return (
    <Router>
      <ThemeWrapper>
      <div className="flex flex-col min-h-screen min-w-screen justify-center overflow-hidden">
        <header className="w-full">
          <Headerbar />
        </header>
        
        <main className="flex-grow w-full bg-green-300 flex items-center justify-center">
          <AppRoutes />
        </main>
        
        <footer className="w-full">
          <Footer />
        </footer>
      </div>
      </ThemeWrapper>
    </Router>
  );
}

export default App;
