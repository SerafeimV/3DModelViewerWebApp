import apiClient from "../api/client.ts";

export function useGetModelById(setOnSelect: ((file: string) => void) | undefined) {
    const fetchModelById = async (id: number | undefined) => {
        const response = await apiClient.get("/models/get/" + id, {responseType: "blob"});

        try {
            if (id === undefined) throw new Error("ID is undefined");
            const ojectUrl = URL.createObjectURL(response.data);
            if (setOnSelect) {
                setOnSelect(ojectUrl);
            }
        } catch (e) {
            console.log(e);
        }

        console.log("Model loaded successfully:", response);
    }
    return fetchModelById;
}