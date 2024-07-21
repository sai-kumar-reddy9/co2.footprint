import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../pages/app.css';

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Import and use AuthContext

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://co2-footprint.onrender.com/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data);
        login({ username: data.username, email: data.email }); // Update the user state in AuthContext
        alert("User registered successfully");
        navigate('/login');
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        {error && <div className="error">{error}</div>}
        <div className="input-box">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" Username"
            required
          />
          <i className='bx bxs-user'></i>
        </div>
        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <i className='bx bx-mail-send'></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <i className='bx bxs-lock-alt'></i>
        </div>
        <button type="submit" className="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
