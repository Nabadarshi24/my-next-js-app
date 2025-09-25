import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
});

// Helper method to wait for middleware to execute before continuing
function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
): Promise<void> {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

// Your actual API handler
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Run CORS middleware
    await runMiddleware(req, res, cors);

    // Your API logic
    res.status(200).json({ message: 'Hello from Next.js API with CORS' });
}
