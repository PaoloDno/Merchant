import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/appRoutes";
import Headerbar from "./components/header";
import Footer from "./components/footer";
//error handling
import ErrorAlert from "./components/error/errorAlert";
import TestError from "./components/error/testError";
import TestThunk from "./components/error/testThunk";

import ThemeWrapper from "./components/themeWrapper";

function App() {
  return (
    <Router>
      <ThemeWrapper>
      <div className="flex flex-col min-h-screen min-w-screen justify-center overflow-hidden" >
        <ThemeWrapper >
        <header className="w-full" >
          <Headerbar />
        </header>
        <ErrorAlert className="w-full" />
        <TestError />
        <TestThunk />
        </ThemeWrapper>
        <main className="w-full min-w-screen bg-green-300 flex items-center justify-center" >
          <AppRoutes />
        </main>
        <footer className="w-full" >
          <Footer />
        </footer>
      </div>
      </ThemeWrapper>
    </Router>
  );
}

export default App;
