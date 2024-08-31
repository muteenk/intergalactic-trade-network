import { Request } from 'express';

export interface IUserAuthRequest extends Request {
    user: string // or any other type
}
