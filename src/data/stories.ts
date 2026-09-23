/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RealStory {
  id: string;
  coupleOrProject: string;
  subtitle: string;
  location: string;
  year: string;
  coverImage: string;
  secondaryImage?: string;
  description: string;
  quote?: string;
  videoId?: string;
  details: string[];
}

export const REAL_STORIES: RealStory[] = [
  {
    id: "historia-camila-alvaro",
    coupleOrProject: "Camila & Álvaro",
    subtitle: "Matrimonio Religioso & Celebración Nupcial",
    location: "Valle de Abancay, Apurímac",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    description: "Una boda bañada por la luz cálida del valle interandino. Desde los preparativos matutinos en la intimidad familiar hasta una fiesta deslumbrante al caer la noche.",
    quote: "Queríamos fotos que al mirarlas dentro de cincuenta años nos devolvieran el pulso de ese día. Abancay De Boda logró exactamente eso.",
    videoId: "5qap5aO4i9A",
    details: ["10 Horas de Cobertura", "2 Fotógrafos + 2 Videógrafos", "Film Cinematográfico & Reel"]
  },
  {
    id: "historia-valeria-diego",
    coupleOrProject: "Valeria & Diego",
    subtitle: "Sesión Íntima de Preboda",
    location: "Locación Natural - Apurímac",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800",
    description: "Un encuentro previo al matrimonio donde el viento, los caminos altos y la complicidad de la pareja fueron los únicos protagonistas.",
    quote: "La preboda nos quitó todos los nervios frente a la cámara. Fue una tarde mágica que guardaremos siempre.",
    videoId: "L_LUpnjgPso",
    details: ["Sesión de Preboda al Atardecer", "Galería Digital de Autor"]
  },
  {
    id: "historia-promocion-2026",
    coupleOrProject: "Promoción Emblemática",
    subtitle: "Anuario Editorial & Retratos Individuales",
    location: "Abancay",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
    description: "Un proyecto editorial integral que plasmó el compañerismo, las metas y la identidad de cada alumno en una publicación de archivo de lujo.",
    quote: "Nuestros anuarios quedaron con un acabado de libro de arte. Todo el salón quedó fascinado.",
    videoId: "dQw4w9WgXcQ",
    details: ["Fotografía de Grupos & Retratos", "Diseño Editorial Exclusivo", "Acabados de Tapa Dura"]
  }
];
