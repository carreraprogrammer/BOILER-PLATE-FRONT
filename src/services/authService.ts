import { api } from './api';
import type { AuthResponse, LoginCredentials } from '../types/auth.types';
import type { AuthUser } from '../types/authorization.types';

const mapMeResponse = (data: { data?: { id?: number | string; attributes?: Partial<AuthUser> & { superAdmin?: boolean; super_admin?: boolean } } }): AuthUser => ({
  id: Number(data.data?.id ?? data.data?.attributes?.id ?? 0),
  email: data.data?.attributes?.email ?? '',
  name: data.data?.attributes?.name ?? '',
  avatarUrl: data.data?.attributes?.avatarUrl ?? null,
  authProvider: data.data?.attributes?.authProvider ?? null,
  superAdmin: data.data?.attributes?.superAdmin ?? data.data?.attributes?.super_admin ?? false,
  permissions: data.data?.attributes?.permissions ?? [],
});

export const authService={ async login(credentials:LoginCredentials):Promise<AuthResponse>{ const {data}=await api.post('/api/v1/auth/login',credentials); return data as AuthResponse; }, async refresh(refreshToken:string):Promise<AuthResponse>{ const {data}=await api.post('/api/v1/auth/refresh',{ refreshToken }); return data as AuthResponse; }, async me():Promise<AuthUser>{ const {data}=await api.get('/api/v1/auth/me'); return mapMeResponse(data as { data?: { id?: number | string; attributes?: Partial<AuthUser> & { superAdmin?: boolean; super_admin?: boolean } } }); } };
