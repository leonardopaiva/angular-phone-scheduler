export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
    code?: string;
    status?: number | string;
}