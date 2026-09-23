/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCms } from '../../context/CmsContext';
import {
  Save,
  ExternalLink,
  CheckCircle2,
  ChevronDown,
  Eye,
  Sliders,
  Image as ImageIcon,
  Film,
  Search,
  Check
} from 'lucide-react';

interface PageMeta {
  title: string;
  liveUrl: string;
  defaultHeroTitle: string;
  defaultHeroSubtitle: string;
  defaultHeroImage: string;
}

const PAGES_CONFIG: Record<string, PageMeta> = {
  inicio: {
    title: 'Página de Inicio',
    liveUrl: '/',
    defaultHeroTitle: 'Historias que merecen permanecer.',
    defaultHeroSubtitle: 'Fotografía y cinematografía para recuerdos que solo ocurren una vez.',
    defaultHeroImage: 'https://res.cloudinary.com/dcnynnstm/image/upload/v1777088528/DSC04178_wuvhvd.jpg',
  },
  bodas: {
    title: 'Bodas & Matrimonios',
    liveUrl: '/bodas',
    defaultHeroTitle: 'El registro cinematográfico de su día más sagrado.',
    defaultHeroSubtitle: 'Fotografía y film documental en Abancay y los Andes de Apurímac.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  },
  quinceanos: {
    title: 'Quinceaños (15 Años)',
    liveUrl: '/quinceanos',
    defaultHeroTitle: 'Una etapa que solo ocurre una vez.',
    defaultHeroSubtitle: 'Fotografía editorial, sofisticada y moderna para tu fiesta y sesión soñada.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
  },
  cumpleanos: {
    title: 'Cumpleaños',
    liveUrl: '/cumpleanos',
    defaultHeroTitle: 'Celebrar la vida con estilo y emoción.',
    defaultHeroSubtitle: 'Cobertura contemporánea de fiestas juveniles, adultas y familiares.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop',
  },
  '50-anos': {
    title: '50 Años & Bodas de Oro',
    liveUrl: '/50-anos',
    defaultHeroTitle: 'Medio siglo de vida, legado y memoria.',
    defaultHeroSubtitle: 'Homenajes solemnes, reuniones multigeneracionales y libros de archivo.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2032&auto=format&fit=crop',
  },
  bautizos: {
    title: 'Bautizos',
    liveUrl: '/bautizos',
    defaultHeroTitle: 'La bendición que inicia su historia.',
    defaultHeroSubtitle: 'Fotografía luminosa, delicada y respetuosa del sacramento y la familia.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=2070&auto=format&fit=crop',
  },
  anuarios: {
    title: 'Anuarios & Promociones',
    liveUrl: '/anuarios',
    defaultHeroTitle: 'Tu promoción merece quedarse para siempre.',
    defaultHeroSubtitle: 'Retratos individuales de estudio, fotos de grupo y encuadernación editorial de lujo.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
  },
  sesiones: {
    title: 'Sesiones Fotográficas',
    liveUrl: '/sesiones',
    defaultHeroTitle: 'Retratos que capturan tu verdadera esencia.',
    defaultHeroSubtitle: 'Sesiones de pareja, maternidad, retrato personal y familia.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop',
  },
  eventos: {
    title: 'Eventos Sociales',
    liveUrl: '/eventos',
    defaultHeroTitle: 'El registro de los grandes momentos.',
    defaultHeroSubtitle: 'Cobertura protocolar para galas, aniversarios e instituciones.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop',
  },
  nosotros: {
    title: 'Nosotros',
    liveUrl: '/nosotros',
    defaultHeroTitle: 'Mirada, sensibilidad y memoria en Abancay.',
    defaultHeroSubtitle: 'Conoce la visión artística y el equipo detrás de Abancay De Boda.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=2032&auto=format&fit=crop',
  },
  contacto: {
    title: 'Contacto',
    liveUrl: '/contacto',
    defaultHeroTitle: 'Conversemos sobre su fecha.',
    defaultHeroSubtitle: 'Estamos disponibles para registrar sus momentos más especiales.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  },
};

export const AdminPageEditor: React.FC = () => {
  const location = useLocation();
  const { pagesContent, updatePageContent } = useCms();

  // Determine current page key from URL e.g. /admin/bodas -> bodas
  const pathParts = location.pathname.split('/');
  const pageKey = pathParts[pathParts.length - 1] || 'inicio';
  const pageConfig = PAGES_CONFIG[pageKey] || PAGES_CONFIG.inicio;

  const currentContent = pagesContent[pageKey] || {};

  // Form states
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [focalPoint, setFocalPoint] = useState<'center' | 'top' | 'bottom' | 'left' | 'right'>('center');
  const [heroButtonText, setHeroButtonText] = useState('RESERVAR FECHA');
  
  // Section visibility toggles
  const [showVideo, setShowVideo] = useState(true);
  const [showPackages, setShowPackages] = useState(true);
  const [showTestimonials, setShowTestimonials] = useState(true);
  const [showFaq, setShowFaq] = useState(true);

  // Video info
  const [videoId, setVideoId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  // SEO
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  // Accordion toggle states
  const [openSections, setOpenSections] = useState({
    hero: true,
    visibility: true,
    video: false,
    seo: false,
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync state when page changes or content loads
  useEffect(() => {
    const data = pagesContent[pageKey] || {};
    setHeroTitle(data.heroTitle ?? pageConfig.defaultHeroTitle);
    setHeroSubtitle(data.heroSubtitle ?? pageConfig.defaultHeroSubtitle);
    setHeroImage(data.heroImage ?? pageConfig.defaultHeroImage);
    setFocalPoint(data.focalPoint ?? 'center');
    setHeroButtonText(data.heroButtonText ?? 'RESERVAR FECHA');

    setShowVideo(data.showVideo !== false);
    setShowPackages(data.showPackages !== false);
    setShowTestimonials(data.showTestimonials !== false);
    setShowFaq(data.showFaq !== false);

    setVideoId(data.videoId ?? '');
    setVideoTitle(data.videoTitle ?? '');

    setSeoTitle(data.seoTitle ?? `${pageConfig.title} | Abancay De Boda`);
    setSeoDescription(data.seoDescription ?? pageConfig.defaultHeroSubtitle);

    setHasUnsavedChanges(false);
    setSavedSuccess(false);
  }, [pageKey, pagesContent]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFieldChange = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
    setter(value);
    setHasUnsavedChanges(true);
    setSavedSuccess(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePageContent(pageKey, {
        heroTitle,
        heroSubtitle,
        heroImage,
        focalPoint,
        heroButtonText,
        showVideo,
        showPackages,
        showTestimonials,
        showFaq,
        videoId,
        videoTitle,
        seoTitle,
        seoDescription,
        status: 'published',
      });
      setHasUnsavedChanges(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Hubo un error al guardar los cambios. Inténtalo nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 text-left max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Editor de Contenido
          </span>
          <h1 className="font-bodoni text-2xl md:text-3xl text-espresso font-normal">
            {pageConfig.title}
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Personaliza los textos, imagen principal y bloques visibles de esta página.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={pageConfig.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 bg-ivory hover:bg-ivory-warm border border-border-warm text-espresso text-xs font-medium rounded-xs transition-colors inline-flex items-center gap-1.5"
          >
            <ExternalLink size={13} className="text-gold" />
            <span>Ver Página en Vivo</span>
          </a>
        </div>
      </div>

      {/* Accordion Block 1: Portada / Hero */}
      <div className="bg-white rounded-xs border border-border-warm shadow-2xs overflow-hidden">
        <button
          onClick={() => toggleSection('hero')}
          className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-ivory/50 transition-colors border-b border-border-warm text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-50 text-amber-800 rounded-xs">
              <ImageIcon size={16} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-espresso">Portada Principal (Hero)</h2>
              <p className="text-[11px] text-text-muted">Título, subtítulo, fotografía de fondo y punto focal</p>
            </div>
          </div>
          <ChevronDown size={18} className={`text-text-dim transition-transform ${openSections.hero ? 'rotate-180' : ''}`} />
        </button>

        {openSections.hero && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                Título Principal
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => handleFieldChange(setHeroTitle, e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso font-medium focus:outline-none focus:border-gold transition-colors"
              />
              <span className="text-[11px] text-text-dim mt-1 block">
                Se muestra en tipografía editorial grande.
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                Subtítulo o Párrafo Emocional
              </label>
              <textarea
                rows={2}
                value={heroSubtitle}
                onChange={(e) => handleFieldChange(setHeroSubtitle, e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso focus:outline-none focus:border-gold transition-colors font-light"
              />
            </div>

            {/* Photo & Focal Point */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2 border-t border-border-warm">
              <div className="md:col-span-7 space-y-3">
                <label className="block text-xs uppercase tracking-wider text-text-muted font-medium">
                  URL de Fotografía de Fondo
                </label>
                <input
                  type="url"
                  value={heroImage}
                  onChange={(e) => handleFieldChange(setHeroImage, e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso font-mono focus:outline-none focus:border-gold transition-colors"
                />
                
                {/* Focal Point Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-2">
                    Punto Focal de la Fotografía
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { label: 'Centro', value: 'center' },
                      { label: 'Arriba', value: 'top' },
                      { label: 'Abajo', value: 'bottom' },
                      { label: 'Izquierda', value: 'left' },
                      { label: 'Derecha', value: 'right' },
                    ].map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        onClick={() => handleFieldChange(setFocalPoint, f.value)}
                        className={`py-1.5 px-2 text-xs rounded-xs border text-center transition-colors cursor-pointer ${
                          focalPoint === f.value
                            ? 'bg-espresso text-ivory border-espresso font-semibold'
                            : 'bg-ivory/60 text-text-muted border-border-warm hover:bg-ivory'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-text-dim mt-1.5 block">
                    Garantiza que rostros o elementos clave no se corten en pantallas móviles.
                  </span>
                </div>
              </div>

              {/* Live Preview Thumbnail */}
              <div className="md:col-span-5">
                <span className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1.5">
                  Vista Previa del Encuadre
                </span>
                <div className="aspect-[16/9] rounded-xs overflow-hidden border border-border-warm bg-espresso relative shadow-sm">
                  {heroImage ? (
                    <img
                      src={heroImage}
                      alt="Preview"
                      className={`w-full h-full object-cover object-${focalPoint}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ivory/50 text-xs">
                      Sin imagen
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 pointer-events-none flex items-center justify-center">
                    <span className="text-[10px] text-white/90 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-2xs">
                      Foco: {focalPoint}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button Text */}
            <div className="pt-2 border-t border-border-warm max-w-sm">
              <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                Texto del Botón Principal
              </label>
              <input
                type="text"
                value={heroButtonText}
                onChange={(e) => handleFieldChange(setHeroButtonText, e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso font-medium focus:outline-none focus:border-gold transition-colors"
              />
            </div>

          </div>
        )}
      </div>

      {/* Accordion Block 2: Interruptores de Visibilidad */}
      <div className="bg-white rounded-xs border border-border-warm shadow-2xs overflow-hidden">
        <button
          onClick={() => toggleSection('visibility')}
          className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-ivory/50 transition-colors border-b border-border-warm text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-purple-50 text-purple-800 rounded-xs">
              <Sliders size={16} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-espresso">Bloques Visibles / Ocultos</h2>
              <p className="text-[11px] text-text-muted">Activa o apaga secciones sin eliminar su contenido</p>
            </div>
          </div>
          <ChevronDown size={18} className={`text-text-dim transition-transform ${openSections.visibility ? 'rotate-180' : ''}`} />
        </button>

        {openSections.visibility && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Mostrar Sección de Video / Film', checked: showVideo, setter: setShowVideo },
              { label: 'Mostrar Paquetes de Inversión', checked: showPackages, setter: setShowPackages },
              { label: 'Mostrar Testimonios', checked: showTestimonials, setter: setShowTestimonials },
              { label: 'Mostrar Preguntas Frecuentes (FAQ)', checked: showFaq, setter: setShowFaq },
            ].map((toggle, idx) => (
              <label
                key={idx}
                className="flex items-center justify-between p-3.5 bg-ivory/50 border border-border-warm rounded-xs cursor-pointer hover:bg-ivory transition-colors"
              >
                <span className="text-xs font-medium text-espresso">{toggle.label}</span>
                <input
                  type="checkbox"
                  checked={toggle.checked}
                  onChange={(e) => handleFieldChange(toggle.setter, e.target.checked)}
                  className="w-4 h-4 text-gold rounded-xs border-border-warm focus:ring-gold cursor-pointer"
                />
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Accordion Block 3: Video Destacado */}
      <div className="bg-white rounded-xs border border-border-warm shadow-2xs overflow-hidden">
        <button
          onClick={() => toggleSection('video')}
          className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-ivory/50 transition-colors border-b border-border-warm text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-50 text-blue-800 rounded-xs">
              <Film size={16} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-espresso">Video / Cinematografía Destacada</h2>
              <p className="text-[11px] text-text-muted">ID de YouTube o enlace del teaser cinematográfico</p>
            </div>
          </div>
          <ChevronDown size={18} className={`text-text-dim transition-transform ${openSections.video ? 'rotate-180' : ''}`} />
        </button>

        {openSections.video && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                ID o URL del Video de YouTube
              </label>
              <input
                type="text"
                value={videoId}
                onChange={(e) => handleFieldChange(setVideoId, e.target.value)}
                placeholder="dQw4w9WgXcQ o enlace completo"
                className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso font-mono focus:outline-none focus:border-gold transition-colors"
              />
              <span className="text-[11px] text-text-dim mt-1 block">
                Puedes colocar solo el ID del video o la URL directa de YouTube.
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                Título del Teaser
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => handleFieldChange(setVideoTitle, e.target.value)}
                placeholder="Ejemplo: Teaser Cinematográfico 4K"
                className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso font-medium focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {/* Accordion Block 4: SEO */}
      <div className="bg-white rounded-xs border border-border-warm shadow-2xs overflow-hidden">
        <button
          onClick={() => toggleSection('seo')}
          className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-ivory/50 transition-colors border-b border-border-warm text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-50 text-emerald-800 rounded-xs">
              <Search size={16} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-espresso">SEO & Metadatos de Búsqueda</h2>
              <p className="text-[11px] text-text-muted">Cómo se muestra esta página en Google y al compartir en WhatsApp</p>
            </div>
          </div>
          <ChevronDown size={18} className={`text-text-dim transition-transform ${openSections.seo ? 'rotate-180' : ''}`} />
        </button>

        {openSections.seo && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                Título SEO (Meta Title)
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => handleFieldChange(setSeoTitle, e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                Meta Descripción
              </label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => handleFieldChange(setSeoDescription, e.target.value)}
                className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Google Snippet Preview */}
            <div className="p-4 bg-ivory rounded-xs border border-border-warm mt-4">
              <span className="text-[10px] uppercase tracking-widest text-text-dim block mb-2 font-semibold">
                Vista previa simulada en Google
              </span>
              <div className="text-xs space-y-1">
                <span className="text-emerald-800 text-[11px] block truncate">
                  https://abancaydeboda.pe{pageConfig.liveUrl}
                </span>
                <span className="text-blue-800 font-medium text-sm hover:underline block cursor-pointer">
                  {seoTitle || pageConfig.title}
                </span>
                <p className="text-text-muted text-[11px] line-clamp-2">
                  {seoDescription || pageConfig.defaultHeroSubtitle}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border-warm py-3.5 px-6 z-30 shadow-lg flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {hasUnsavedChanges ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded-xs text-[11px] font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Cambios sin guardar
            </span>
          ) : (
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Check size={14} className="text-emerald-600" />
              Todo al día
            </span>
          )}

          {savedSuccess && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium animate-fadeIn">
              <CheckCircle2 size={15} />
              Guardado con éxito en Firestore
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={pageConfig.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-ivory hover:bg-ivory-warm border border-border-warm text-espresso text-xs font-medium rounded-xs transition-colors inline-flex items-center gap-1.5"
          >
            <Eye size={13} />
            <span>VISTA PREVIA</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Save size={14} />
            <span>{saving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
