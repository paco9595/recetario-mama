import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router';

const AuthLayout = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Cargando...</div>;

  if (!isSignedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default AuthLayout;