import { Link } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { useAuthStore } from '../../../store/authStore';
export const Header=()=>{ const user=useAuthStore((state)=>state.user); const logout=useAuthStore((state)=>state.logout); return <header className='flex items-center justify-between gap-4'><div>{user?.name ?? 'Invitado'}</div><nav className='flex gap-3'><Link to='/profile'>Mi perfil</Link><Button label='Cerrar sesión' variant='ghost' onClick={()=>void logout()} /></nav></header>; };
