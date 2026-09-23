/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PackageItem {
  id: string;
  title: string;
  price: string;
  duration: string;
  includes: string[];
  categoryKey: 'foto' | 'fotovideo' | 'fisica' | 'gold';
  highlight?: boolean;
  prebodaFree?: boolean;
  format: 'Digital' | 'Físico' | 'Digital & Físico';
  team?: string;
  description?: string;
}

export interface PackageCategoryGroup {
  key: 'foto' | 'fotovideo' | 'fisica' | 'gold';
  label: string;
  subtitle: string;
  items: PackageItem[];
}

export const PACKAGE_CATEGORIES: PackageCategoryGroup[] = [
  {
    key: "foto",
    label: "FOTOGRAFÍA",
    subtitle: "Cobertura fotográfica profesional con retoque editorial de autor",
    items: [
      {
        id: "pack-1",
        title: "Paquete I",
        price: "S/ 300",
        duration: "1 Hora",
        format: "Digital",
        categoryKey: "foto",
        description: "Ideal para sesiones civiles, retratos de novios o ceremonias íntimas.",
        includes: [
          "50 fotos retocadas en alta resolución",
          "Manual de guía de posado profesional",
          "Galería online privada con descarga ilimitada"
        ]
      },
      {
        id: "pack-2",
        title: "Paquete II",
        price: "S/ 400",
        duration: "2 Horas",
        format: "Digital",
        categoryKey: "foto",
        description: "Cobertura de ceremonia y sesión artística de pareja.",
        includes: [
          "100 fotos retocadas en alta resolución",
          "Manual de guía de posado profesional",
          "Galería online privada con descarga ilimitada"
        ]
      }
    ]
  },
  {
    key: "fotovideo",
    label: "FOTO + VIDEO",
    subtitle: "Cobertura integral digital: fotografía de autor y film cinematográfico",
    items: [
      {
        id: "pack-3",
        title: "Paquete III",
        price: "S/ 700",
        duration: "2 Horas",
        format: "Digital",
        categoryKey: "fotovideo",
        includes: [
          "100 fotos retocadas en alta resolución",
          "Video extendido de la boda",
          "Galería online con link de descarga a máxima calidad"
        ]
      },
      {
        id: "pack-4",
        title: "Paquete IV",
        price: "S/ 900",
        duration: "3 Horas",
        format: "Digital",
        categoryKey: "fotovideo",
        includes: [
          "200 fotos retocadas en alta resolución",
          "Video extendido de la boda",
          "Galería online con link de descarga a máxima calidad"
        ]
      },
      {
        id: "pack-5",
        title: "Paquete V",
        price: "S/ 1,200",
        duration: "4 Horas",
        format: "Digital",
        categoryKey: "fotovideo",
        includes: [
          "300 fotos retocadas en alta resolución",
          "Video extendido de la boda",
          "Galería online con link de descarga a máxima calidad"
        ]
      },
      {
        id: "pack-6",
        title: "Paquete VI",
        price: "S/ 1,600",
        duration: "5 Horas",
        format: "Digital",
        categoryKey: "fotovideo",
        includes: [
          "400 fotos retocadas en alta resolución",
          "Video extendido de la boda",
          "Video Reel cinematográfico para redes",
          "Galería online con link de descarga a máxima calidad"
        ]
      },
      {
        id: "pack-7",
        title: "Paquete VII",
        price: "S/ 1,900",
        duration: "6 Horas",
        format: "Digital",
        categoryKey: "fotovideo",
        includes: [
          "450 fotos retocadas en alta resolución",
          "Video extendido de la boda",
          "Video Reel cinematográfico",
          "Galería online con link de descarga a máxima calidad"
        ]
      },
      {
        id: "pack-8",
        title: "Paquete VIII",
        price: "S/ 2,500",
        duration: "8 Horas",
        format: "Digital",
        categoryKey: "fotovideo",
        highlight: true,
        prebodaFree: true,
        description: "Cobertura ideal desde preparativos de novia hasta la fiesta.",
        includes: [
          "600 fotos retocadas en alta resolución",
          "Video extendido de la boda",
          "Video Reel cinematográfico",
          "Galería online con link de descarga a máxima calidad",
          "Sesión Preboda GRATIS incluida"
        ]
      },
      {
        id: "pack-9",
        title: "Paquete IX",
        price: "S/ 2,800",
        duration: "10 Horas",
        format: "Digital",
        categoryKey: "fotovideo",
        highlight: true,
        prebodaFree: true,
        description: "Cobertura documental completa de principio a fin.",
        includes: [
          "800 fotos retocadas en alta resolución",
          "Video extendido de la boda",
          "Video Reel cinematográfico",
          "Galería digital de máxima calidad",
          "Sesión Preboda GRATIS incluida"
        ]
      }
    ]
  },
  {
    key: "fisica",
    label: "ENTREGA FÍSICA",
    subtitle: "Paquetes con Preboda de cortesía y recuerdos tangibles de alta gama",
    items: [
      {
        id: "pack-10",
        title: "Paquete X",
        price: "S/ 3,400",
        duration: "8 Horas",
        format: "Físico",
        categoryKey: "fisica",
        highlight: true,
        prebodaFree: true,
        description: "Desde preparativos hasta fiesta con piezas impresas exclusivas.",
        includes: [
          "600 a 700 fotos retocadas",
          "Video extendido de la boda",
          "Video Reel cinematográfico",
          "150 fotos impresas 10 x 15 cm",
          "Cuadro de firmas 52 x 68 cm",
          "Cajita de madera personalizada + USB de madera",
          "Sesión Preboda GRATIS incluida"
        ]
      },
      {
        id: "pack-11",
        title: "Paquete XI",
        price: "S/ 3,900",
        duration: "10 Horas",
        format: "Físico",
        categoryKey: "fisica",
        highlight: true,
        prebodaFree: true,
        description: "Colección física completa de recuerdos con doble cuadro de exhibición.",
        includes: [
          "800 a 900 fotos retocadas",
          "Video extendido de la boda",
          "Video Reel cinematográfico",
          "200 fotos impresas 10 x 15 cm",
          "Cuadro collage artístico",
          "Cuadro de firmas 52 x 68 cm",
          "Cajita de madera personalizada + USB",
          "Sesión Preboda GRATIS incluida"
        ]
      }
    ]
  },
  {
    key: "gold",
    label: "GOLD",
    subtitle: "Equipo cinematográfico integral (2 Fotógrafos + 2 Videógrafos)",
    items: [
      {
        id: "pack-12",
        title: "Paquete XII (Digital)",
        price: "S/ 4,500",
        duration: "8 Horas",
        format: "Digital",
        categoryKey: "gold",
        team: "2 Fotógrafos + 2 Videógrafos",
        prebodaFree: true,
        includes: [
          "Equipo completo: 2 Fotógrafos profesionales",
          "Equipo completo: 2 Videógrafos profesionales",
          "900 a + fotos retocadas",
          "Video extendido de la boda",
          "Video Reel cinematográfico",
          "Galería online de máxima resolución",
          "Sesión Preboda GRATIS incluida"
        ]
      },
      {
        id: "pack-13",
        title: "Paquete XIII (Digital)",
        price: "S/ 5,000",
        duration: "10 Horas",
        format: "Digital",
        categoryKey: "gold",
        team: "2 Fotógrafos + 2 Videógrafos",
        prebodaFree: true,
        includes: [
          "Equipo completo: 2 Fotógrafos profesionales",
          "Equipo completo: 2 Videógrafos profesionales",
          "1,000 a + fotos retocadas",
          "Video extendido de la boda",
          "Video Reel cinematográfico",
          "Galería online de máxima resolución",
          "Sesión Preboda GRATIS incluida"
        ]
      },
      {
        id: "pack-14",
        title: "Paquete XIV (Físico)",
        price: "S/ 5,500",
        duration: "8 Horas",
        format: "Físico",
        categoryKey: "gold",
        team: "2 Fotógrafos + 2 Videógrafos",
        prebodaFree: true,
        includes: [
          "Equipo completo: 2 Fotógrafos + 2 Videógrafos",
          "900 a + fotos retocadas",
          "Video extendido + Video Reel",
          "100 fotos impresas 10 x 15 cm",
          "Cuadro collage artístico",
          "Cuadro de firmas 52 x 68 cm",
          "Cajita de madera personalizada + USB",
          "Sesión Preboda GRATIS incluida"
        ]
      },
      {
        id: "pack-15",
        title: "Paquete XV (Físico)",
        price: "S/ 6,000",
        duration: "10 Horas",
        format: "Físico",
        categoryKey: "gold",
        highlight: true,
        team: "2 Fotógrafos + 2 Videógrafos",
        prebodaFree: true,
        description: "La experiencia de archivo definitivo: photobook editorial de lujo y doble cuadro.",
        includes: [
          "Equipo completo: 2 Fotógrafos + 2 Videógrafos",
          "1,000 a + fotos retocadas",
          "Video extendido de la boda + Video Reel",
          "Photobook Premium 20 x 30 cm de tapa dura",
          "100 fotos impresas 10 x 15 cm",
          "Cuadro collage artístico",
          "Cuadro de firmas 52 x 68 cm",
          "Cuadro 20 x 30 cm",
          "Cajita de madera personalizada + USB",
          "Sesión Preboda GRATIS incluida"
        ]
      }
    ]
  }
];

// Flat export of all original 15 packages grouped by category name for full backward-compatibility
export const PACKAGES = PACKAGE_CATEGORIES.map(group => ({
  category: group.label === 'GOLD' 
    ? 'Paquetes GOLD (2 Fotógrafos | 2 Videógrafos)' 
    : group.label === 'ENTREGA FÍSICA' 
    ? 'Fotografía | Video con Entrega Física' 
    : group.label === 'FOTO + VIDEO' 
    ? 'Fotografía | Video Profesional (Digital)' 
    : 'Fotografía Profesional',
  items: group.items
}));
