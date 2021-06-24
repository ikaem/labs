import { navigate, RouteComponentProps } from '@reach/router';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../services/auth';

interface LoginProps extends RouteComponentProps {}

export const Login: React.FC<LoginProps> = () => {
  const { isLoggedIn } = useAuth();
  const history = useHistory();

  useEffect(() => {
    //   TODO this needs revert
    if (!isLoggedIn) history.push('/home');
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};
