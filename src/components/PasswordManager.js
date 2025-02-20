import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabase";  // Ensure correct import
import "./PasswordManager.css"; 

const PasswordManager = ({ user }) => {
  const [passwords, setPasswords] = useState([]);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  // Fetch saved passwords
  useEffect(() => {
    const fetchPasswords = async () => {
      if (!user || !user.id) return;

      const { data, error } = await supabase
        .from("passwords")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching passwords:", error.message);
      } else {
        setPasswords(data || []);
      }
    };

    fetchPasswords();
  }, [user]);

  // Save a new password
  const handleSave = async () => {
    if (!user || !user.id) {
      alert("You must be logged in to save passwords.");
      return;
    }

    if (!title.trim() || !password.trim()) {
      alert("Enter both a title and password.");
      return;
    }

    const { data, error } = await supabase
      .from("passwords")
      .insert([{ title, password, user_id: user.id }])
      .select();

    if (error) {
      console.error("Error saving password:", error.message);
      alert(`Failed to save password! ${error.message}`);
      return;
    }

    setPasswords([...passwords, ...data]); // Update UI after saving
    setTitle("");
    setPassword("");
    alert("Password saved successfully!");
  };

  // Copy password to clipboard
  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  // Edit password
  const handleEdit = (id, oldPassword) => {
    setEditingId(id);
    setNewPassword(oldPassword);
  };

  // Update password in the database
  const handleUpdate = async (id) => {
    const { error } = await supabase
      .from("passwords")
      .update({ password: newPassword })
      .eq("id", id);

    if (error) {
      console.error("Error updating password:", error.message);
      alert(`Failed to update password! ${error.message}`);
      return;
    }

    setPasswords(
      passwords.map((item) =>
        item.id === id ? { ...item, password: newPassword } : item
      )
    );
    setEditingId(null);
    alert("Password updated successfully!");
  };

  return (
    <div className="password-container">
      <h2>Password Manager</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>

      <h3>Saved Passwords:</h3>
      {passwords.length > 0 ? (
        <ul>
          {passwords.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>:{" "}
              {editingId === item.id ? (
                <>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(item.id)}>Update</button>
                </>
              ) : (
                <>
                  {item.password}{" "}
                  <button onClick={() => handleCopy(item.password)}>Copy</button>
                  <button onClick={() => handleEdit(item.id, item.password)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No passwords saved.</p>
      )}
    </div>
  );
};

export default PasswordManager;
