export default async function getAllUsers() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    return users;

}
