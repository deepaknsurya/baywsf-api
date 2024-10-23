import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions, VerifyErrors } from 'jsonwebtoken';

export class JwtUtil {
    private secretKey: string;
    private tokenExpiry: string | number;

    constructor(secretKey: string, tokenExpiry: string | number = '1h') {
        this.secretKey = secretKey;
        this.tokenExpiry = tokenExpiry;
    }

    // Generate JWT token
    public generateToken(payload: object, options?: SignOptions): string {
        return jwt.sign(payload, this.secretKey, {
            expiresIn: this.tokenExpiry,
            ...options,
        });
    }

    // Verify JWT token
    public verifyToken(token: string): Promise<object | string> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, (err: VerifyErrors | null, decoded: object | any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded as object);
                }
            });
        });
    }

    // Decode JWT token (without verifying signature)
    public decodeToken(token: string): null | object | string {
        return jwt.decode(token);
    }
}


// Initialize the JWT utility with a secret key and expiry
const jwtUtil = new JwtUtil(process.env.SCRET_KEY || '', '2h');

export const generateKey = (payload: any) => jwtUtil.generateToken(payload);

export const verifyToken = (req: Request | any, res: any, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SCRET_KEY || '') as any;
        req.user = decoded; // Attach the decoded user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error: any) {
        console.log(error.message)
        return res.status(403).json({ message: 'Invalid Token' });
    }
};