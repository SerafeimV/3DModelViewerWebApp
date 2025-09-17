import apiClient from "../api/client.ts";

export function useGetModelById(setOnSelect: ((file: string) => void) | undefined) {
    return async (id: number | undefined) => {
        const response = await apiClient.get("/models/get/" + id, {responseType: "blob"});

        try {
            if (id === undefined) throw new Error("ID is undefined");
            const objectUrl = URL.createObjectURL(response.data);
            if (setOnSelect) {
                setOnSelect(objectUrl);
            }
        } catch (e) {
            console.log(e);
        }
    };
}