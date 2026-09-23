/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCms } from '../../context/CmsContext';
import {
  LayoutDashboard,
  FileText,
  Camera,
  BookOpen,
  Package,
  MessageSquareQuote,
  HelpCircle,
  Image,
  Inbox,
  Search,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { STUDIO_INFO } from '../../data/studio';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { inquiries, settings } = useCms();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pagesMenuOpen, setPagesMenuOpen] = useState(true);

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  ];

  const pageLinks = [
    { label: 'Inicio', path: '/admin/inicio' },
    { label: 'Bodas', path: '/admin/bodas' },
    { label: 'Quinceaños', path: '/admin/quinceanos' },
    { label: 'Cumpleaños', path: '/admin/cumpleanos' },
    { label: '50 Años', path: '/admin/50-anos' },
    { label: 'Bautizos', path: '/admin/bautizos' },
    { label: 'Anuarios', path: '/admin/anuarios' },
    { label: 'Sesiones', path: '/admin/sesiones' },
    { label: 'Eventos', path: '/admin/eventos' },
    { label: 'Nosotros', path: '/admin/nosotros' },
    { label: 'Contacto', path: '/admin/contacto' },
  ];

  const catalogItems = [
    { label: 'Portafolio', path: '/admin/portafolio', icon: Camera },
    { label: 'Historias', path: '/admin/historias', icon: BookOpen },
    { label: 'Paquetes', path: '/admin/paquetes', icon: Package },
    { label: 'Testimonios', path: '/admin/testimonios', icon: MessageSquareQuote },
    { label: 'Preguntas Frecuentes', path: '/admin/faq', icon: HelpCircle },
    { label: 'Biblioteca Multimedia', path: '/admin/multimedia', icon: Image },
  ];

  const adminSystemItems = [
    { label: 'Consultas Recibidas', path: '/admin/consultas', icon: Inbox, badge: pendingInquiriesCount },
    { label: 'SEO & Metadatos', path: '/admin/seo', icon: Search },
    { label: 'Configuración General', path: '/admin/configuracion', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-espresso flex flex-col md:flex-row antialiased font-sans">
      
      {/* Mobile Topbar */}
      <div className="md:hidden bg-espresso text-ivory px-5 py-3.5 flex items-center justify-between shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-2.5">
          <img src={settings.logo || STUDIO_INFO.logo} alt="Logo" className="w-7 h-7 rounded-full object-cover border border-gold" />
          <span className="font-bodoni text-base tracking-wide text-ivory">Panel Abancay De Boda</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-ivory hover:text-gold"
          aria-label="Abrir menú"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-espresso/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-espresso text-[#D1CCC5] flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gold flex-shrink-0">
              <img src={settings.logo || STUDIO_INFO.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold block">
                Studio CMS
              </span>
              <h2 className="font-bodoni text-lg text-ivory font-normal leading-tight">
                Abancay De Boda
              </h2>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-ivory/70 hover:text-ivory"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 text-xs">
          
          {/* Main Section */}
          <div className="space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xs transition-colors font-medium ${
                    isActive
                      ? 'bg-gold text-espresso font-semibold shadow-xs'
                      : 'text-[#C5BFB6] hover:bg-white/5 hover:text-ivory'
                  }`
                }
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Pages Section */}
          <div>
            <button
              onClick={() => setPagesMenuOpen(!pagesMenuOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-light/70 font-semibold hover:text-gold cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText size={13} />
                <span>Páginas de la Web</span>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-200 ${pagesMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {pagesMenuOpen && (
              <div className="mt-1 ml-2 pl-3 border-l border-white/10 space-y-0.5">
                {pageLinks.map(page => {
                  const isActive = location.pathname === page.path;
                  return (
                    <Link
                      key={page.path}
                      to={page.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-2.5 py-1.5 rounded-xs text-[11px] transition-colors ${
                        isActive
                          ? 'text-gold font-semibold bg-white/5'
                          : 'text-[#A9A39A] hover:text-ivory hover:bg-white/5'
                      }`}
                    >
                      {page.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Catalog & Content Section */}
          <div>
            <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold-light/70 font-semibold block mb-1">
              Catálogo & Medios
            </span>
            <div className="space-y-1">
              {catalogItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xs transition-colors ${
                      isActive
                        ? 'bg-gold text-espresso font-semibold'
                        : 'text-[#C5BFB6] hover:bg-white/5 hover:text-ivory'
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Management & Inquiries Section */}
          <div>
            <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold-light/70 font-semibold block mb-1">
              Gestión & Sistema
            </span>
            <div className="space-y-1">
              {adminSystemItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xs transition-colors ${
                      isActive
                        ? 'bg-gold text-espresso font-semibold'
                        : 'text-[#C5BFB6] hover:bg-white/5 hover:text-ivory'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500 text-espresso rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-2 text-xs">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xs bg-white/5 hover:bg-white/10 text-[#C5BFB6] hover:text-ivory transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} className="text-gold" />
              <span>Ver Página Web</span>
            </span>
            <ChevronRight size={13} className="text-text-dim" />
          </a>

          <div className="pt-2 flex items-center justify-between px-3">
            <div className="truncate max-w-[170px]">
              <span className="block text-[10px] text-text-dim uppercase tracking-wider">Sesión activa</span>
              <span className="text-[11px] text-ivory truncate block font-mono">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              className="p-1.5 text-[#C5BFB6] hover:text-red-400 hover:bg-white/5 rounded-xs transition-colors cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-border-warm px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="text-text-dim">Panel</span>
            <span>/</span>
            <span className="font-semibold text-espresso capitalize">
              {location.pathname.replace('/admin', '').replace('/', '') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-espresso bg-ivory hover:bg-ivory-warm border border-border-warm rounded-xs transition-colors font-medium"
            >
              <ExternalLink size={13} className="text-gold" />
              <span>Ver Web en vivo</span>
            </a>

            {pendingInquiriesCount > 0 && (
              <Link
                to="/admin/consultas"
                className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-xs text-[11px] font-medium flex items-center gap-1.5 hover:bg-amber-200 transition-colors"
              >
                <Sparkles size={13} className="text-amber-700" />
                <span>{pendingInquiriesCount} consulta(s) nueva(s)</span>
              </Link>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
