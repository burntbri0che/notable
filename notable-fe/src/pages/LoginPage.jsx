import React, { useState } from "react";
import { route } from "../../../notable-be/routes/api/auth";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in with", username, password);

        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => {
                if (res.ok) {
                    const token = res.headers.get("auth-token");
                    console.log("Token:", token);
                    return res.text(); // Assuming the server sends a text response
                } else {
                    throw new Error(`Login failed with status: ${res.status}`);
                }
            })
            .then((data) => {
                console.log("Response from server:", data);
            })
            .catch((err) => console.log("Error:", err));
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="auth-input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
