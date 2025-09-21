import type { NextApiRequest, NextApiResponse } from 'next';

import VerificationEmailTemplate from '@/emails/VerificationEmailTemplate';
import { VerificationEmailResponse } from '@/types';
import { resend } from '@/lib/resend';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<VerificationEmailResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification code',
            react: VerificationEmailTemplate({ username, otp: verifyCode }),
        });

        return {
            success: true,
            message: 'Verification email sent successfully'
        };

    } catch (emailError) {
        console.log(emailError);
        return {
            success: false,
            message: 'Failed to send verification email'
        };
    }
};
