import { observer } from 'mobx-react-lite'
import React from 'react'
import ProtectedRoute from './ProtectedRoute';
import authService from '@/services/AuthService';
import { Navigate } from 'react-router';

const AdminProtector = observer(({ children }) => {
    return (
        <ProtectedRoute>
            {authService.user.role == "ADMIN" ? children : <Navigate to={"/"} />}
        </ProtectedRoute>
    )
});

export default AdminProtector
