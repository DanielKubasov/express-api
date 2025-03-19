import jwt, {JwtPayload} from 'jsonwebtoken';

export async function signToken(data: any, key: string): Promise<string> {
    const encoded = jwt.sign(data, key);
    return encoded;
}

export async function verifyToken(token: string, key: string): Promise<string | JwtPayload> {
    const decoded = jwt.verify(token, key);
    return decoded;
}
