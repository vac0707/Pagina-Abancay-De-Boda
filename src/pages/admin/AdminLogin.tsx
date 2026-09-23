/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studio';

export const AdminLogin: React.FC = () => {
  const { user, isAdmin, signInWithGoogle, signInWithEmail, sendResetEmail } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already logged in as admin, redirect to dashboard
  React.useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Por favor ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      await signInWithEmail(email, password);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setErrorMsg('Credenciales incorrectas. Verifica tu correo y contraseña.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMsg('El método de correo y contraseña aún no está activado en Firebase. Usa el botón "Iniciar con Google" para acceso inmediato.');
      } else {
        setErrorMsg('Error al iniciar sesión. Prueba con tu cuenta de Google autorizada.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Error al conectar con Google. Verifica que la ventana emergente no esté bloqueada.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setErrorMsg('Ingresa tu correo electrónico arriba para enviarte el enlace de restablecimiento.');
      return;
    }
    try {
      await sendResetEmail(email);
      setResetSent(true);
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg('No se pudo enviar el correo de recuperación. Verifica la dirección ingresada.');
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center items-center py-12 px-6">
      <div className="w-full max-w-md bg-white border border-border-warm rounded-sm shadow-xl p-8 md:p-10 text-left">
        
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border border-gold/40 shadow-sm">
            <img src={STUDIO_INFO.logo} alt="Abancay De Boda" className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-bold block mb-1">
            Panel de Control
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Abancay De Boda
          </h1>
          <p className="text-xs text-text-muted mt-1 font-light">
            Administración visual de contenidos y catálogo
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
            {errorMsg}
          </div>
        )}

        {/* Reset password success */}
        {resetSent && (
          <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
            <span>Enlace de recuperación enviado a tu correo. Revisa tu bandeja de entrada.</span>
          </div>
        )}

        {/* Google Quick Login Button (Recommended) */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
          className="w-full py-3 px-4 mb-6 bg-espresso hover:bg-espresso-light text-ivory text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-3 shadow-sm cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.6 7.2C.6 9.2 0 11.5 0 14s.6 4.8 1.6 6.8l3.7-2.9c0-.4-.1-.8-.1-1.2z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 6.4 10.4 6.4z"
            />
          </svg>
          <span>Acceso Directo con Google</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border-warm" />
          <span className="text-[10px] text-text-dim uppercase tracking-widest">O con credenciales</span>
          <div className="flex-1 h-px bg-border-warm" />
        </div>

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@abancaydeboda.pe"
                className="w-full pl-10 pr-4 py-2.5 bg-ivory/50 border border-border-warm rounded-xs text-sm text-espresso focus:outline-none focus:border-gold transition-colors"
                required
              />
              <Mail size={16} className="absolute left-3.5 top-3 text-text-dim" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs uppercase tracking-wider text-text-muted font-medium">
                Contraseña
              </label>
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-[11px] text-gold-dark hover:underline cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-ivory/50 border border-border-warm rounded-xs text-sm text-espresso focus:outline-none focus:border-gold transition-colors"
                required
              />
              <Lock size={16} className="absolute left-3.5 top-3 text-text-dim" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-text-dim hover:text-espresso"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
          >
            <span>{loading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-warm text-center flex items-center justify-between text-xs text-text-muted">
          <Link to="/" className="hover:text-gold transition-colors">
            ← Volver a la web
          </Link>
          <span className="flex items-center gap-1 text-[11px] text-text-dim">
            <ShieldCheck size={13} className="text-gold" />
            Área protegida
          </span>
        </div>

      </div>
    </div>
  );
};
