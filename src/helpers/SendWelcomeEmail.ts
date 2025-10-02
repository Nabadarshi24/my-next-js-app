import type { NextApiRequest, NextApiResponse } from 'next';
import { VerificationEmailResponse } from '@/types';
import { resend } from '@/lib/resend';
import WelcomeEmailTemplate from '@/emails/WelcomeEmailTemplate';

export async function sendWelcomeEmail(
    email: string,
    username: string,
    loginUrl: string
): Promise<VerificationEmailResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Welcome email',
            react: WelcomeEmailTemplate({ username, loginUrl }),
        });

        return {
            success: true,
            message: 'Welcome email sent successfully'
        };

    } catch (emailError) {
        console.log(emailError);
        return {
            success: false,
            message: 'Failed to send Welcome email'
        };
    }
};
