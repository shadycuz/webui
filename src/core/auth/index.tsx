import React, { FC, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { AuthContainter } from 'core/auth/container';
import { useFlexgetAPI } from 'core/api';
import LoginCard from './LoginCard';
import SplashScreen from './Splash';
import { Logo } from './styles';
import { LoginReq } from './types';

type Props = Partial<RouteComponentProps>;

const Card = LoginCard as any;

const LoginPage: FC<Props> = ({ location }) => {
  const { from } = location?.state || { from: { pathname: '/' } };
  const [loggedIn, setLoggedIn] = AuthContainter.useContainer();

  const [loginState, { post: postLogin }] = useFlexgetAPI('/auth/login');
  const [versionState, { get: getVersion }] = useFlexgetAPI('/server/version');

  const handleSubmit = async (req: LoginReq) => {
    const response = await postLogin(req);
    if (response?.ok) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await getVersion();
      if (response?.ok) {
        setLoggedIn(true);
      }
    };

    fetch();
  }, [getVersion, setLoggedIn]);

  if (loggedIn) {
    return <Redirect to={from} />;
  }

  if (versionState.loading) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Logo />
      <Card onSubmit={handleSubmit} errorStatus={loginState.error} />
    </div>
  );
};

export default LoginPage;