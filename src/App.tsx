/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VideoProvider } from './context/VideoContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Layout } from './components/Layout';

// Pages
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

export default function App() {
  return (
    <BrowserRouter>
      <VideoProvider>
        <ScrollToTop />
        <Routes>
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
    </BrowserRouter>
  );
}
