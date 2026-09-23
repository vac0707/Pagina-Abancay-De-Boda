/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, MASTER_CREDENTIALS } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, KeyRound, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studio';

export const AdminLogin: React.FC = () => {
  const { user, isAdmin, signInWithEmail, sendResetEmail } = useAuth();
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

  const handleFillMasterCredentials = () => {
    setEmail(MASTER_CREDENTIALS.email);
    setPassword(MASTER_CREDENTIALS.password);
    setErrorMsg(null);
  };

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
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setErrorMsg('Credenciales incorrectas. Verifica tu correo y contraseña.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMsg('El método de correo y contraseña aún no está activado en Firebase. Usa las credenciales del estudio o el botón de Google.');
      } else {
        setErrorMsg('Error al iniciar sesión. Verifica tus datos o usa el acceso con Google.');
      }
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
        <div className="text-center mb-6">
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

        {/* Master Credentials Highlight Card */}
        <div className="mb-6 p-4 bg-ivory rounded-xs border border-gold/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-bold text-gold-dark flex items-center gap-1.5">
              <KeyRound size={13} className="text-gold" />
              Credenciales de Acceso al Estudio
            </span>
            <button
              type="button"
              onClick={handleFillMasterCredentials}
              className="text-[10px] text-espresso bg-gold hover:bg-gold-light font-semibold uppercase px-2 py-0.5 rounded-2xs transition-colors cursor-pointer"
            >
              Auto-rellenar
            </button>
          </div>
          <div className="text-[11px] text-espresso space-y-1 font-mono pt-1">
            <div>
              <span className="text-text-muted font-sans mr-1">Usuario:</span>
              <strong className="text-espresso">{MASTER_CREDENTIALS.email}</strong>
            </div>
            <div>
              <span className="text-text-muted font-sans mr-1">Clave:</span>
              <strong className="text-espresso">{MASTER_CREDENTIALS.password}</strong>
            </div>
          </div>
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
                placeholder="abancaydeboda@studio.com"
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
