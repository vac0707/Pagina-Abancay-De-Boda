/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const STUDIO_ADMIN_EMAILS = [
  'abancaydeboda@studio.com'
];

export const MASTER_CREDENTIALS = {
  email: 'abancaydeboda@studio.com',
  password: 'Abancay2026'
};

interface StudioUser {
  email: string | null;
  uid: string;
  displayName: string | null;
}

interface AuthContextType {
  user: User | StudioUser | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | StudioUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check stored master studio session
    const storedSession = localStorage.getItem('abancay_studio_admin_session');
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        if (parsed && parsed.email) {
          setUser(parsed);
          setIsAdmin(true);
          setLoading(false);
          return;
        }
      } catch {
        localStorage.removeItem('abancay_studio_admin_session');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.email && STUDIO_ADMIN_EMAILS.includes(currentUser.email.toLowerCase())) {
          setIsAdmin(true);
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
            setIsAdmin(adminDoc.exists());
          } catch {
            setIsAdmin(false);
          }
        }
      } else {
        const localSession = localStorage.getItem('abancay_studio_admin_session');
        if (localSession) {
          try {
            const parsed = JSON.parse(localSession);
            setUser(parsed);
            setIsAdmin(true);
          } catch {
            setUser(null);
            setIsAdmin(false);
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (emailInput: string, passInput: string) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passInput.trim();

    // Check Master Credentials
    const isMaster =
      cleanEmail === MASTER_CREDENTIALS.email.toLowerCase() &&
      cleanPass === MASTER_CREDENTIALS.password;

    if (isMaster) {
      const studioUser: StudioUser = {
        email: cleanEmail,
        uid: 'abancay-studio-master-admin-uid',
        displayName: 'Administrador Abancay De Boda'
      };
      localStorage.setItem('abancay_studio_admin_session', JSON.stringify(studioUser));
      setUser(studioUser);
      setIsAdmin(true);
      return;
    }

    throw new Error('Credenciales incorrectas. Verifica tu correo y contraseña.');
  };

  const sendResetEmail = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    localStorage.removeItem('abancay_studio_admin_session');
    setUser(null);
    setIsAdmin(false);
    try {
      await firebaseSignOut(auth);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        signInWithEmail,
        sendResetEmail,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
