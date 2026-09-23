/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCms, CmsMedia } from '../../context/CmsContext';
import {
  Upload,
  Plus,
  Search,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  X,
  Filter
} from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const { media, saveMediaItem, deleteMediaItem } = useCms();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [altText, setAltText] = useState('');
  const [category, setCategory] = useState('Bodas');
  const [focalPoint, setFocalPoint] = useState<'center' | 'top' | 'bottom' | 'left' | 'right'>('center');

  // Delete modal
  const [toDelete, setToDelete] = useState<CmsMedia | null>(null);

  const handleCopy = (item: CmsMedia) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      alert('Por favor ingresa la URL de la imagen.');
      return;
    }

    const payload: Partial<CmsMedia> = {
      url: url.trim(),
      title: title.trim() || 'Fotografía Abancay De Boda',
      altText: altText.trim() || title.trim() || 'Fotografía editorial de estudio',
      category: category.trim(),
      focalPoint,
    };

    await saveMediaItem(payload);
    setIsModalOpen(false);
    setUrl('');
    setTitle('');
    setAltText('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to local Base64/DataURL for immediate visual preview and CMS storage
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUrl(reader.result);
        if (!title) {
          setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const confirmDelete = async () => {
    if (toDelete) {
      await deleteMediaItem(toDelete.id);
      setToDelete(null);
    }
  };

  const filtered = media.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.altText && item.altText.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 text-left max-w-6xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Biblioteca de Archivos
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Multimedia del Estudio
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Almacén visual para portadas, galerías y banners. Copia el enlace directo con un clic para usarlo en cualquier página.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Upload size={15} />
          <span>AÑADIR FOTOGRAFÍA</span>
        </button>
      </div>

      {/* Search & Categories */}
      <div className="bg-white p-4 rounded-xs border border-border-warm shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título o descripción..."
            className="w-full pl-9 pr-3 py-2 bg-ivory/50 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
          />
          <Search size={14} className="absolute left-3 top-2.5 text-text-dim" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {['ALL', 'Bodas', 'Quinceaños', 'Cumpleaños', 'Anuarios', 'Sesiones', 'General'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xs text-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gold text-espresso font-semibold'
                  : 'text-text-muted hover:text-espresso hover:bg-ivory'
              }`}
            >
              {cat === 'ALL' ? 'Todas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xs border border-border-warm shadow-2xs overflow-hidden group hover:border-gold/50 transition-colors flex flex-col justify-between"
          >
            <div className="relative aspect-square bg-espresso overflow-hidden">
              <img
                src={item.url}
                alt={item.altText}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleCopy(item)}
                  className="p-1.5 bg-espresso/80 hover:bg-espresso text-ivory rounded-xs backdrop-blur-xs cursor-pointer shadow-sm"
                  title="Copiar URL"
                >
                  {copiedId === item.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
                <button
                  onClick={() => setToDelete(item)}
                  className="p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-xs backdrop-blur-xs cursor-pointer shadow-sm"
                  title="Eliminar de biblioteca"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div className="p-2.5">
              <span className="font-semibold text-xs text-espresso truncate block mb-0.5">
                {item.title}
              </span>
              <div className="flex items-center justify-between text-[10px] text-text-dim">
                <span>{item.category}</span>
                <button
                  onClick={() => handleCopy(item)}
                  className="text-gold-dark hover:underline cursor-pointer"
                >
                  {copiedId === item.id ? '¡Copiado!' : 'Copiar link'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center bg-white border border-border-warm rounded-xs p-8">
          <ImageIcon size={32} className="mx-auto text-text-dim mb-3" />
          <h3 className="font-bodoni text-xl text-espresso mb-1">No hay fotografías</h3>
          <p className="text-xs text-text-muted mb-4 font-light">
            Añade imágenes de tus producciones para disponer de sus enlaces directos.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gold text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs inline-flex items-center gap-1.5"
          >
            <Upload size={14} />
            <span>SUBIR FOTO</span>
          </button>
        </div>
      )}

      {/* Modal: Add Media */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border-warm mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold block">
                  Almacén Multimedia
                </span>
                <h2 className="font-bodoni text-2xl text-espresso font-normal">
                  Añadir Fotografía
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-text-dim hover:text-espresso rounded-xs cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* File upload or URL */}
              <div className="p-4 border-2 border-dashed border-border-warm bg-ivory/50 rounded-xs text-center space-y-2">
                <input
                  type="file"
                  id="media-file-input"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="media-file-input"
                  className="px-3.5 py-2 bg-espresso hover:bg-espresso-light text-ivory text-xs uppercase tracking-wider font-semibold rounded-xs inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload size={14} />
                  <span>Seleccionar archivo desde el equipo</span>
                </label>
                <p className="text-[11px] text-text-dim font-light">
                  o ingresa una URL de Cloudinary / Unsplash / Servidor abajo
                </p>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  URL de la Fotografía *
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/... o https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
                  required
                />
              </div>

              {/* Preview */}
              {url && (
                <div className="aspect-[16/9] rounded-xs overflow-hidden border border-border-warm bg-espresso">
                  <img src={url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Título de la Imagen
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Ceremonia al atardecer en Abancay"
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  >
                    <option value="Bodas">Bodas</option>
                    <option value="Quinceaños">Quinceaños</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="50 Años">50 Años</option>
                    <option value="Bautizos">Bautizos</option>
                    <option value="Anuarios">Anuarios</option>
                    <option value="Sesiones">Sesiones</option>
                    <option value="Eventos">Eventos</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Punto Focal
                  </label>
                  <select
                    value={focalPoint}
                    onChange={(e) => setFocalPoint(e.target.value as any)}
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  >
                    <option value="center">Centro</option>
                    <option value="top">Arriba</option>
                    <option value="bottom">Abajo</option>
                    <option value="left">Izquierda</option>
                    <option value="right">Derecha</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-border-warm flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-border-warm text-text-muted hover:text-espresso rounded-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold hover:bg-gold-light text-espresso font-semibold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  Guardar en Biblioteca
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-xl max-w-sm w-full p-6 text-left">
            <h3 className="font-bodoni text-xl text-espresso mb-2">¿Eliminar esta imagen?</h3>
            <p className="text-xs text-text-muted mb-6 font-light">
              Vas a eliminar: "{toDelete.title}".
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setToDelete(null)}
                className="px-3.5 py-2 text-xs border border-border-warm rounded-xs text-text-muted hover:text-espresso cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xs cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
