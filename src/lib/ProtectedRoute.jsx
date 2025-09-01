// src/routes/ProtectedRoute.jsx
import authService from '@/services/AuthService';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router';

const ProtectedRoute = observer(({ children }) => {
  return authService.isLoggedIn ? children : <Navigate to="/login" replace />;
});

export default ProtectedRoute;
