import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchProfile = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users/profile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the JWT token
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
            } else {
                console.error("Failed to fetch profile:", data.message);
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchProfile();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};