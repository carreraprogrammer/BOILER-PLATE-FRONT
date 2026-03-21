import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthLayout } from '../../templates/AuthLayout';
import { Spinner } from '../../atoms/Spinner';
import { DynamicForm } from '../../organisms/DynamicForm';
import { GoogleButton } from '../../atoms/GoogleButton';
import { useFormStore } from '../../../store/formStore';
import { useToast } from '../../../hooks/useToast';
import styles from '../RegisterPage/RegisterPage.module.css';

const fallbackSchema={ slug:'login-form', title:'Login', submit_endpoint:'/api/v1/auth/login', submit_method:'POST' as const, fields:[{name:'email', type:'email' as const, label:'Email'},{name:'password', type:'password' as const, label:'Password'}] };

export const LoginPage=()=>{ const schema=useFormStore((state)=>state.schemas['login-form']); const isLoading=useFormStore((state)=>state.isLoading); const fetchSchema=useFormStore((state)=>state.fetchSchema); const location=useLocation() as { state?: { oauthError?: string } }; const { showError, toast } = useToast(); useEffect(()=>{ void fetchSchema('login-form').catch(()=>undefined); },[fetchSchema]); useEffect(()=>{ if(location.state?.oauthError){ showError(location.state.oauthError); } },[location.state?.oauthError,showError]); if(isLoading && !schema) return <Spinner />; return <AuthLayout title='Iniciar sesión'><DynamicForm schema={schema ?? fallbackSchema} /><div className={styles.divider} aria-hidden='true'><span className={styles.line} /><span className={styles.dividerText}>o</span><span className={styles.line} /></div><GoogleButton onClick={()=>{ window.location.assign(`${import.meta.env.VITE_API_URL ?? ''}/api/v1/auth/google`); }} /><Link to='/register'>¿No tienes cuenta? Regístrate</Link>{toast}</AuthLayout>; };
