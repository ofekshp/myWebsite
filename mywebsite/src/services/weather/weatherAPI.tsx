import axios, { AxiosResponse } from "axios";

export const getWeatherData = async (city: string): Promise<AxiosResponse> => {
    try {
        const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;   
        const response: AxiosResponse = await axios.get(baseURL);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            throw error;
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred.");
        }
    }
};
