const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function listProducts() {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}

export async function getProductById(id: number) {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}