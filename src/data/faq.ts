/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: "Reserva y Pagos",
    question: "¿Con cuánto tiempo y porcentaje se reserva la fecha?",
    answer: "La fecha se separa formalmente con el 20% del valor del paquete elegido. El pago restante se cancela al iniciar el día de su boda. Toda la información queda debidamente estipulada en un contrato formal."
  },
  {
    category: "Tiempos de Entrega",
    question: "¿En cuánto tiempo entregan las fotografías y el video?",
    answer: "El plazo de entrega es de hasta 30 días después de la boda. Nos tomamos este tiempo para realizar una curaduría minuciosa, revelado digital de color, retoque de autor y edición cinematográfica de máxima calidad."
  },
  {
    category: "Formato de Entrega",
    question: "¿Cómo se realiza la entrega digital y física?",
    answer: "En los paquetes digitales, las fotos y videos se entregan a través de una Galería Online privada con link de descarga a máxima calidad. En los paquetes físicos, se incluye una cajita de madera personalizada con los nombres de los novios, la fecha y memoria USB en madera, además de las impresiones y cuadros según el paquete elegido."
  },
  {
    category: "Logística del Día de Boda",
    question: "¿A qué hora llega el equipo al evento?",
    answer: "Nuestro equipo llega entre 30 y 15 minutos antes de la hora programada para alistar cámaras, ópticas, audio e iluminación. Este tiempo previo de calibración técnica no cuenta dentro de las horas del paquete contratado."
  },
  {
    category: "Requerimientos Técnicos",
    question: "¿Qué facilidades técnicas requiere el equipo en la locación?",
    answer: "El equipo debe contar con un espacio seguro y adecuado para resguardar las maletas de equipo y accesorios, así como acceso a un tomacorriente para la carga continua de baterías."
  },
  {
    category: "Sesión Preboda",
    question: "¿Qué paquetes incluyen la sesión Preboda gratis?",
    answer: "La Preboda GRATIS está incluida a partir del Paquete VIII en adelante (paquetes de 8 y 10 horas, paquetes físicos y toda la línea GOLD). Es la oportunidad ideal para conocernos, habituarse a la cámara y tener fotografías artísticas previas al matrimonio."
  },
  {
    category: "Política de Cancelación",
    question: "¿Cuál es la política respecto a la reserva?",
    answer: "Por política del estudio y reserva exclusiva de agenda (impidiendo tomar otros compromisos para esa misma fecha), no se permite devolución de dinero una vez realizada la separación."
  },
  {
    category: "Cobertura de Anuario Escolar",
    question: "¿Cómo se cotizan los anuarios para promociones escolares?",
    answer: "Los anuarios se diseñan a medida según la cantidad de alumnos y el tipo de acabados (tapa dura, estuches, cantidad de páginas). Puedes solicitarnos una cotización personalizada directamente por WhatsApp."
  }
];
