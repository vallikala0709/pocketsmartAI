const API_URL = "http://127.0.0.1:8000";

let token = localStorage.getItem("token");


async function register(username, email, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
    }

    return data;
}


async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Login failed");
    }

    token = data.access_token;

    localStorage.setItem("token", token);

    return data;
}


async function getProfile() {
    const response = await fetch(`${API_URL}/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Unable to get profile");
    }

    return data;
}


async function sendMessage(message) {
    if (!token) {
        throw new Error("Please login first");
    }

    const response = await fetch(`${API_URL}/chat`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
            message: message
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Chat request failed");
    }

    return data;
}


function logout() {
    localStorage.removeItem("token");
    token = null;
}