import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/VerticalNavbar";
import Login from "./components/Login";
import SmartSearch from "./components/SmartSearch";
import Results from "./components/Results";
import Contact from "./components/Contact";
import Contacts from "./components/Contacts";
import SmartReports from "./components/SmartReports";
import SmartCMA from "./components/SmartCMA";

import "./assets/styles/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/smart-search" element={<SmartSearch />} />
              <Route path="/results" element={<Results />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/smart-reports" element={<SmartReports />} />
              <Route path="/smart-cma" element={<SmartCMA />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
