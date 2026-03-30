const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const getNotifications = async () => {
    try {
        const request = await fetch(`${API_BASE_URL}/my-profile/notifications`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("JWT")}`,
                "Content-Type": "application/json",
            }
        })
        if (!request.ok) return null
        const response = await request.json();
        return response
    } catch (err) {
        console.log(err)
    }
}
