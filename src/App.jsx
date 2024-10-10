import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'flowbite/dist/flowbite.css';
import 'flowbite';
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfig";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
