export const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    try {
        const response = await fetch(url, options);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Something went wrong"
            );
        }

        return result.data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error("Something went wrong");
    }
}