export async function request(URL, option) {
    try {
        const response = await fetch(URL, option);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}