/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Search,
  Save,
  CheckCircle2,
  Share2,
  ExternalLink,
  Globe
} from 'lucide-react';

export const AdminSeo: React.FC = () => {
  const { settings, updateSettings } = useCms();

  const [siteTitle, setSiteTitle] = useState(
    (settings as any).seoTitle || 'ABANCAY DE BODA | Estudio Fotográfico y Cinematografía en Apurímac'
  );
  const [siteDescription, setSiteDescription] = useState(
    (settings as any).seoDescription || 'Estudio fotográfico y cinematografía de bodas, quinceaños, promociones y celebraciones en Abancay y los Andes de Apurímac.'
  );
  const [keywords, setKeywords] = useState(
    (settings as any).seoKeywords || 'fotografo abancay, bodas abancay, quinceanos abancay, film documental apurimac, anuarios abancay'
  );
  const [ogImage, setOgImage] = useState(
    (settings as any).ogImage || 'https://res.cloudinary.com/dcnynnstm/image/upload/v1777088528/DSC04178_wuvhvd.jpg'
  );

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings({
        ...({
          seoTitle: siteTitle.trim(),
          seoDescription: siteDescription.trim(),
          seoKeywords: keywords.trim(),
          ogImage: ogImage.trim(),
        } as any),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Error al guardar la configuración SEO.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Visibilidad & Indexación
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            SEO & Metadatos Globales
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Optimiza la presencia del estudio en Google y cómo se comparte el enlace en WhatsApp, Facebook e Instagram.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Main SEO card */}
        <div className="bg-white p-6 rounded-xs border border-border-warm shadow-2xs space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-espresso">
            Metadatos Principales del Sitio
          </h2>

          <div>
            <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
              Título Global del Sitio (Title Tag)
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso font-medium focus:outline-none focus:border-gold"
              required
            />
            <span className="text-[11px] text-text-dim mt-1 block">
              Recomendado: entre 50 y 65 caracteres.
            </span>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
              Meta Descripción Global
            </label>
            <textarea
              rows={3}
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold font-light"
              required
            />
            <span className="text-[11px] text-text-dim mt-1 block">
              Recomendado: entre 120 y 160 caracteres.
            </span>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
              Palabras Clave (Separadas por comas)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
              Imagen Social OpenGraph (Al compartir en WhatsApp/Redes)
            </label>
            <input
              type="url"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Live Social Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Google Preview */}
          <div className="bg-white p-5 rounded-xs border border-border-warm shadow-2xs space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-text-dim font-bold block">
              Vista previa en Google
            </span>
            <div className="p-3.5 bg-ivory rounded-xs border border-border-warm space-y-1">
              <span className="text-emerald-800 text-[11px] block truncate">
                https://abancaydeboda.pe
              </span>
              <span className="text-blue-800 font-medium text-sm line-clamp-1">
                {siteTitle}
              </span>
              <p className="text-text-muted text-[11px] line-clamp-2">
                {siteDescription}
              </p>
            </div>
          </div>

          {/* Social Card Preview */}
          <div className="bg-white p-5 rounded-xs border border-border-warm shadow-2xs space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-text-dim font-bold block">
              Vista previa en WhatsApp / Redes
            </span>
            <div className="rounded-xs border border-border-warm overflow-hidden bg-ivory">
              {ogImage && (
                <div className="aspect-[1.91/1] bg-espresso overflow-hidden">
                  <img src={ogImage} alt="Social Card" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-3 space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-text-dim block">
                  abancaydeboda.pe
                </span>
                <span className="font-semibold text-xs text-espresso block line-clamp-1">
                  {siteTitle}
                </span>
                <p className="text-[11px] text-text-muted line-clamp-2">
                  {siteDescription}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
              <CheckCircle2 size={15} />
              Configuración SEO guardada correctamente
            </span>
          ) : <span />}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Save size={14} />
            <span>{saving ? 'GUARDANDO...' : 'GUARDAR CONFIGURACIÓN SEO'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
