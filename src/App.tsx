/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { 
  Camera, 
  Video, 
  Clock, 
  Check, 
  Instagram, 
  Facebook,
  MessageCircle, 
  MapPin, 
  CreditCard, 
  ChevronRight,
  Menu,
  X,
  Star,
  Award,
  Heart,
  Bot,
  Send
} from 'lucide-react';
import { STUDIO_INFO, PACKAGES, TERMS } from './data';

const WHATSAPP_BASE = `https://wa.me/${STUDIO_INFO.whatsapp.replace('+', '')}`;

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([{ role: 'model', text: "¡Hola! Soy el asistente virtual de Abancay De Boda. ¿Qué tipo de evento estás planeando y cómo puedo ayudarte a encontrar el paquete perfecto?"}]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: `Eres el asistente virtual experto del estudio fotográfico ${STUDIO_INFO.name}. Tu objetivo es ayudar al usuario a elegir el mejor paquete para su boda o evento de manera interactiva. Haz preguntas cortas para entender sus necesidades (presupuesto, cuántas horas, si quiere preboda, formato digital o físico).
Paquetes disponibles: ${JSON.stringify(PACKAGES)}
Cuando el usuario se decida por un paquete o quiera agendar, invítalo a hablar con un asesor humano enviándole este link exacto en formato Markdown para WhatsApp: [Agendar por WhatsApp](${WHATSAPP_BASE}?text=Hola,%20deseo%20información%20sobre%20el%20paquete%20elegido) y dile que reemplace "paquete elegido" con el nombre del paquete.
Sé amable, persuasivo y muy elegante en tu trato. Mantén un tono premium y cinematográfico.`
          }
        });
      } catch (e) {
        console.error("Failed to initialize chat", e);
      }
    }
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMessage}]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, {role: 'model', text: response.text}]);
    } catch (err) {
      setMessages(prev => [...prev, {role: 'model', text: "Lo siento, tuve un problema procesando tu mensaje. Por favor, contáctanos directamente a través de nuestro WhatsApp."}]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-10 left-10 z-[100] w-16 h-16 bg-bg-dark border border-primary-gold text-primary-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:scale-110 active:scale-95 transition-all group ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Bot size={32} className="group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-10 z-[100] w-[350px] h-[500px] max-h-[80vh] flex flex-col bg-surface-dark border border-border-gold shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-black border-b border-border-gold">
              <div className="flex items-center gap-3">
                <Bot className="text-primary-gold" size={24} />
                <span className="font-serif text-lg tracking-wide text-primary-gold">Asistente Virtual</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-dim hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 pb-0 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary-gold text-black rounded-tl-xl rounded-bl-xl rounded-tr-xl' 
                        : 'bg-white/5 border border-border-gold/30 text-text-main rounded-tl-xl rounded-tr-xl rounded-br-xl'
                    }`}
                    // Simplistic rendering of markdown links for WhatsApp
                    dangerouslySetInnerHTML={{
                      __html: msg.text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="underline font-bold hover:opacity-80">$1</a>')
                    }}
                  />
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 text-sm bg-white/5 border border-border-gold/30 text-text-dim rounded-tl-xl rounded-tr-xl rounded-br-xl flex gap-1">
                    <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-surface-dark border-t border-border-gold flex gap-3 mt-4">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-black text-text-main text-sm px-4 py-2 border border-border-gold/50 focus:outline-none focus:border-primary-gold rounded-sm"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-primary-gold text-black p-2 rounded-sm disabled:opacity-50 hover:brightness-110 transition-all"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-serif mb-4 text-text-main"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-primary-gold uppercase tracking-[0.2em] text-xs font-bold"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 40 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="h-px bg-primary-gold/40 mx-auto mt-6"
    />
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-bg-dark/90 backdrop-blur-md py-4 border-b border-border-gold' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {STUDIO_INFO.logo ? (
            <img src={STUDIO_INFO.logo} alt={STUDIO_INFO.name} className="h-10 md:h-12 w-auto object-contain rounded-sm" />
          ) : (
            <div className={`font-serif text-2xl tracking-tight transition-colors text-text-main`}>
              {STUDIO_INFO.name.split(' ')[0]}<span className="font-light text-primary-gold opacity-80">{STUDIO_INFO.name.split(' ').slice(1).join(' ')}</span>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {['Inicio', 'Nosotros', 'Servicios', 'Paquetes', 'Contacto'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-[10px] uppercase tracking-[3px] font-bold transition-colors hover:text-primary-gold text-text-dim`}
            >
              {item}
            </a>
          ))}
          <a 
            href={`${WHATSAPP_BASE}?text=Hola, deseo información sobre servicios fotográficos`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold-themed"
          >
            Contacto
          </a>
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden p-2 text-text-main"
        >
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-bg-dark z-[60] flex flex-col items-center justify-center space-y-8"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 p-2 text-text-main">
              <X size={32} />
            </button>
            {['Inicio', 'Nosotros', 'Servicios', 'Paquetes', 'Contacto'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-serif text-text-main hover:text-primary-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <div className="relative bg-bg-dark selection:bg-primary-gold selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop" 
            alt="Wedding Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-bg-dark/20 to-bg-dark" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-primary-gold uppercase tracking-[0.5em] text-[10px] font-black mb-6 block drop-shadow-md">
              {STUDIO_INFO.subtitle}
            </span>
            <h1 className="text-6xl md:text-8xl font-serif text-text-main mb-8 leading-tight tracking-tighter uppercase">
              {STUDIO_INFO.name}<br />
              <span className="italic font-light opacity-60 text-3xl md:text-5xl tracking-[0.3em] block mt-4">MATRIMONIOS</span>
            </h1>
            <p className="text-text-dim text-base md:text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
              Capturamos momentos únicos con estilo y calidad profesional. Especialistas en narrativa visual cinematográfica.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href="#paquetes"
                className="btn-gold-themed w-full md:w-auto min-w-[200px]"
              >
                VER PAQUETES
              </a>
              <a 
                href={`${WHATSAPP_BASE}?text=Hola, deseo información sobre servicios fotográficos`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-themed w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                AGENDAR SESIÓN
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-gold/40 flex flex-col items-center"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-black mb-2">Deslizar</span>
          <div className="w-[1px] h-10 bg-primary-gold/30" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-24 md:py-40 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-1 border border-border-gold"
            >
              <div className="aspect-3/4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000" 
                  alt="About Mayly"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-surface-dark border border-border-gold p-10 hidden lg:block max-w-[280px]">
                <p className="font-serif italic text-2xl text-primary-gold mb-4 leading-tight">"Inmortalizando la esencia de cada momento."</p>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-dim">— {STUDIO_INFO.name}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-gold uppercase tracking-[0.3em] text-[10px] font-black mb-6 block">Sobre la artista</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight text-text-main">
                {STUDIO_INFO.owner} <br />
                <span className="text-xl font-light text-text-dim block mt-4 tracking-widest italic opacity-80 underline decoration-primary-gold/30 underline-offset-8">Fotógrafa & Videógrafa Profesional</span>
              </h2>
              <p className="text-text-dim leading-relaxed text-lg mb-12 font-light">
                {STUDIO_INFO.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
                <div className="border-l border-primary-gold/20 pl-6">
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] mb-3 flex items-center gap-2 text-primary-gold">
                    <Heart size={14} /> ENFOQUE
                  </h4>
                  <p className="text-sm text-text-dim/80">Captura emocional con técnica de vanguardia.</p>
                </div>
                <div className="border-l border-primary-gold/20 pl-6">
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] mb-3 flex items-center gap-2 text-primary-gold">
                    <Award size={14} /> EXCELENCIA
                  </h4>
                  <p className="text-sm text-text-dim/80">Resultados visuales de nivel editorial y cinematográfico.</p>
                </div>
              </div>
              <a 
                href={STUDIO_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 text-text-main font-bold uppercase tracking-[0.3em] text-[10px] hover:text-primary-gold transition-colors group"
              >
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                EXPLORA NUESTRO PORTAFOLIO
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Especialidades">Servicios Profesionales</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "BODAS", desc: "Cobertura total desde los preparativos hasta la celebración.", icon: <Camera size={24} />, img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" },
              { title: "RETRATO", desc: "Sesiones personales, books y marca profesional.", icon: <Star size={24} />, img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800" },
              { title: "EVENTOS", desc: "15 años, celebraciones sociales y corporativos.", icon: <Video size={24} />, img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800" }
            ].map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden h-[600px] border border-border-gold/20 p-2"
              >
                <div className="w-full h-full overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale" />
                  <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-bg-dark/40 to-transparent" />
                  <div className="absolute inset-0 border border-white/10 m-4" />
                </div>
                <div className="absolute bottom-12 left-12 right-12 z-10 transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="text-primary-gold mb-6 border border-primary-gold/40 w-fit p-3 bg-bg-dark/80 backdrop-blur-sm">{service.icon}</div>
                  <h3 className="text-text-main text-3xl font-serif mb-4 tracking-tighter">{service.title}</h3>
                  <p className="text-text-dim text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="paquetes" className="py-32 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Curaduría">Inversión & Paquetes</SectionTitle>
          
          <div className="space-y-32">
            {PACKAGES.map((category, catIndex) => (
              <div key={category.category}>
                <h3 className="text-xl font-serif text-center mb-16 text-primary-gold tracking-[0.3em] uppercase">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((pkg, pkgIndex) => (
                    <motion.div 
                      key={pkg.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pkgIndex * 0.05 }}
                      className="tile group relative"
                    >
                      {pkg.includes.some(i => i.includes('GRATIS')) && (
                        <div className="absolute top-0 right-0 bg-primary-gold text-black text-[8px] font-black uppercase tracking-widest px-4 py-1.5 shadow-lg">
                          PREVIEW EXCLUSIVE
                        </div>
                      )}
                      
                      <div className="mb-10 pt-4">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-text-dim block mb-4 border-b border-border-gold pb-2 w-fit">
                          {pkg.duration} COBERTURA
                        </span>
                        <h4 className="text-3xl font-serif mb-4 tracking-tighter text-text-main">{pkg.title}</h4>
                        <div className="text-5xl font-serif font-light text-primary-gold flex items-baseline">
                          <span className="text-sm mr-2 opacity-60 font-sans font-bold">S/</span>
                          {pkg.price.replace('S/', '').replace('S/.', '')}
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-12 flex-grow">
                        {pkg.includes.map((incl, i) => (
                          <div key={i} className="flex items-start gap-4 text-[11px] font-medium tracking-wide text-text-dim border-b border-white/5 pb-3">
                            <span className="text-primary-gold font-bold italic">.</span>
                            <span>{incl}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 mt-auto">
                        <a 
                          href={`${WHATSAPP_BASE}?text=Hola, deseo información sobre el ${pkg.title} de ${pkg.duration}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-gold-themed w-full"
                        >
                          SOLICITAR COTIZACIÓN
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-wedding Section */}
      <section className="bg-surface-dark py-32 text-text-main border-y border-border-gold">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-primary-gold uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">Regalo Especial</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">Sesión Preboda</h2>
              <p className="text-text-dim mb-12 text-lg leading-relaxed font-light">
                Complementamos tu historia con una sesión íntima previa al gran día. Elige el escenario que mejor represente su esencia:
              </p>
              <div className="space-y-8">
                {STUDIO_INFO.preWeddingLocations.map((loc, i) => (
                  <motion.div 
                    key={loc} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-12 h-12 border border-border-gold flex items-center justify-center text-primary-gold font-serif italic text-lg transition-colors group-hover:bg-primary-gold group-hover:text-black">
                      {i+1}
                    </div>
                    <span className="text-2xl font-serif tracking-tight text-text-main group-hover:text-primary-gold transition-colors">{loc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 border border-primary-gold/20 -translate-x-6 translate-y-6" />
               <img 
                 src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1000" 
                 alt="Preboda" 
                 className="relative z-10 w-full aspect-square object-cover grayscale brightness-75 border border-border-gold"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-32 bg-bg-dark">
        <div className="max-w-5xl mx-auto px-6">
          <SectionTitle subtitle="Condiciones">Aspectos Operativos</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-20">
            {TERMS.map((term, i) => (
              <div key={i} className="flex items-start gap-5 group">
                <div className="w-6 h-6 shrink-0 border border-border-gold mt-1 flex items-center justify-center text-[10px] text-primary-gold font-black group-hover:bg-primary-gold group-hover:text-black transition-all">
                  {i+1}
                </div>
                <p className="text-xs text-text-dim leading-relaxed tracking-wide">{term}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-surface-dark border border-border-gold p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <CreditCard size={120} />
            </div>
            <h4 className="text-2xl font-serif mb-8 text-primary-gold tracking-tight border-b border-border-gold/30 pb-4 inline-block italic">Gestión de Reserva</h4>
            <p className="text-text-dim mb-10 leading-relaxed max-w-2xl font-light">
              La exclusividad de su fecha se garantiza con el **20%** del valor del paquete. <br />
              Personalización constante y entrega profesional garantizada en un plazo máximo de 30 días hábiles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-l border-primary-gold/40 pl-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 block mb-2">Titular de Cuenta</span>
                <p className="text-sm font-serif tracking-wide text-text-main">{STUDIO_INFO.owner}</p>
              </div>
              <div className="border-l border-primary-gold/40 pl-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 block mb-2">Canales de Pago</span>
                <p className="text-xs text-text-dim flex flex-wrap gap-x-4 gap-y-1">
                  <span>BCP: {STUDIO_INFO.paymentInfo.bcp.account}</span>
                  <span>YAPE: {STUDIO_INFO.paymentInfo.yape}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contacto" className="py-40 bg-black relative text-white overflow-hidden border-t border-border-gold/20">
        <div className="absolute inset-0 opacity-20 transition-opacity duration-1000 hover:opacity-40">
          <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Footer bg" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-serif mb-12 leading-tight tracking-tighter">
              ¿Creamos algo <br />
              <span className="italic font-light text-primary-gold opacity-80">eterno?</span>
            </h2>
            <p className="text-text-dim text-lg mb-16 max-w-xl mx-auto font-light tracking-wide">
              Escríbenos para conversar sobre tu visión. Estamos listos para capturar tu esencia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a 
                href={`${WHATSAPP_BASE}?text=Hola, deseo información sobre servicios fotográficos`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-themed min-w-[280px] shadow-2xl hover:-translate-y-1"
              >
                HABLAR POR WHATSAPP
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-bg-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="font-serif text-3xl tracking-tighter uppercase">
               {STUDIO_INFO.name.split(' ')[0]}<span className="text-primary-gold font-light">{STUDIO_INFO.name.split(' ').slice(1).join(' ')}</span>
            </div>
            <div className="order-3 md:order-2 text-text-dim text-[10px] uppercase tracking-[0.4em] font-black text-center md:text-left opacity-30">
              © 2026 {STUDIO_INFO.name} Photo. Narrativa Visual Cinematográfica.
            </div>
            <div className="order-2 md:order-3 flex items-center space-x-6">
              <a href={STUDIO_INFO.socials.facebook} target="_blank" rel="noreferrer" className="text-primary-gold hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href={STUDIO_INFO.socials.instagram} target="_blank" rel="noreferrer" className="text-primary-gold hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href={STUDIO_INFO.socials.tiktok} target="_blank" rel="noreferrer" className="text-primary-gold hover:text-white transition-colors">
                <div className="font-black text-xs">TIKTOK</div>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action WhatsApp */}
      <a 
        href={WHATSAPP_BASE}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-10 right-10 z-[100] w-16 h-16 bg-primary-gold text-black rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(197,160,89,0.3)] hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
      </a>

      <ChatAssistant />
    </div>
  );
}
