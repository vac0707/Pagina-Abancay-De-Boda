/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Campaign {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  videoId?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  priority: number;  // higher number = higher priority
  ctaLabel: string;
  ctaUrl: string;
  category: 'anuarios' | 'bodas' | 'general' | 'sesiones';
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: "camp-promociones-2026",
    eyebrow: "TEMPORADA DE PROMOCIONES 2026 / 2027",
    title: "El último año se vive una sola vez. Haz que permanezca para siempre.",
    description: "Abancay De Boda abre convocatoria para anuarios escolares y sesiones de promoción. Fotografía editorial, diseño de anuario personalizado y acabados de lujo para conmemorar el cierre de una gran etapa.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
    videoId: "dQw4w9WgXcQ",
    startDate: "2026-08-01",
    endDate: "2026-12-31",
    priority: 10,
    ctaLabel: "CONOCER ANUARIOS",
    ctaUrl: "#anuarios",
    category: "anuarios"
  },
  {
    id: "camp-bodas-2027",
    eyebrow: "AGENDA ABIERTA 2026 / 2027",
    title: "Asegura la fecha de tu matrimonio con anticipación",
    description: "Cada temporada aceptamos un número limitado de bodas para garantizar una dedicación íntima y artesanal a cada film y galería. Consulta la disponibilidad de tu fecha.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1600",
    videoId: "5qap5aO4i9A",
    startDate: "2026-01-01",
    endDate: "2026-07-31",
    priority: 5,
    ctaLabel: "EXPLORAR BODAS",
    ctaUrl: "#bodas",
    category: "bodas"
  }
];

export const FALLBACK_CAMPAIGN: Campaign = {
  id: "camp-general",
  eyebrow: "ESTUDIO FOTOGRÁFICO & FILM CINEMATOGRÁFICO",
  title: "Historias que merecen trascender en el tiempo",
  description: "Custodiamos la emoción de tu matrimonio, la alegría de tu promoción escolar y tus momentos más preciados en Abancay y todo el Perú.",
  image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600",
  startDate: "2020-01-01",
  endDate: "2099-12-31",
  priority: 1,
  ctaLabel: "RESERVAR FECHA",
  ctaUrl: "https://wa.me/51932350348?text=Hola,%20deseo%20consultar%20disponibilidad%20de%20fecha",
  category: "general"
};

/**
 * Resolves active campaign based on the current date and priority.
 */
export function getActiveCampaign(currentDate: Date = new Date()): Campaign {
  const dateStr = currentDate.toISOString().split('T')[0];

  const activeCampaigns = CAMPAIGNS.filter(camp => {
    return dateStr >= camp.startDate && dateStr <= camp.endDate;
  });

  if (activeCampaigns.length === 0) {
    return FALLBACK_CAMPAIGN;
  }

  // Sort descending by priority
  activeCampaigns.sort((a, b) => b.priority - a.priority);
  return activeCampaigns[0];
}
