import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spinner } from '../../atoms/Spinner';

export const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message') ?? 'No se pudo completar la autenticación con Google.';

    if (error) {
      navigate('/login', {
        replace: true,
        state: { oauthError: message },
      });
      return;
    }

    navigate('/login', { replace: true });
  }, [navigate, searchParams]);

  return <Spinner />;
};
