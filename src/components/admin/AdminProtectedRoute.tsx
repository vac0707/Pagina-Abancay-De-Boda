/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6 text-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-text-muted">Cargando panel de administración...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
