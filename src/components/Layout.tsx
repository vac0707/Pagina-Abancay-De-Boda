/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { PackageAdvisorModal } from './PackageAdvisorModal';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory text-text-main font-sans selection:bg-gold selection:text-white flex flex-col justify-between relative">
      {/* Global Navbar */}
      <Navbar />

      {/* Dynamic Route Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Shared Floating Actions */}
      <WhatsAppButton />
      <PackageAdvisorModal />
    </div>
  );
};
