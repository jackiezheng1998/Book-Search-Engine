// route to get loggin in user's info and saved books (needs a token)

export const GET_ME = (token) => {
    return fetch(`${SERVER_URL}/api/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Something went wrong!");
        }
        return res.json();
    });
};

export const createUser = async (userFormData) => {
    const response = await fetch(`${SERVER_URL}/api/users`, {
        method: "POST",
        body: JSON.stringify(userFormData),
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
    return response.json();
};

export const loginUser = async (userFormData) => {
    const response = await fetch(`${SERVER_URL}/api/users/login`, {
        method: "POST",
        body: JSON.stringify(userFormData),
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
    return response.json();
};

export const saveBook = async (bookData, token) => {
    const response = await fetch(`${SERVER_URL}/api/users`, {
        method: "PUT",
        body: JSON.stringify(bookData),
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
    return response.json();
};

export const removeBook = async (bookId, token) => {
    const response = await fetch(`${SERVER_URL}/api/users/books/${bookId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
    return response.json();
};

export const searchGoogleBooks = async (query) => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    if (!response.ok) {
        throw new Error("Something went wrong!");
    }
    return response.json();
};

