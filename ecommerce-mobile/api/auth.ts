const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
        console.log(data);
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}

export async function signup(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
        console.log(data);
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}