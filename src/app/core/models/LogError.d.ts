export interface LogError {
    id: number;
    error: string;
    message: string;
    type: string;
    createdAt: Date;
    formatedDate?: string;
}