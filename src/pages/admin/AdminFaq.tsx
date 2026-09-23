/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCms, CmsFaq } from '../../context/CmsContext';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  HelpCircle,
  X
} from 'lucide-react';

export const AdminFaq: React.FC = () => {
  const { faqs, saveFaq, deleteFaq } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<CmsFaq> | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Bodas');
  const [status, setStatus] = useState<'published' | 'hidden'>('published');
  const [order, setOrder] = useState(1);

  const [toDelete, setToDelete] = useState<CmsFaq | null>(null);

  const openCreate = () => {
    setEditingItem(null);
    setQuestion('');
    setAnswer('');
    setCategory('Bodas');
    setStatus('published');
    setOrder(faqs.length + 1);
    setIsModalOpen(true);
  };

  const openEdit = (f: CmsFaq) => {
    setEditingItem(f);
    setQuestion(f.question);
    setAnswer(f.answer);
    setCategory(f.category);
    setStatus(f.status === 'hidden' ? 'hidden' : 'published');
    setOrder(f.order);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (f: CmsFaq) => {
    const nextStatus = f.status === 'published' ? 'hidden' : 'published';
    await saveFaq({ id: f.id, status: nextStatus });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      alert('Por favor completa la pregunta y la respuesta.');
      return;
    }

    const payload: Partial<CmsFaq> = {
      ...(editingItem ? { id: editingItem.id } : {}),
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim(),
      status,
      order: Number(order) || 1,
    };

    await saveFaq(payload);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (toDelete) {
      await deleteFaq(toDelete.id);
      setToDelete(null);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Resolución de Dudas
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Preguntas Frecuentes (FAQ)
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Preguntas categorizadas que se distribuyen en las páginas correspondientes y en Contacto.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>NUEVA PREGUNTA</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {faqs.map((item) => {
          const isHidden = item.status === 'hidden';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xs border shadow-2xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                isHidden ? 'border-dashed border-red-300 opacity-60' : 'border-border-warm hover:border-gold/40'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gold-dark bg-ivory-warm px-2 py-0.5 rounded-2xs border border-border-warm">
                    {item.category}
                  </span>
                  {isHidden && (
                    <span className="text-[9px] uppercase tracking-wider font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-2xs">
                      OCULTO
                    </span>
                  )}
                </div>
                <h3 className="font-bodoni text-lg text-espresso font-normal mb-1">
                  {item.question}
                </h3>
                <p className="text-xs text-text-muted font-light leading-relaxed line-clamp-2">
                  {item.answer}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 self-end md:self-auto border-t md:border-t-0 pt-3 md:pt-0 border-border-warm">
                <button
                  onClick={() => handleToggleStatus(item)}
                  className="p-1.5 text-text-muted hover:text-espresso rounded-xs transition-colors cursor-pointer"
                  title={isHidden ? 'Publicar de nuevo' : 'Ocultar'}
                >
                  {isHidden ? <Eye size={15} className="text-emerald-600" /> : <EyeOff size={15} />}
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="p-1.5 text-text-muted hover:text-gold hover:bg-ivory rounded-xs transition-colors cursor-pointer"
                  title="Editar"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => setToDelete(item)}
                  className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                  title="Eliminar"
                >
                  <Trash2 size={15} />
                </button>
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
                  {editingItem ? 'Editar Pregunta' : 'Nueva Pregunta'}
                </span>
                <h2 className="font-bodoni text-2xl text-espresso font-normal">
                  {editingItem ? 'Modificar FAQ' : 'Añadir FAQ'}
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
                  Pregunta *
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ej: ¿Con cuánto tiempo de anticipación debemos reservar?"
                  className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso font-medium focus:outline-none focus:border-gold"
                  required
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Categoría
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                >
                  <option value="General">General</option>
                  <option value="Bodas">Bodas</option>
                  <option value="Quinceaños">Quinceaños</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="50 Años">50 Años</option>
                  <option value="Bautizos">Bautizos</option>
                  <option value="Anuarios">Anuarios</option>
                  <option value="Sesiones">Sesiones</option>
                  <option value="Eventos">Eventos</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Respuesta Detallada *
                </label>
                <textarea
                  rows={5}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Explica con claridad y calidez el procedimiento..."
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold font-light leading-relaxed"
                  required
                />
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
                  {editingItem ? 'Guardar Cambios' : 'Guardar FAQ'}
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
            <h3 className="font-bodoni text-xl text-espresso mb-2">¿Eliminar esta pregunta?</h3>
            <p className="text-xs text-text-muted mb-6 font-light">
              Vas a eliminar: "{toDelete.question}".
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
