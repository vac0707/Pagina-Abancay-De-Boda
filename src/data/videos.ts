/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VideoItem {
  id: string;
  title: string;
  category: 'bodas' | 'anuarios' | 'preboda' | 'sesiones' | 'eventos';
  duration: string;
  coupleOrSubject: string;
  location: string;
  thumbnail: string;
  youtubeId: string; // YouTube video ID
  description?: string;
}

export const VIDEOS: Record<'bodas' | 'anuarios' | 'preboda' | 'sesiones', VideoItem[]> = {
  bodas: [
    {
      id: "boda-film-1",
      title: "Promesa en las Alturas",
      category: "bodas",
      duration: "03:45 min",
      coupleOrSubject: "Camila & Álvaro",
      location: "Abancay, Apurímac",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      youtubeId: "5qap5aO4i9A", // Elegant wedding film reference
      description: "Film nupcial cinematográfico con votos íntimos y celebración al atardecer."
    },
    {
      id: "boda-film-2",
      title: "Luz de la Tarde",
      category: "bodas",
      duration: "04:12 min",
      coupleOrSubject: "Mariana & Sebastián",
      location: "Valle de Abancay",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
      youtubeId: "kJQP7kiw5Fk",
      description: "Atmósfera íntima capturada en película digital con estética atemporal."
    }
  ],
  anuarios: [
    {
      id: "anuario-film-1",
      title: "El Fin de una Etapa Inolvidable",
      category: "anuarios",
      duration: "02:50 min",
      coupleOrSubject: "Promoción 2026 - Colegio Emblemático",
      location: "Abancay",
      thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
      youtubeId: "dQw4w9WgXcQ",
      description: "Backstage y video documental de la sesión fotográfica de promoción."
    }
  ],
  preboda: [
    {
      id: "preboda-film-1",
      title: "Antes del Gran Día",
      category: "preboda",
      duration: "02:15 min",
      coupleOrSubject: "Valeria & Diego",
      location: "Locación Natural - Apurímac",
      thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200",
      youtubeId: "L_LUpnjgPso",
      description: "Sesión íntima previa al matrimonio en paisajes naturales andinos."
    }
  ],
  sesiones: [
    {
      id: "sesion-film-1",
      title: "Retrato Editorial de Autor",
      category: "sesiones",
      duration: "01:45 min",
      coupleOrSubject: "Sesión Artística",
      location: "Studio Abancay",
      thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
      youtubeId: "kJQP7kiw5Fk",
      description: "Exploración lumínica y estética editorial en retratos individuales."
    }
  ]
};
