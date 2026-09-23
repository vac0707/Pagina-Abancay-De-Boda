/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../../context/CmsContext';
import {
  Camera,
  BookOpen,
  Package,
  MessageSquareQuote,
  Inbox,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { portfolio, stories, packages, testimonials, inquiries } = useCms();

  const publishedPortfolio = portfolio.filter(p => (p as any).status !== 'hidden').length;
  const newInquiries = inquiries.filter(i => i.status === 'new');

  const stats = [
    { label: 'Trabajos en Portafolio', value: portfolio.length, sub: `${publishedPortfolio} publicados`, icon: Camera, path: '/admin/portafolio', color: 'text-amber-700 bg-amber-50' },
    { label: 'Historias Documentadas', value: stories.length, sub: 'Crónicas editoriales', icon: BookOpen, path: '/admin/historias', color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Paquetes de Inversión', value: packages.length, sub: 'Tarifarios activos', icon: Package, path: '/admin/paquetes', color: 'text-blue-700 bg-blue-50' },
    { label: 'Testimonios Aprobados', value: testimonials.length, sub: 'Citas de clientes', icon: MessageSquareQuote, path: '/admin/testimonios', color: 'text-purple-700 bg-purple-50' },
  ];

  return (
    <div className="space-y-8 text-left">
      
      {/* Welcome & Quick Action Bar */}
      <div className="bg-white p-6 md:p-8 rounded-xs border border-border-warm shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Studio CMS · Modo En Vivo
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Panel de Control del Estudio
          </h1>
          <p className="text-xs text-text-muted mt-1 font-light max-w-xl">
            Bienvenido al gestor de contenidos de Abancay De Boda. Todos los cambios que guardes aquí se reflejan de inmediato en la web pública.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/portafolio?action=new"
            className="px-3 py-2 bg-espresso hover:bg-espresso-light text-ivory text-xs font-medium rounded-xs transition-colors inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Plus size={14} className="text-gold" />
            <span>Nuevo Trabajo</span>
          </Link>
          <Link
            to="/admin/historias?action=new"
            className="px-3 py-2 bg-gold hover:bg-gold-light text-espresso text-xs font-semibold rounded-xs transition-colors inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Plus size={14} />
            <span>Nueva Historia</span>
          </Link>
          <Link
            to="/admin/multimedia"
            className="px-3 py-2 bg-ivory hover:bg-ivory-warm border border-border-warm text-espresso text-xs font-medium rounded-xs transition-colors inline-flex items-center gap-1.5"
          >
            <Camera size={14} className="text-gold-dark" />
            <span>Subir Fotos</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => (
          <Link
            key={idx}
            to={s.path}
            className="bg-white p-5 rounded-xs border border-border-warm hover:border-gold/50 transition-colors shadow-2xs group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`p-2.5 rounded-xs ${s.color}`}>
                <s.icon size={18} />
              </span>
              <ArrowUpRight size={15} className="text-text-dim group-hover:text-gold transition-colors" />
            </div>
            <div>
              <span className="font-bodoni text-3xl text-espresso block mb-0.5">
                {s.value}
              </span>
              <span className="text-xs font-medium text-espresso block">
                {s.label}
              </span>
              <span className="text-[11px] text-text-dim block mt-0.5">
                {s.sub}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Inquiries & Content Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Recent Inquiries List */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xs border border-border-warm shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-warm">
            <div className="flex items-center gap-2">
              <Inbox size={16} className="text-gold" />
              <h2 className="text-sm uppercase tracking-wider text-espresso font-semibold">
                Consultas de Clientes Recientes
              </h2>
            </div>
            <Link to="/admin/consultas" className="text-xs text-gold-dark font-medium hover:underline">
              Ver todas ({inquiries.length})
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="py-8 text-center text-text-muted text-xs font-light">
              No hay consultas registradas aún. Los envíos desde el formulario web aparecerán aquí automáticamente.
            </div>
          ) : (
            <div className="divide-y divide-border-warm/60">
              {inquiries.slice(0, 5).map((inq) => {
                const whatsappUrl = inq.phone
                  ? `https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hola ${inq.name}, te escribo de Abancay De Boda sobre tu consulta para ${inq.service}.`
                    )}`
                  : undefined;

                return (
                  <div key={inq.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-xs text-espresso truncate">
                          {inq.name}
                        </span>
                        <span className="px-1.5 py-0.2 bg-ivory-warm text-[10px] text-espresso border border-border-warm rounded-2xs font-medium">
                          {inq.service}
                        </span>
                        {inq.status === 'new' && (
                          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[9px] font-bold rounded-2xs">
                            NUEVA
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-text-muted truncate">
                        {inq.message || inq.location || 'Sin mensaje adicional'}
                      </p>
                      <span className="text-[10px] text-text-dim">
                        {new Date(inq.createdAt).toLocaleDateString('es-PE')}
                      </span>
                    </div>

                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs text-[11px] font-medium inline-flex items-center gap-1 flex-shrink-0 transition-colors"
                      >
                        <MessageCircle size={12} />
                        <span>Responder</span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Website Pages Status */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xs border border-border-warm shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-warm">
            <h2 className="text-sm uppercase tracking-wider text-espresso font-semibold">
              Páginas de la Web
            </h2>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 size={13} />
              13 Rutas Activas
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { name: 'Portada Editorial (Home)', path: '/admin/inicio', live: '/' },
              { name: 'Bodas & Matrimonios', path: '/admin/bodas', live: '/bodas' },
              { name: 'Quinceaños', path: '/admin/quinceanos', live: '/quinceanos' },
              { name: 'Cumpleaños', path: '/admin/cumpleanos', live: '/cumpleanos' },
              { name: '50 Años & Bodas de Oro', path: '/admin/50-anos', live: '/50-anos' },
              { name: 'Bautizos', path: '/admin/bautizos', live: '/bautizos' },
              { name: 'Anuarios Escolares', path: '/admin/anuarios', live: '/anuarios' },
              { name: 'Sesiones Fotográficas', path: '/admin/sesiones', live: '/sesiones' },
              { name: 'Eventos Sociales', path: '/admin/eventos', live: '/eventos' },
              { name: 'Nosotros', path: '/admin/nosotros', live: '/nosotros' },
              { name: 'Contacto', path: '/admin/contacto', live: '/contacto' },
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xs hover:bg-ivory/70 transition-colors">
                <Link to={p.path} className="font-medium text-espresso hover:text-gold transition-colors">
                  {p.name}
                </Link>
                <div className="flex items-center gap-2">
                  <Link to={p.path} className="text-[11px] text-gold-dark hover:underline">
                    Editar
                  </Link>
                  <a href={p.live} target="_blank" rel="noreferrer" className="text-text-dim hover:text-espresso" title="Ver en vivo">
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
