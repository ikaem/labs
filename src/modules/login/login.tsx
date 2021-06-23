import { RouteComponentProps } from '@reach/router';

interface LoginProps extends RouteComponentProps {}

export const Login: React.FC<LoginProps> = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};
