export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginResponse {
    token: string;
    user?: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        createdAt: string;
        updatedAt: string;
    }
}

export interface ModelFile {
    id: number;
    filename: string;
    size: number;
    uploadDate: string;
    uploadedBy: string;
    path: string;
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}