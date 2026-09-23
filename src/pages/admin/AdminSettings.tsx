/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Settings,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  Share2,
  Sliders
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useCms();

  const [name, setName] = useState(settings.name);
  const [tagline, setTagline] = useState(settings.tagline);
  const [founder, setFounder] = useState(settings.founder);
  const [logo, setLogo] = useState(settings.logo);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [whatsappMessage, setWhatsappMessage] = useState(settings.whatsappDefaultMessage);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [city, setCity] = useState(settings.city);
  const [region, setRegion] = useState(settings.region);

  // Socials
  const [instagram, setInstagram] = useState(settings.socials.instagram);
  const [facebook, setFacebook] = useState(settings.socials.facebook);
  const [tiktok, setTiktok] = useState(settings.socials.tiktok);

  // Floating button toggle
  const [showFloatingWhatsapp, setShowFloatingWhatsapp] = useState(
    (settings as any).showFloatingWhatsapp !== false
  );

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings({
        name: name.trim(),
        tagline: tagline.trim(),
        founder: founder.trim(),
        logo: logo.trim(),
        whatsapp: whatsapp.trim(),
        whatsappDefaultMessage: whatsappMessage.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        city: city.trim(),
        region: region.trim(),
        socials: {
          instagram: instagram.trim(),
          facebook: facebook.trim(),
          tiktok: tiktok.trim(),
        },
        ...({ showFloatingWhatsapp } as any),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Error al guardar la configuración.');
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
            Parámetros Globales
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Configuración del Estudio
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Información de contacto, redes sociales, logotipo y canales oficiales de atención.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* Identity block */}
        <div className="bg-white p-6 rounded-xs border border-border-warm shadow-2xs space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-espresso">
            Identidad del Estudio
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                Nombre de Marca
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso font-medium focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                Fundador / Fotógrafo Principal
              </label>
              <input
                type="text"
                value={founder}
                onChange={(e) => setFounder(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso font-medium focus:outline-none focus:border-gold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
              Eslogan o Subtítulo Institucional
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
              URL del Logotipo
            </label>
            <div className="flex items-center gap-3">
              <input
                type="url"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
              />
              <div className="w-10 h-10 rounded-full border border-gold overflow-hidden bg-espresso flex-shrink-0">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact info block */}
        <div className="bg-white p-6 rounded-xs border border-border-warm shadow-2xs space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-espresso">
            Contacto & Canales Directos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                Número de WhatsApp (con código de país ej: 51983726487)
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                Teléfono de Llamadas
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
              Correo Electrónico Oficial
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
              required
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
              Mensaje Predeterminado de WhatsApp
            </label>
            <textarea
              rows={2}
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold font-light"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                Dirección
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                Ciudad
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                Región / Departamento
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Socials block */}
        <div className="bg-white p-6 rounded-xs border border-border-warm shadow-2xs space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-espresso">
            Redes Sociales Oficiales
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                TikTok URL
              </label>
              <input
                type="url"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="https://tiktok.com/@..."
                className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Switch */}
        <div className="bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-espresso block">
                Botón Flotante de WhatsApp
              </span>
              <p className="text-xs text-text-muted font-light mt-0.5">
                Muestra un botón verde flotante en la esquina inferior de toda la web pública para contacto rápido.
              </p>
            </div>
            <input
              type="checkbox"
              checked={showFloatingWhatsapp}
              onChange={(e) => setShowFloatingWhatsapp(e.target.checked)}
              className="w-5 h-5 text-gold rounded-xs border-border-warm focus:ring-gold"
            />
          </label>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
              <CheckCircle2 size={15} />
              Configuración guardada en tiempo real
            </span>
          ) : <span />}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Save size={14} />
            <span>{saving ? 'GUARDANDO...' : 'GUARDAR CONFIGURACIÓN'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
