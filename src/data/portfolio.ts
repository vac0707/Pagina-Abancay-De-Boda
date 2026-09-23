/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'BODAS' | 'PREBODAS' | 'ANUARIOS' | 'SESIONES' | 'EVENTOS';
  categoryLabel: string;
  location: string;
  aspect: 'vertical' | 'horizontal' | 'square';
  image: string;
  year: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Votos en la Catedral",
    category: "BODAS",
    categoryLabel: "Bodas",
    location: "Abancay",
    aspect: "vertical",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=900",
    year: "2026"
  },
  {
    id: "port-2",
    title: "Atardecer en el Valle",
    category: "PREBODAS",
    categoryLabel: "Prebodas",
    location: "Apurímac",
    aspect: "horizontal",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    year: "2026"
  },
  {
    id: "port-3",
    title: "Generación 2026",
    category: "ANUARIOS",
    categoryLabel: "Anuarios",
    location: "Abancay",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=900",
    year: "2026"
  },
  {
    id: "port-4",
    title: "Retrato Nupcial Editorial",
    category: "BODAS",
    categoryLabel: "Bodas",
    location: "Abancay",
    aspect: "vertical",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=900",
    year: "2026"
  },
  {
    id: "port-5",
    title: "Luz Íntima",
    category: "SESIONES",
    categoryLabel: "Sesiones",
    location: "Studio Abancay",
    aspect: "vertical",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900",
    year: "2026"
  },
  {
    id: "port-6",
    title: "Celebración de Quince Años",
    category: "EVENTOS",
    categoryLabel: "Eventos",
    location: "Abancay",
    aspect: "horizontal",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200",
    year: "2025"
  },
  {
    id: "port-7",
    title: "Caminata de Promesa",
    category: "PREBODAS",
    categoryLabel: "Prebodas",
    location: "Locación Natural",
    aspect: "vertical",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=900",
    year: "2025"
  },
  {
    id: "port-8",
    title: "La Salida de los Novios",
    category: "BODAS",
    categoryLabel: "Bodas",
    location: "Abancay",
    aspect: "horizontal",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    year: "2025"
  }
];
