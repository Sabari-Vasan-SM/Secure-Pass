import React, { useState } from "react";
import { supabase } from "../config/supabase";

const Auth = ({ onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (isSignUp) => {
    setLoading(true);
    setError("");

    let { user, error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      onAuth(user);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Password Manager</h2>
      {error && <p className="error">{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => handleAuth(false)} disabled={loading}>Login</button>
      <button onClick={() => handleAuth(true)} disabled={loading}>Sign Up</button>
    </div>
  );
};

export default Auth;
