import apiClient from "../api/client.ts";
import type {ModelFile} from "../api/types.ts";
import {useEffect, useState} from "react";

export function useLoadModels() {

    const [models, setModels] = useState<ModelFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchModels = async () => {
        setLoading(true);
        setError(null);
        try {
            let response = await apiClient.get("/models/getAll");
            console.log("Models loaded successfully:", response.data);

            setModels(response.data);
        } catch (err: any) {
            let errorMessage = "An error occurred during loading models"
            if (err.response?.data) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModels().then(() => {
            console.log("Models fetched");
        });
    }, []);

    return {models, error, loading, refresh: fetchModels}
}