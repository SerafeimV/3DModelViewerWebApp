import apiClient from "../api/client.ts";
import type {LoginRequest, LoginResponse, ApiError, RegisterRequest} from "../api/types.ts";

export class AuthService {

    static async login({email, password}: LoginRequest): Promise<LoginResponse> {

        console.log("Submitting login request");
        try {
            const response = await apiClient.post("/api/auth/login", {email, password});

            // Handle successful login
            if (response.data?.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
            }

            return response.data;
            // Navigate to dashboard or home page
        } catch (err: any) {
            if (err.response?.data) {
                throw {
                    message: err.response.data.message,
                    status: err.response.status,
                    errors: err.response.data.errors
                } as ApiError;
            }

            throw {
                message: err.message || "An error occurred during login",
                status: err.status || 500
            } as ApiError;
        }
    }

    static isAuthenticated() {
        return localStorage.getItem("token") !== null;
    }

    static async register({email, firstName, lastName, password, confirmPassword}: RegisterRequest) {
        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const response = await apiClient.post("/api/auth/register", {email, firstName, lastName, password});
            return response.data;
        } catch (err: any) {
            if (err.response?.data) {
                throw {
                    message: err.response.data.message,
                    status: err.response.status,
                    errors: err.response.data.errors
                } as ApiError;
            }
            throw {
                message: err.message || "An error occurred during registration",
                status: err.status || 500
            } as ApiError;
        }
    }

    static async logout() {
        localStorage.clear();
        const response = await apiClient.post("/api/auth/logout");
        console.log(response);
    }
}
