/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCms, CmsTestimonial } from '../../context/CmsContext';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Quote,
  X
} from 'lucide-react';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, saveTestimonial, deleteTestimonial } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<CmsTestimonial> | null>(null);

  const [author, setAuthor] = useState('');
  const [event, setEvent] = useState('');
  const [location, setLocation] = useState('Abancay');
  const [year, setYear] = useState('2025');
  const [quote, setQuote] = useState('');
  const [photo, setPhoto] = useState('');
  const [showOnHome, setShowOnHome] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [order, setOrder] = useState(1);

  const [toDelete, setToDelete] = useState<CmsTestimonial | null>(null);

  const openCreate = () => {
    setEditingItem(null);
    setAuthor('');
    setEvent('Matrimonio');
    setLocation('Abancay');
    setYear('2025');
    setQuote('');
    setPhoto('');
    setShowOnHome(false);
    setStatus('published');
    setOrder(testimonials.length + 1);
    setIsModalOpen(true);
  };

  const openEdit = (t: CmsTestimonial) => {
    setEditingItem(t);
    setAuthor(t.author);
    setEvent(t.event);
    setLocation(t.location || 'Abancay');
    setYear(t.year || '2025');
    setQuote(t.quote);
    setPhoto(t.photo || '');
    setShowOnHome(t.showOnHome || false);
    setStatus(t.status);
    setOrder(t.order);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (t: CmsTestimonial) => {
    const nextStatus = t.status === 'published' ? 'hidden' : 'published';
    await saveTestimonial({ id: t.id, status: nextStatus });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) {
      alert('Por favor completa el nombre y el testimonio.');
      return;
    }

    const payload: Partial<CmsTestimonial> = {
      ...(editingItem ? { id: editingItem.id } : {}),
      author: author.trim(),
      event: event.trim(),
      location: location.trim(),
      year: year.trim(),
      quote: quote.trim(),
      photo: photo.trim() || undefined,
      showOnHome,
      status,
      order: Number(order) || 1,
    };

    await saveTestimonial(payload);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (toDelete) {
      await deleteTestimonial(toDelete.id);
      setToDelete(null);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Confianza & Experiencias
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Testimonios de Clientes
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Citas de parejas y familias para mostrar en el Inicio y en páginas de servicios.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>NUEVO TESTIMONIO</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => {
          const isHidden = t.status === 'hidden';

          return (
            <div
              key={t.id}
              className={`bg-white rounded-xs border shadow-2xs p-6 flex flex-col justify-between transition-colors ${
                isHidden ? 'border-dashed border-red-300 opacity-60' : 'border-border-warm hover:border-gold/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Quote size={20} className="text-gold/40" />
                  {t.showOnHome && (
                    <span className="text-[9px] uppercase tracking-wider font-bold text-espresso bg-gold px-1.5 py-0.5 rounded-2xs flex items-center gap-1">
                      <Star size={9} fill="currentColor" />
                      EN INICIO
                    </span>
                  )}
                </div>

                <p className="font-bodoni italic text-sm text-espresso font-light leading-relaxed mb-4">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-border-warm">
                  {t.photo ? (
                    <img src={t.photo} alt={t.author} className="w-9 h-9 rounded-full object-cover border border-gold" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-ivory-warm border border-border-warm flex items-center justify-center font-bodoni text-xs font-semibold text-gold-dark">
                      {t.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-xs text-espresso block">
                      {t.author}
                    </span>
                    <span className="text-[11px] text-text-dim block">
                      {t.event} · {t.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-border-warm flex items-center justify-between text-xs">
                <button
                  onClick={() => handleToggleStatus(t)}
                  className="inline-flex items-center gap-1 text-text-muted hover:text-espresso transition-colors cursor-pointer"
                >
                  {isHidden ? <Eye size={14} className="text-emerald-600" /> : <EyeOff size={14} />}
                  <span>{isHidden ? 'Mostrar' : 'Ocultar'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEdit(t)}
                    className="p-1.5 text-text-muted hover:text-gold hover:bg-ivory rounded-xs transition-colors cursor-pointer"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => setToDelete(t)}
                    className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border-warm mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold block">
                  {editingItem ? 'Modificar Reseña' : 'Nueva Reseña'}
                </span>
                <h2 className="font-bodoni text-2xl text-espresso font-normal">
                  {editingItem ? 'Editar Testimonio' : 'Crear Testimonio'}
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
              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Nombre de los Clientes *
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ej: Valeria & Rodrigo"
                  className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso font-medium focus:outline-none focus:border-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Evento / Motivo
                  </label>
                  <input
                    type="text"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    placeholder="Matrimonio en Abancay"
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Lugar y Año
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Abancay · 2025"
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Cita / Testimonio *
                </label>
                <textarea
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Relato de cómo vivieron la experiencia fotográfica..."
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold font-light"
                  required
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  URL de Foto Opcional
                </label>
                <input
                  type="url"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnHome}
                    onChange={(e) => setShowOnHome(e.target.checked)}
                    className="w-4 h-4 text-gold rounded-xs border-border-warm focus:ring-gold"
                  />
                  <span className="font-medium text-espresso">Mostrar en Portada de Inicio</span>
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="px-3 py-1.5 bg-ivory border border-border-warm rounded-xs text-xs text-espresso"
                >
                  <option value="published">Publicado</option>
                  <option value="hidden">Oculto</option>
                </select>
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
                  {editingItem ? 'Guardar Cambios' : 'Crear Testimonio'}
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
            <h3 className="font-bodoni text-xl text-espresso mb-2">¿Eliminar este testimonio?</h3>
            <p className="text-xs text-text-muted mb-6 font-light">
              Vas a eliminar la reseña de <strong>"{toDelete.author}"</strong>. Esta acción no se puede deshacer.
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
