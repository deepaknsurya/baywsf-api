"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateKey = exports.JwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtUtil {
    constructor(secretKey, tokenExpiry = '1h') {
        this.secretKey = secretKey;
        this.tokenExpiry = tokenExpiry;
    }
    // Generate JWT token
    generateToken(payload, options) {
        return jsonwebtoken_1.default.sign(payload, this.secretKey, Object.assign({ expiresIn: this.tokenExpiry }, options));
    }
    // Verify JWT token
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, this.secretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
    // Decode JWT token (without verifying signature)
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.JwtUtil = JwtUtil;
// Initialize the JWT utility with a secret key and expiry
const jwtUtil = new JwtUtil(process.env.SCRET_KEY || '', '2h');
const generateKey = (payload) => jwtUtil.generateToken(payload);
exports.generateKey = generateKey;
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Bearer token
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SCRET_KEY || '');
        req.user = decoded; // Attach the decoded user to the request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.log(error.message);
        return res.status(403).json({ message: 'Invalid Token' });
    }
};
exports.verifyToken = verifyToken;
