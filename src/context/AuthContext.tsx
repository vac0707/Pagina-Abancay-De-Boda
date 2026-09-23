/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

const STUDIO_ADMIN_EMAILS = [
  'vacstudio7@gmail.com',
  'abancaydeboda@studio.com',
  'admin@abancaydeboda.pe'
];

export const MASTER_CREDENTIALS = {
  email: 'abancaydeboda@studio.com',
  password: 'Abancay2026!'
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
  signInWithGoogle: () => Promise<void>;
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
    // Check local studio session first
    const storedSession = localStorage.getItem('studio_admin_session');
    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession);
        if (parsed && parsed.email) {
          setUser(parsed);
          setIsAdmin(true);
        }
      } catch {
        localStorage.removeItem('studio_admin_session');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Studio admin emails check
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
        // If no firebase user, check if we had a persistent studio session
        const localSession = localStorage.getItem('studio_admin_session');
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

  const signInWithGoogle = async () => {
    localStorage.removeItem('studio_admin_session');
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithEmail = async (emailInput: string, passInput: string) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passInput.trim();

    // Check if it matches the Master Studio Credentials
    const isMasterStudio =
      (cleanEmail === MASTER_CREDENTIALS.email.toLowerCase() || cleanEmail === 'admin@abancaydeboda.pe') &&
      (cleanPass === MASTER_CREDENTIALS.password || cleanPass === 'abancay2026' || cleanPass === 'Abancay2026');

    // 1. Try Firebase Auth (sign in or auto create)
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      localStorage.removeItem('studio_admin_session');
      return;
    } catch (err: any) {
      // If user doesn't exist yet, attempt to create it in Firebase Auth
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
          localStorage.removeItem('studio_admin_session');
          return;
        } catch (createErr: any) {
          // If creation fails due to operation-not-allowed but master studio credentials were provided:
          if (isMasterStudio) {
            const studioUser: StudioUser = {
              email: cleanEmail,
              uid: 'abancay-studio-master-admin',
              displayName: 'Administrador Abancay De Boda'
            };
            localStorage.setItem('studio_admin_session', JSON.stringify(studioUser));
            setUser(studioUser);
            setIsAdmin(true);
            return;
          }
          throw createErr;
        }
      }

      // If operation is not allowed or invalid credential, but matches master credentials
      if (isMasterStudio) {
        const studioUser: StudioUser = {
          email: cleanEmail,
          uid: 'abancay-studio-master-admin',
          displayName: 'Administrador Abancay De Boda'
        };
        localStorage.setItem('studio_admin_session', JSON.stringify(studioUser));
        setUser(studioUser);
        setIsAdmin(true);
        return;
      }

      throw err;
    }
  };

  const sendResetEmail = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    localStorage.removeItem('studio_admin_session');
    setUser(null);
    setIsAdmin(false);
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Firebase signout fallback:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        signInWithGoogle,
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
