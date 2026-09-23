/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCms, CmsPackage } from '../../context/CmsContext';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Star,
  Check,
  X,
  Package as PackageIcon
} from 'lucide-react';

export const AdminPackages: React.FC = () => {
  const { packages, savePackage, deletePackage } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Partial<CmsPackage> | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Bodas');
  const [price, setPrice] = useState('');
  const [pricePrefix, setPricePrefix] = useState('Inversión');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft' | 'hidden'>('published');
  const [order, setOrder] = useState(1);

  // Delete modal
  const [pkgToDelete, setPkgToDelete] = useState<CmsPackage | null>(null);

  const openCreate = () => {
    setEditingPkg(null);
    setName('');
    setCategory('Bodas');
    setPrice('');
    setPricePrefix('Inversión');
    setDescription('');
    setFeaturesText('Cobertura fotográfica completa\nFotografías en alta resolución\nGalería online privada\nFilm teaser 4K');
    setFeatured(false);
    setStatus('published');
    setOrder(packages.length + 1);
    setIsModalOpen(true);
  };

  const openEdit = (pkg: CmsPackage) => {
    setEditingPkg(pkg);
    setName(pkg.name);
    setCategory(pkg.category);
    setPrice(pkg.price);
    setPricePrefix(pkg.pricePrefix || 'Inversión');
    setDescription(pkg.description);
    setFeaturesText(pkg.features.join('\n'));
    setFeatured(pkg.featured);
    setStatus(pkg.status);
    setOrder(pkg.order);
    setIsModalOpen(true);
  };

  const handleDuplicate = async (pkg: CmsPackage) => {
    const duplicated: Partial<CmsPackage> = {
      name: `${pkg.name} (Copia)`,
      category: pkg.category,
      price: pkg.price,
      pricePrefix: pkg.pricePrefix,
      description: pkg.description,
      features: [...pkg.features],
      featured: false,
      status: 'draft',
      order: packages.length + 1,
    };
    await savePackage(duplicated);
  };

  const handleToggleStatus = async (pkg: CmsPackage) => {
    const nextStatus = pkg.status === 'published' ? 'hidden' : 'published';
    await savePackage({ id: pkg.id, status: nextStatus });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor ingresa el nombre del paquete.');
      return;
    }

    const features = featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const payload: Partial<CmsPackage> = {
      ...(editingPkg ? { id: editingPkg.id } : {}),
      name: name.trim(),
      category: category.trim(),
      price: price.trim(),
      pricePrefix: pricePrefix.trim(),
      description: description.trim(),
      features,
      featured,
      status,
      order: Number(order) || 1,
    };

    await savePackage(payload);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (pkgToDelete) {
      await deletePackage(pkgToDelete.id);
      setPkgToDelete(null);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Tarifarios & Inversión
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Paquetes del Estudio
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Administra los planes de cobertura, beneficios y precios para cada tipo de celebración.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-gold hover:bg-gold-light text-espresso font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus size={15} />
          <span>NUEVO PAQUETE</span>
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isHidden = pkg.status === 'hidden';

          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-xs border shadow-2xs flex flex-col justify-between overflow-hidden transition-colors ${
                isHidden ? 'border-dashed border-red-300 opacity-60' : 'border-border-warm hover:border-gold/50'
              }`}
            >
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gold-dark bg-ivory-warm px-2 py-0.5 rounded-2xs border border-border-warm">
                      {pkg.category}
                    </span>
                    {pkg.featured && (
                      <span className="text-[9px] uppercase tracking-wider font-bold text-espresso bg-gold px-1.5 py-0.5 rounded-2xs flex items-center gap-1">
                        <Star size={10} fill="currentColor" />
                        RECOMENDADO
                      </span>
                    )}
                  </div>

                  <h3 className="font-bodoni text-xl text-espresso font-normal mb-1">
                    {pkg.name}
                  </h3>

                  <div className="my-3 pb-3 border-b border-border-warm">
                    <span className="text-[10px] uppercase tracking-wider text-text-dim block">
                      {pkg.pricePrefix || 'Inversión'}
                    </span>
                    <span className="font-bodoni text-2xl text-espresso font-normal">
                      {pkg.price || 'Consultar'}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted font-light mb-4">
                    {pkg.description}
                  </p>

                  {/* Feature list preview */}
                  <ul className="space-y-1.5 text-xs text-text-muted font-light mb-6">
                    {pkg.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={13} className="text-gold flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                    {pkg.features.length > 4 && (
                      <li className="text-[11px] text-text-dim pl-5">
                        +{pkg.features.length - 4} beneficios más...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-border-warm flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleStatus(pkg)}
                    className="inline-flex items-center gap-1 text-text-muted hover:text-espresso transition-colors cursor-pointer"
                  >
                    {isHidden ? <Eye size={14} className="text-emerald-600" /> : <EyeOff size={14} />}
                    <span>{isHidden ? 'Mostrar' : 'Ocultar'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDuplicate(pkg)}
                      className="p-1.5 text-text-muted hover:text-espresso hover:bg-ivory rounded-xs transition-colors cursor-pointer"
                      title="Duplicar paquete"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      onClick={() => openEdit(pkg)}
                      className="p-1.5 text-text-muted hover:text-gold hover:bg-ivory rounded-xs transition-colors cursor-pointer"
                      title="Editar paquete"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setPkgToDelete(pkg)}
                      className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                      title="Eliminar paquete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create or Edit Package */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border-warm mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold block">
                  {editingPkg ? 'Modificar Tarifario' : 'Nuevo Paquete'}
                </span>
                <h2 className="font-bodoni text-2xl text-espresso font-normal">
                  {editingPkg ? 'Editar Paquete' : 'Crear Paquete'}
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
                  Nombre del Paquete *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Cobertura Completa"
                  className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-sm text-espresso font-medium focus:outline-none focus:border-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Categoría / Servicio
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  >
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
                    Estado
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  >
                    <option value="published">Publicado</option>
                    <option value="draft">Borrador</option>
                    <option value="hidden">Oculto</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Prefijo de Precio
                  </label>
                  <input
                    type="text"
                    value={pricePrefix}
                    onChange={(e) => setPricePrefix(e.target.value)}
                    placeholder="Inversión desde"
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                    Precio (Editable manualmente)
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ej: S/ 1,800 o A cotizar"
                    className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Descripción Breve
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ideal para bodas íntimas o eventos medianos..."
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs text-espresso focus:outline-none focus:border-gold font-light"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-text-muted font-medium mb-1">
                  Lista de Beneficios Incluidos (Uno por línea)
                </label>
                <textarea
                  rows={5}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Fotógrafo principal\nFilm 4K\nEntrega en USB de madera\nGalería privada"
                  className="w-full px-3.5 py-2 bg-ivory/40 border border-border-warm rounded-xs text-xs font-mono text-espresso focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 text-gold rounded-xs border-border-warm focus:ring-gold"
                  />
                  <span className="font-medium text-espresso">Marcar como Recomendado</span>
                </label>
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
                  {editingPkg ? 'Guardar Cambios' : 'Crear Paquete'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {pkgToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-xl max-w-sm w-full p-6 text-left">
            <h3 className="font-bodoni text-xl text-espresso mb-2">¿Eliminar este paquete?</h3>
            <p className="text-xs text-text-muted mb-6 font-light">
              Vas a eliminar <strong>"{pkgToDelete.name}"</strong>. Esta acción no se puede deshacer.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setPkgToDelete(null)}
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
