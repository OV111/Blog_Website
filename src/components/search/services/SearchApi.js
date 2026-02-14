const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUserData = async (query) => {
  const trimmedQuery = query?.trim() || "";
  if (!trimmedQuery) return [];

  const request = await fetch(
    `${API_BASE_URL}/search/users?q=${encodeURIComponent(trimmedQuery)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const response = await request.json();
  if (!request.ok) {
    console.log("Search API error:", response);
    return [];
  }

  return response.results ?? [];
};
