import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../../services/auth';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../services/auth/types';
import { Layout } from '../../common/components';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const Login: React.FC = () => {
  const { isLoggedIn, login } = useAuth();
  const history = useHistory();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginCredentials>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  useEffect(() => {
    //   TODO this needs revert
    if (isLoggedIn) history.push('/home');
  }, [isLoggedIn]);

  const onSubmit = handleSubmit(login);

  return (
    <Layout>
      <section className='login_section'>
        <header className='login_header'>
          <h2>Login</h2>
        </header>
        <form className='login_form' onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              required
              {...register('username')}
            />
            {errors.username?.message && (
              <div className='text-error'>{errors.username?.message}</div>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              required
              {...register('password')}
            />
            {errors.password?.message && (
              <div className='text-error'>{errors.password?.message}</div>
            )}
          </div>
          {/* TODO make this a custom button */}
          {/* TODO maybe use as a start button, too */}
          <button type='submit'>Login</button>
        </form>
      </section>
    </Layout>
  );
};
