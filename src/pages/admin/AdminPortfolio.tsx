/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCms, CmsPortfolioItem } from '../../context/CmsContext';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  ExternalLink,
  Camera,
  Star
} from 'lucide-react';

const CATEGORIES = [
  { id: 'ALL', label: 'Todos' },
  { id: 'BODAS', label: 'Bodas' },
  { id: 'QUINCEAÑOS', label: 'Quinceaños' },
  { id: 'CUMPLEAÑOS', label: 'Cumpleaños' },
  { id: '50-ANOS', label: '50 Años' },
  { id: 'BAUTIZOS', label: 'Bautizos' },
  { id: 'ANUARIOS', label: 'Anuarios' },
  { id: 'SESIONES', label: 'Sesiones' },
  { id: 'EVENTOS', label: 'Eventos' },
];

export const AdminPortfolio: React.FC = () => {
  const { portfolio, savePortfolioItem, deletePortfolioItem } = useCms();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'published' | 'draft' | 'hidden'>('ALL');

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<CmsPortfolioItem> | null>(null);

  // Form inputs
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('BODAS');
  const [categoryLabel, setCategoryLabel] = useState('Bodas & Matrimonios');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('Abancay, Apurímac');
  const [year, setYear] = useState('2025');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [focalPoint, setFocalPoint] = useState<'center' | 'top' | 'bottom' | 'left' | 'right'>('center');

  // Delete confirmation
  const [itemToDelete, setItemToDelete] = useState<CmsPortfolioItem | null>(null);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('BODAS');
    setCategoryLabel('Bodas & Matrimonios');
    setImage('');
    setLocation('Abancay, Apurímac');
    setYear(new Date().getFullYear().toString());
    setDescription('');
    setVideoUrl('');
    setFeatured(false);
    setStatus('published');
    setFocalPoint('center');
    setIsFormOpen(true);
  };

  const openEditModal = (item: CmsPortfolioItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setCategoryLabel(item.categoryLabel || item.category);
    setImage(item.image);
    setLocation(item.location || 'Abancay, Apurímac');
    setYear(item.year || '2025');
    setDescription(item.description || '');
    setVideoUrl(item.videoUrl || '');
    setFeatured(item.featured || false);
    setStatus(item.status || 'published');
    setFocalPoint(item.focalPoint || 'center');
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image.trim()) {
      alert('Por favor completa el título y la imagen de portada.');
      return;
    }

    const payload: Partial<CmsPortfolioItem> = {
      ...(editingItem ? { id: editingItem.id } : {}),
      title: title.trim(),
      category,
      categoryLabel,
      image: image.trim(),
      location: location.trim(),
      year: year.trim(),
      description: description.trim(),
      videoUrl: videoUrl.trim(),
      featured,
      status,
      focalPoint,
      aspect: 'square',
    };

    await savePortfolioItem(payload);
    setIsFormOpen(false);
  };

  const handleToggleHide = async (item: CmsPortfolioItem) => {
    const currentStatus = item.status || 'published';
    const newStatus = currentStatus === 'hidden' ? 'published' : 'hidden';
    await savePortfolioItem({ id: item.id, status: newStatus });
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await deletePortfolioItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  // Filter items
  const filtered = portfolio.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const itemStatus = (item as any).status || 'published';
    const matchesStatus = selectedStatus === 'ALL' || itemStatus === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left max-w-6xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Gestión de Obras
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Portafolio del Estudio
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Publica, oculta o edita los trabajos que se muestran en el portafolio y en las páginas de cada servicio.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>NUEVO TRABAJO</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xs border border-border-warm shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título o lugar..."
              className="w-full pl-9 pr-3 py-2 bg-ivory/50 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold transition-colors"
            />
            <Search size={14} className="absolute left-3 top-2.5 text-text-dim" />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <span className="text-text-dim text-[11px] uppercase tracking-wider">Estado:</span>
            {(['ALL', 'published', 'draft', 'hidden'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-espresso text-ivory border-espresso font-semibold'
                    : 'bg-ivory/50 text-text-muted border-border-warm hover:bg-ivory'
                }`}
              >
                {st === 'ALL' ? 'Todos' : st === 'published' ? 'Publicados' : st === 'draft' ? 'Borrador' : 'Ocultos'}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Tab */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-border-warm/60 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xs text-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gold text-espresso font-semibold'
                  : 'text-text-muted hover:text-espresso hover:bg-ivory'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Portfolio Works */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const itemStatus = (item as any).status || 'published';
          const isHidden = itemStatus === 'hidden';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xs border transition-colors shadow-2xs flex flex-col justify-between overflow-hidden group ${
                isHidden ? 'border-dashed border-red-300 opacity-60' : 'border-border-warm hover:border-gold/50'
              }`}
            >
              <div className="relative aspect-[4/3] bg-espresso overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                
                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 bg-espresso/80 text-ivory backdrop-blur-xs text-[10px] uppercase tracking-wider font-semibold rounded-2xs">
                    {item.categoryLabel || item.category}
                  </span>
                  {item.featured && (
                    <span className="px-1.5 py-0.5 bg-gold text-espresso text-[9px] font-bold rounded-2xs flex items-center gap-1">
                      <Star size={10} fill="currentColor" />
                      DESTACADO
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-2xs ${
                      itemStatus === 'published'
                        ? 'bg-emerald-600 text-white'
                        : itemStatus === 'draft'
                        ? 'bg-amber-500 text-espresso'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {itemStatus === 'published' ? 'Público' : itemStatus === 'draft' ? 'Borrador' : 'Oculto'}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bodoni text-lg text-espresso font-normal leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-text-muted font-light mb-2">
                    {item.location} · {item.year}
                  </p>
                  {item.description && (
                    <p className="text-xs text-text-muted font-light line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-border-warm flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleHide(item)}
                    className="inline-flex items-center gap-1 text-text-muted hover:text-espresso transition-colors cursor-pointer"
                    title={isHidden ? 'Publicar de nuevo' : 'Ocultar sin borrar'}
                  >
                    {isHidden ? <Eye size={14} className="text-emerald-600" /> : <EyeOff size={14} />}
                    <span>{isHidden ? 'Mostrar' : 'Ocultar'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-text-muted hover:text-gold hover:bg-ivory rounded-xs transition-colors cursor-pointer"
                      title="Editar trabajo"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setItemToDelete(item)}
                      className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                      title="Eliminar trabajo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center bg-white border border-border-warm rounded-xs p-8">
          <Camera size={32} className="mx-auto text-text-dim mb-3" />
          <h3 className="font-bodoni text-xl text-espresso mb-1">No hay trabajos coincidentes</h3>
          <p className="text-xs text-text-muted mb-4 font-light">
            Prueba cambiando los filtros o publica un nuevo trabajo en el botón superior.
          </p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-gold text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs inline-flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>NUEVO TRABAJO</span>
          </button>
        </div>
      )}

      {/* Modal: Create or Edit Work */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-border-warm mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold block">
                  {editingItem ? 'Modificar Trabajo' : 'Añadir al Portafolio'}
                </span>
                <h2 className="font-bodoni text-2xl text-espresso font-normal">
                  {editingItem ? 'Editar Trabajo' : 'Nuevo Trabajo'}
                </h2>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 text-text-dim hover:text-espresso rounded-xs cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Título del Trabajo *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Boda de Andrea & Sebastián"
                  className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso font-medium focus:outline-none focus:border-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Categoría *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value as any);
                      const catFound = CATEGORIES.find(c => c.id === e.target.value);
                      if (catFound) setCategoryLabel(catFound.label);
                    }}
                    className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  >
                    <option value="BODAS">Bodas & Matrimonios</option>
                    <option value="QUINCEAÑOS">Quinceaños (15 Años)</option>
                    <option value="CUMPLEAÑOS">Cumpleaños</option>
                    <option value="50-ANOS">50 Años & Bodas de Oro</option>
                    <option value="BAUTIZOS">Bautizos</option>
                    <option value="ANUARIOS">Anuarios & Promociones</option>
                    <option value="SESIONES">Sesiones Fotográficas</option>
                    <option value="EVENTOS">Eventos Sociales</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Estado de Publicación
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  >
                    <option value="published">Publicado (Visible en la web)</option>
                    <option value="draft">Borrador</option>
                    <option value="hidden">Oculto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  URL de Fotografía de Portada *
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
                  required
                />
              </div>

              {/* Focal Point */}
              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1.5">
                  Punto Focal de la Imagen
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(['center', 'top', 'bottom', 'left', 'right'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFocalPoint(f)}
                      className={`py-1.5 px-2 text-[11px] rounded-xs border text-center transition-colors cursor-pointer ${
                        focalPoint === f
                          ? 'bg-espresso text-ivory border-espresso font-semibold'
                          : 'bg-ivory/50 text-text-muted border-border-warm'
                      }`}
                    >
                      {f === 'center' ? 'Centro' : f === 'top' ? 'Arriba' : f === 'bottom' ? 'Abajo' : f === 'left' ? 'Izq.' : 'Der.'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: Abancay, Apurímac"
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Año
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Descripción Corta
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles sobre la sesión o jornada..."
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold font-light"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  URL de Video / Teaser Opcional
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="ID de YouTube o enlace"
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
                />
              </div>

              <label className="flex items-center gap-2 p-3 bg-ivory/60 border border-border-warm rounded-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-gold rounded-xs border-border-warm focus:ring-gold"
                />
                <span className="font-medium text-espresso">Destacar este trabajo en la Portada de Inicio</span>
              </label>

              <div className="pt-4 border-t border-border-warm flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-border-warm text-text-muted hover:text-espresso rounded-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold hover:bg-gold-light text-espresso font-semibold uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  {editingItem ? 'Guardar Cambios' : 'Publicar Trabajo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-xl max-w-sm w-full p-6 text-left">
            <h3 className="font-bodoni text-xl text-espresso mb-2">¿Eliminar este trabajo?</h3>
            <p className="text-xs text-text-muted mb-6 font-light">
              Vas a eliminar <strong>"{itemToDelete.title}"</strong>. Esta acción no se puede deshacer.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setItemToDelete(null)}
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
