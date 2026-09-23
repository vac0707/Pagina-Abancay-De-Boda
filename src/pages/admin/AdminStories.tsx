/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCms, CmsStory } from '../../context/CmsContext';
import {
  Plus,
  BookOpen,
  Edit3,
  Trash2,
  ExternalLink,
  X,
  Type,
  Image as ImageIcon,
  Film,
  Quote,
  MoveVertical,
  Check
} from 'lucide-react';

export const AdminStories: React.FC = () => {
  const { stories, saveStory, deleteStory } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Partial<CmsStory> | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [secondaryImage, setSecondaryImage] = useState('');
  const [location, setLocation] = useState('Abancay, Apurímac');
  const [year, setYear] = useState('2025');
  const [quote, setQuote] = useState('');
  const [description, setDescription] = useState('');
  const [videoId, setVideoId] = useState('');

  // Story Blocks
  const [blocks, setBlocks] = useState<any[]>([]);

  // Delete confirm
  const [storyToDelete, setStoryToDelete] = useState<CmsStory | null>(null);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const openCreate = () => {
    setEditingStory(null);
    setTitle('');
    setSlug('');
    setSubtitle('');
    setCoverImage('');
    setSecondaryImage('');
    setLocation('Abancay, Apurímac');
    setYear('2025');
    setQuote('');
    setDescription('');
    setVideoId('');
    setBlocks([]);
    setIsModalOpen(true);
  };

  const openEdit = (s: CmsStory) => {
    setEditingStory(s);
    setTitle(s.coupleOrProject);
    setSlug(s.id);
    setSubtitle(s.subtitle);
    setCoverImage(s.coverImage);
    setSecondaryImage(s.secondaryImage || '');
    setLocation(s.location);
    setYear(s.year);
    setQuote(s.quote || '');
    setDescription(s.description);
    setVideoId(s.videoId || '');
    setBlocks(s.blocks || []);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingStory) {
      setSlug(generateSlug(val));
    }
  };

  // Block Builder functions
  const addBlock = (type: 'text' | 'image' | 'two_images' | 'video' | 'quote') => {
    const newBlock = {
      id: `blk-${Date.now()}`,
      type,
      content: type === 'quote' ? 'Una frase inolvidable...' : '',
      url1: '',
      url2: '',
    };
    setBlocks(prev => [...prev, newBlock]);
  };

  const updateBlock = (idx: number, updates: any) => {
    setBlocks(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...updates };
      return next;
    });
  };

  const removeBlock = (idx: number) => {
    setBlocks(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !coverImage.trim()) {
      alert('Por favor ingresa el título y la portada de la historia.');
      return;
    }

    const finalSlug = slug.trim() || generateSlug(title);

    const payload: Partial<CmsStory> = {
      id: finalSlug,
      coupleOrProject: title.trim(),
      subtitle: subtitle.trim(),
      coverImage: coverImage.trim(),
      secondaryImage: secondaryImage.trim() || undefined,
      location: location.trim(),
      year: year.trim(),
      quote: quote.trim() || undefined,
      description: description.trim(),
      videoId: videoId.trim() || undefined,
      details: editingStory?.details || ['Cobertura completa', 'Film 4K', 'Sesión fotográfica'],
      ...({ blocks } as any),
    };

    await saveStory(payload);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (storyToDelete) {
      await deleteStory(storyToDelete.id);
      setStoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-6xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Narrativa & Publicaciones
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Historias Documentadas
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Crea crónicas editoriales completas. Cada historia genera automáticamente su enlace público en <code>/historias/:slug</code>.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>NUEVA HISTORIA</span>
        </button>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-xs border border-border-warm shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-gold/50 transition-colors"
          >
            <div className="relative aspect-[16/10] bg-espresso overflow-hidden">
              <img
                src={story.coverImage}
                alt={story.coupleOrProject}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-espresso/80 backdrop-blur-xs text-ivory text-[10px] uppercase tracking-wider rounded-2xs">
                {story.location} · {story.year}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bodoni text-xl text-espresso font-normal mb-1">
                  {story.coupleOrProject}
                </h3>
                <p className="text-xs text-gold-dark font-medium mb-2">
                  {story.subtitle}
                </p>
                <p className="text-xs text-text-muted font-light line-clamp-3 mb-4">
                  {story.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border-warm flex items-center justify-between text-xs">
                <a
                  href={`/historias/${story.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-espresso hover:text-gold transition-colors"
                >
                  <ExternalLink size={12} className="text-gold" />
                  <span>Ver Pública</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(story)}
                    className="p-1.5 text-text-muted hover:text-gold hover:bg-ivory rounded-xs transition-colors cursor-pointer"
                    title="Editar historia"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => setStoryToDelete(story)}
                    className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                    title="Eliminar historia"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create or Edit Story */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto p-6 md:p-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border-warm mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold block">
                  {editingStory ? 'Editar Crónica Editorial' : 'Nueva Crónica'}
                </span>
                <h2 className="font-bodoni text-2xl text-espresso font-normal">
                  {editingStory ? 'Modificar Historia' : 'Crear Historia'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-text-dim hover:text-espresso rounded-xs cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Título / Pareja o Proyecto *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Ej: Gabriela & Fernando"
                    className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso font-medium focus:outline-none focus:border-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Slug de la URL (Automático)
                  </label>
                  <div className="flex items-center">
                    <span className="px-2.5 py-2 bg-ivory text-[11px] text-text-dim border border-r-0 border-border-warm rounded-l-xs font-mono">
                      /historias/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="gabriela-fernando"
                      className="w-full px-3 py-2 bg-ivory/40 border border-border-warm rounded-r-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Subtítulo / Estilo de la Jornada
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ej: Matrimonio Religioso & Recepción en Hacienda"
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    URL de Foto de Portada (Principal) *
                  </label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
                    required
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Foto Secundaria / Detalle
                  </label>
                  <input
                    type="url"
                    value={secondaryImage}
                    onChange={(e) => setSecondaryImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Abancay, Apurímac"
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

                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    ID Video YouTube (Opcional)
                  </label>
                  <input
                    type="text"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    placeholder="ID o link"
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Frase o Cita Emocional de los Protagonistas
                </label>
                <input
                  type="text"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Ej: Queríamos que cada abrazo quedara grabado como arte."
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs italic text-espresso focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Relato Editorial / Crónica
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe la jornada, la luz de la tarde, la atmósfera..."
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold font-light"
                />
              </div>

              {/* Modular Story Blocks Builder */}
              <div className="pt-4 border-t border-border-warm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block uppercase tracking-wider text-text-muted font-medium">
                      Bloques Adicionales de la Historia
                    </span>
                    <span className="text-[11px] text-text-dim font-light">
                      Agrega contenido estructurado sin romper la maquetación editorial
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => addBlock('text')}
                      className="px-2 py-1 bg-ivory hover:bg-ivory-warm border border-border-warm rounded-xs text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <Type size={12} />
                      <span>+ Texto</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('image')}
                      className="px-2 py-1 bg-ivory hover:bg-ivory-warm border border-border-warm rounded-xs text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <ImageIcon size={12} />
                      <span>+ Foto</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('quote')}
                      className="px-2 py-1 bg-ivory hover:bg-ivory-warm border border-border-warm rounded-xs text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <Quote size={12} />
                      <span>+ Cita</span>
                    </button>
                  </div>
                </div>

                {/* Blocks List */}
                <div className="space-y-3">
                  {blocks.map((blk, idx) => (
                    <div key={blk.id || idx} className="p-3 bg-ivory/50 border border-border-warm rounded-xs relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gold-dark">
                          Bloque {idx + 1}: {blk.type.toUpperCase()}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeBlock(idx)}
                          className="text-text-dim hover:text-red-600 cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      {blk.type === 'text' && (
                        <textarea
                          rows={2}
                          value={blk.content || ''}
                          onChange={(e) => updateBlock(idx, { content: e.target.value })}
                          placeholder="Párrafo adicional..."
                          className="w-full px-3 py-1.5 bg-white border border-border-warm rounded-xs text-xs"
                        />
                      )}

                      {blk.type === 'image' && (
                        <input
                          type="url"
                          value={blk.url1 || ''}
                          onChange={(e) => updateBlock(idx, { url1: e.target.value })}
                          placeholder="URL de imagen..."
                          className="w-full px-3 py-1.5 bg-white border border-border-warm rounded-xs text-xs font-mono"
                        />
                      )}

                      {blk.type === 'quote' && (
                        <input
                          type="text"
                          value={blk.content || ''}
                          onChange={(e) => updateBlock(idx, { content: e.target.value })}
                          placeholder="Texto de la cita destacada..."
                          className="w-full px-3 py-1.5 bg-white border border-border-warm rounded-xs text-xs italic"
                        />
                      )}
                    </div>
                  ))}
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
                  {editingStory ? 'Guardar Historia' : 'Publicar Historia'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {storyToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-xl max-w-sm w-full p-6 text-left">
            <h3 className="font-bodoni text-xl text-espresso mb-2">¿Eliminar esta historia?</h3>
            <p className="text-xs text-text-muted mb-6 font-light">
              Vas a eliminar la crónica de <strong>"{storyToDelete.coupleOrProject}"</strong>. Su enlace público dejará de estar disponible.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setStoryToDelete(null)}
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
