import type { AuthUser } from './authorization.types';
export interface LoginCredentials { email:string; password:string; }
export interface RegisterPayload { name:string; email:string; password:string; passwordConfirmation:string; }
export interface AuthTokens { accessToken:string; refreshToken:string; }
export interface AuthResponse { data:{ attributes:{ name:string } }; meta?:Record<string, unknown>; tokens:AuthTokens; user?:AuthUser; }
export interface JwtPayload { user_id:number; email:string; super_admin:boolean; permissions:string[]; jti:string; exp:number; }