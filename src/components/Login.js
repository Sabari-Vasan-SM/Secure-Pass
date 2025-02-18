import React, { useState } from "react";
import { supabase } from "../config/supabase"; // Correct import
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.error("Login error:", error.message);
      alert("Failed to send login email");
    } else {
      alert("Check your email for the login link!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
