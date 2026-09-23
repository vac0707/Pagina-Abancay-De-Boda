/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { VideoProvider } from './context/VideoContext';
import { AuthProvider } from './context/AuthContext';
import { CmsProvider } from './context/CmsContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Layout } from './components/Layout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { WeddingsPage } from './pages/WeddingsPage';
import { QuinceanosPage } from './pages/QuinceanosPage';
import { CumpleanosPage } from './pages/CumpleanosPage';
import { FiftyYearsPage } from './pages/FiftyYearsPage';
import { BautizosPage } from './pages/BautizosPage';
import { AnuariosPage } from './pages/AnuariosPage';
import { SesionesPage } from './pages/SesionesPage';
import { EventosPage } from './pages/EventosPage';
import { PortafolioPage } from './pages/PortafolioPage';
import { ServiciosPage } from './pages/ServiciosPage';
import { NosotrosPage } from './pages/NosotrosPage';
import { ContactoPage } from './pages/ContactoPage';
import { HistoriasIndexPage } from './pages/HistoriasIndexPage';
import { HistoriaDetailPage } from './pages/HistoriaDetailPage';

// Admin CMS Components & Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPageEditor } from './pages/admin/AdminPageEditor';
import { AdminPortfolio } from './pages/admin/AdminPortfolio';
import { AdminStories } from './pages/admin/AdminStories';
import { AdminPackages } from './pages/admin/AdminPackages';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminFaq } from './pages/admin/AdminFaq';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminSeo } from './pages/admin/AdminSeo';
import { AdminSettings } from './pages/admin/AdminSettings';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CmsProvider>
          <VideoProvider>
            <ScrollToTop />
            <Routes>
              
              {/* Admin Authentication Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin CMS Panel */}
              <Route path="/admin" element={<AdminProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  
                  {/* Pages Editors */}
                  <Route path="inicio" element={<AdminPageEditor />} />
                  <Route path="bodas" element={<AdminPageEditor />} />
                  <Route path="quinceanos" element={<AdminPageEditor />} />
                  <Route path="cumpleanos" element={<AdminPageEditor />} />
                  <Route path="50-anos" element={<AdminPageEditor />} />
                  <Route path="bautizos" element={<AdminPageEditor />} />
                  <Route path="anuarios" element={<AdminPageEditor />} />
                  <Route path="sesiones" element={<AdminPageEditor />} />
                  <Route path="eventos" element={<AdminPageEditor />} />
                  <Route path="nosotros" element={<AdminPageEditor />} />
                  <Route path="contacto" element={<AdminPageEditor />} />

                  {/* Catalog & Content Management */}
                  <Route path="portafolio" element={<AdminPortfolio />} />
                  <Route path="historias" element={<AdminStories />} />
                  <Route path="paquetes" element={<AdminPackages />} />
                  <Route path="testimonios" element={<AdminTestimonials />} />
                  <Route path="faq" element={<AdminFaq />} />
                  <Route path="multimedia" element={<AdminMedia />} />

                  {/* Management & System */}
                  <Route path="consultas" element={<AdminInquiries />} />
                  <Route path="seo" element={<AdminSeo />} />
                  <Route path="configuracion" element={<AdminSettings />} />

                  {/* Fallback within admin */}
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Route>
              </Route>

              {/* Public Website Routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/bodas" element={<WeddingsPage />} />
                <Route path="/quinceanos" element={<QuinceanosPage />} />
                <Route path="/cumpleanos" element={<CumpleanosPage />} />
                <Route path="/50-anos" element={<FiftyYearsPage />} />
                <Route path="/bautizos" element={<BautizosPage />} />
                <Route path="/anuarios" element={<AnuariosPage />} />
                <Route path="/sesiones" element={<SesionesPage />} />
                <Route path="/eventos" element={<EventosPage />} />
                <Route path="/portafolio" element={<PortafolioPage />} />
                <Route path="/servicios" element={<ServiciosPage />} />
                <Route path="/nosotros" element={<NosotrosPage />} />
                <Route path="/contacto" element={<ContactoPage />} />
                <Route path="/historias" element={<HistoriasIndexPage />} />
                <Route path="/historias/:slug" element={<HistoriaDetailPage />} />

                {/* Fallback to Home */}
                <Route path="*" element={<HomePage />} />
              </Route>

            </Routes>
          </VideoProvider>
        </CmsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
