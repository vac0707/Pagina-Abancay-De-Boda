/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  event: string;
  year: string;
  location: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    quote: "Ver el video y las fotos nos hizo llorar de emoción. Captaron miradas de nuestros abuelos y detalles que nosotros entre la vorágine de la fiesta no pudimos ver. Un trabajo artístico de primer nivel.",
    author: "Camila & Álvaro",
    event: "Matrimonio Nupcial",
    year: "2026",
    location: "Abancay"
  },
  {
    id: "test-2",
    quote: "La preboda fue la mejor decisión que tomamos. El trato de Gustavo y su equipo nos dio una confianza absoluta. Cuando llegó el día de la boda todo fluyó con total naturalidad.",
    author: "Valeria & Diego",
    event: "Preboda & Boda",
    year: "2026",
    location: "Apurímac"
  },
  {
    id: "test-3",
    quote: "El anuario de la promoción quedó como un libro de colección. Los padres de familia y los chicos quedamos maravillados con la nitidez y el diseño de cada página.",
    author: "Comité de Promoción 2026",
    event: "Anuario Escolar",
    year: "2026",
    location: "Abancay"
  }
];
