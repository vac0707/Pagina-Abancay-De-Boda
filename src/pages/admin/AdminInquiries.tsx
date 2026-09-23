/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCms, CmsInquiry } from '../../context/CmsContext';
import {
  Inbox,
  MessageCircle,
  Phone,
  Calendar,
  MapPin,
  Clock,
  Trash2,
  CheckCircle,
  Sparkles,
  Filter
} from 'lucide-react';

export const AdminInquiries: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useCms();

  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [toDelete, setToDelete] = useState<CmsInquiry | null>(null);

  const statusLabels: Record<CmsInquiry['status'], { label: string; color: string }> = {
    new: { label: 'Nueva', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    contacted: { label: 'Contactado', color: 'bg-blue-100 text-blue-900 border-blue-300' },
    quoted: { label: 'Cotizado', color: 'bg-purple-100 text-purple-900 border-purple-300' },
    confirmed: { label: 'Confirmado', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    closed: { label: 'Cerrado', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  };

  const filtered = inquiries.filter((inq) => {
    return selectedStatus === 'ALL' || inq.status === selectedStatus;
  });

  const confirmDelete = async () => {
    if (toDelete) {
      await deleteInquiry(toDelete.id);
      setToDelete(null);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-border-warm shadow-2xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            Bandeja de Entrada
          </span>
          <h1 className="font-bodoni text-3xl text-espresso font-normal">
            Consultas Recibidas
          </h1>
          <p className="text-xs text-text-muted mt-0.5 font-light">
            Mensajes enviados desde el formulario de reserva y contacto de la página web.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-ivory text-xs font-semibold text-espresso border border-border-warm rounded-xs">
            Total: {inquiries.length} consultas
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { id: 'ALL', label: 'Todas' },
          { id: 'new', label: 'Nuevas' },
          { id: 'contacted', label: 'Contactadas' },
          { id: 'quoted', label: 'Cotizadas' },
          { id: 'confirmed', label: 'Confirmadas' },
          { id: 'closed', label: 'Cerradas' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStatus(tab.id)}
            className={`px-3.5 py-1.5 rounded-xs border transition-colors cursor-pointer whitespace-nowrap ${
              selectedStatus === tab.id
                ? 'bg-espresso text-ivory border-espresso font-semibold'
                : 'bg-white text-text-muted border-border-warm hover:bg-ivory'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filtered.map((inq) => {
          const statusInfo = statusLabels[inq.status] || statusLabels.new;
          const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9]/g, '') : '';
          const whatsappUrl = cleanPhone
            ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `Hola ${inq.name}, un gusto saludarte de parte de Abancay De Boda. Recibimos tu consulta para la cobertura de ${inq.service}. ¿Podemos coordinar los detalles de tu fecha?`
              )}`
            : undefined;

          return (
            <div
              key={inq.id}
              className="bg-white rounded-xs border border-border-warm shadow-2xs p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 transition-colors hover:border-gold/40"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-bodoni text-xl text-espresso font-normal">
                    {inq.name}
                  </h3>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-2xs border ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                  <span className="px-2 py-0.5 bg-ivory text-[11px] text-espresso border border-border-warm rounded-2xs font-medium">
                    {inq.service}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                  {inq.phone && (
                    <span className="flex items-center gap-1">
                      <Phone size={13} className="text-gold" />
                      <span>{inq.phone}</span>
                    </span>
                  )}
                  {inq.date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-gold" />
                      <span>Fecha: {inq.date}</span>
                    </span>
                  )}
                  {inq.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-gold" />
                      <span>{inq.location}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-text-dim text-[11px]">
                    <Clock size={12} />
                    <span>{new Date(inq.createdAt).toLocaleString('es-PE')}</span>
                  </span>
                </div>

                {inq.message && (
                  <div className="p-3 bg-ivory/50 rounded-xs border border-border-warm text-xs text-espresso font-light leading-relaxed">
                    <p className="italic">"{inq.message}"</p>
                  </div>
                )}
              </div>

              {/* Status Selector & WhatsApp Response */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-border-warm">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full md:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors shadow-2xs"
                  >
                    <MessageCircle size={14} />
                    <span>Contactar por WhatsApp</span>
                  </a>
                )}

                <div className="flex items-center gap-2 w-full md:w-auto justify-between">
                  <select
                    value={inq.status}
                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                    className="px-2.5 py-1.5 bg-ivory border border-border-warm rounded-xs text-xs text-espresso font-medium focus:outline-none focus:border-gold"
                  >
                    <option value="new">Nueva</option>
                    <option value="contacted">Contactada</option>
                    <option value="quoted">Cotizada</option>
                    <option value="confirmed">Confirmada</option>
                    <option value="closed">Cerrada</option>
                  </select>

                  <button
                    onClick={() => setToDelete(inq)}
                    className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                    title="Eliminar consulta"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center bg-white border border-border-warm rounded-xs p-8">
          <Inbox size={32} className="mx-auto text-text-dim mb-3" />
          <h3 className="font-bodoni text-xl text-espresso mb-1">No hay consultas en esta categoría</h3>
          <p className="text-xs text-text-muted font-light">
            Las solicitudes enviadas desde la web pública se registran aquí en tiempo real.
          </p>
        </div>
      )}

      {/* Delete Modal */}
      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs">
          <div className="bg-white border border-border-warm rounded-xs shadow-xl max-w-sm w-full p-6 text-left">
            <h3 className="font-bodoni text-xl text-espresso mb-2">¿Eliminar esta consulta?</h3>
            <p className="text-xs text-text-muted mb-6 font-light">
              Vas a eliminar el registro de <strong>"{toDelete.name}"</strong>.
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
