export interface VerificationEmailResponse {
    success: boolean;
    message?: string;
    data?: {
        email: string;
        otp: string;
    };
};
