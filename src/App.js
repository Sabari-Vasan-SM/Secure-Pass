import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./config/supabase";
import Login from "./components/Login";
import PasswordManager from "./components/PasswordManager";

const App = () => {
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <PasswordManager user={user} /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
