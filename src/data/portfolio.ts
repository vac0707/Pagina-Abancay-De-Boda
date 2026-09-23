/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: 'BODAS' | 'QUINCEAÑOS' | 'CUMPLEAÑOS' | '50-ANOS' | 'BAUTIZOS' | 'ANUARIOS' | 'SESIONES' | 'EVENTOS';
  categoryLabel: string;
  location: string;
  aspect: 'vertical' | 'horizontal' | 'square';
  image: string;
  year: string;
  storySlug?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "port-1",
    slug: "votos-en-la-catedral",
    title: "Votos en la Catedral",
    category: "BODAS",
    categoryLabel: "Bodas",
    location: "Abancay",
    aspect: "vertical",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=900",
    year: "2026",
    storySlug: "historia-camila-alvaro"
  },
  {
    id: "port-2",
    slug: "atardecer-en-el-valle",
    title: "Atardecer en el Valle",
    category: "SESIONES",
    categoryLabel: "Sesiones",
    location: "Apurímac",
    aspect: "horizontal",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    year: "2026",
    storySlug: "historia-valeria-diego"
  },
  {
    id: "port-3",
    slug: "generacion-2026",
    title: "Generación 2026",
    category: "ANUARIOS",
    categoryLabel: "Anuarios",
    location: "Abancay",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=900",
    year: "2026",
    storySlug: "historia-promocion-2026"
  },
  {
    id: "port-4",
    slug: "quince-primaveras-editorial",
    title: "Retrato de Quince Años",
    category: "QUINCEAÑOS",
    categoryLabel: "Quinceaños",
    location: "Abancay",
    aspect: "vertical",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900",
    year: "2026"
  },
  {
    id: "port-5",
    slug: "medio-siglo-de-vida",
    title: "Celebración de 50 Años",
    category: "50-ANOS",
    categoryLabel: "50 Años",
    location: "Abancay",
    aspect: "horizontal",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    year: "2026"
  },
  {
    id: "port-6",
    slug: "bautismo-en-la-parroquia",
    title: "Ceremonia de Bautizo",
    category: "BAUTIZOS",
    categoryLabel: "Bautizos",
    location: "Sagrario Abancay",
    aspect: "vertical",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=900",
    year: "2026"
  },
  {
    id: "port-7",
    slug: "fiesta-de-cumpleanos-familiar",
    title: "Cumpleaños Especial",
    category: "CUMPLEAÑOS",
    categoryLabel: "Cumpleaños",
    location: "Abancay",
    aspect: "horizontal",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200",
    year: "2025"
  },
  {
    id: "port-8",
    slug: "gala-y-aniversario-institucional",
    title: "Gala & Evento Social",
    category: "EVENTOS",
    categoryLabel: "Eventos",
    location: "Apurímac",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=900",
    year: "2025"
  },
  {
    id: "port-9",
    slug: "retrato-nupcial-editorial",
    title: "Retrato Nupcial Editorial",
    category: "BODAS",
    categoryLabel: "Bodas",
    location: "Abancay",
    aspect: "vertical",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=900",
    year: "2026"
  },
  {
    id: "port-10",
    slug: "sesion-preboda-atardecer",
    title: "Caminata de Promesa",
    category: "SESIONES",
    categoryLabel: "Sesiones",
    location: "Locación Natural",
    aspect: "vertical",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=900",
    year: "2025"
  },
  {
    id: "port-11",
    slug: "la-salida-de-los-novios",
    title: "La Salida de los Novios",
    category: "BODAS",
    categoryLabel: "Bodas",
    location: "Abancay",
    aspect: "horizontal",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
    year: "2025"
  },
  {
    id: "port-12",
    slug: "fiesta-de-quince-anos-valse",
    title: "Vals de los Quince Años",
    category: "QUINCEAÑOS",
    categoryLabel: "Quinceaños",
    location: "Abancay",
    aspect: "horizontal",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200",
    year: "2026"
  }
];
