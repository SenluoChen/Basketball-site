import { cloneElement, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../components/authentication/account';

interface Props {
  children: ReactElement;
}

function querystring(name: string, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, 'i');
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function UnauthenticatedRoute(props: Props) {
  const { isAuthenticated } = useAppContext();
  const { children } = props;
  const redirect = querystring('redirect');

  if (isAuthenticated) {
    return <Navigate to={redirect || '/root/dashboard'} />;
  }

  return cloneElement(children, props);
}
