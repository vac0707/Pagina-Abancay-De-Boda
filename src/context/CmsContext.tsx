/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { STUDIO_INFO } from '../data/studio';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/portfolio';
import { REAL_STORIES, RealStory } from '../data/stories';
import { TESTIMONIALS, TestimonialItem } from '../data/testimonials';
import { FAQ_ITEMS, FAQItem } from '../data/faq';
import { PACKAGE_CATEGORIES } from '../data/packages';

export type StudioInfo = typeof STUDIO_INFO & {
  founder?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsappDefaultMessage?: string;
  showFloatingWhatsapp?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
};

export interface CmsPortfolioItem extends PortfolioItem {
  description?: string;
  featured?: boolean;
  status?: 'published' | 'draft' | 'hidden';
  focalPoint?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  videoUrl?: string;
  order?: number;
}

export interface CmsStory extends RealStory {
  status?: 'published' | 'draft' | 'hidden';
  blocks?: any[];
}

export interface CmsPackage {
  id: string;
  name: string;
  category: string;
  price: string;
  pricePrefix?: string;
  description: string;
  features: string[];
  featured: boolean;
  status: 'published' | 'draft' | 'hidden';
  order: number;
}

export interface CmsTestimonial extends TestimonialItem {
  status: 'published' | 'draft' | 'hidden';
  order: number;
  showOnHome?: boolean;
  photo?: string;
}

export interface CmsFaq extends FAQItem {
  id: string;
  status: 'published' | 'draft' | 'hidden';
  order: number;
}

export interface CmsMedia {
  id: string;
  url: string;
  title: string;
  altText: string;
  category: string;
  focalPoint?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  width?: number;
  height?: number;
  createdAt: string;
}

export interface CmsInquiry {
  id: string;
  name: string;
  service: string;
  date?: string;
  location?: string;
  phone?: string;
  message?: string;
  status: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'closed';
  createdAt: string;
}

export interface PageSectionData {
  [key: string]: any;
}

interface CmsContextType {
  settings: StudioInfo;
  portfolio: CmsPortfolioItem[];
  stories: CmsStory[];
  packages: CmsPackage[];
  testimonials: CmsTestimonial[];
  faqs: CmsFaq[];
  media: CmsMedia[];
  inquiries: CmsInquiry[];
  pagesContent: Record<string, PageSectionData>;
  loading: boolean;
  // Methods
  updateSettings: (newSettings: Partial<StudioInfo>) => Promise<void>;
  updatePageContent: (pageKey: string, data: PageSectionData) => Promise<void>;
  savePortfolioItem: (item: Partial<CmsPortfolioItem>) => Promise<void>;
  deletePortfolioItem: (id: string) => Promise<void>;
  saveStory: (story: Partial<CmsStory>) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;
  savePackage: (pkg: Partial<CmsPackage>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  saveTestimonial: (t: Partial<CmsTestimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  saveFaq: (faq: Partial<CmsFaq>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  saveMediaItem: (item: Partial<CmsMedia>) => Promise<void>;
  deleteMediaItem: (id: string) => Promise<void>;
  submitInquiry: (inquiry: Omit<CmsInquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: CmsInquiry['status']) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<StudioInfo>({
    ...STUDIO_INFO,
    founder: STUDIO_INFO.owner,
    phone: '+51932350348',
    email: 'contacto@abancaydeboda.pe',
    address: 'Abancay Centro',
    whatsappDefaultMessage: 'Hola, deseo consultar disponibilidad y paquetes con Abancay De Boda.',
    showFloatingWhatsapp: true,
  });

  const initialPortfolio: CmsPortfolioItem[] = PORTFOLIO_ITEMS.map((item, idx) => ({
    ...item,
    description: `Registro fotográfico en ${item.location}.`,
    featured: idx < 3,
    status: 'published',
    order: idx + 1,
  }));
  const [portfolio, setPortfolio] = useState<CmsPortfolioItem[]>(initialPortfolio);

  const initialStories: CmsStory[] = REAL_STORIES.map(s => ({
    ...s,
    status: 'published',
    blocks: []
  }));
  const [stories, setStories] = useState<CmsStory[]>(initialStories);
  
  // Transform initial studio packages into CMS packages
  const initialPackages: CmsPackage[] = PACKAGE_CATEGORIES.flatMap((group, gIdx) =>
    group.items.map((p, idx) => ({
      id: p.id,
      name: `${p.title} (${group.label})`,
      category: 'Bodas',
      price: p.price,
      pricePrefix: 'Inversión',
      description: p.description || `${p.duration} de cobertura - Formato ${p.format}`,
      features: p.includes,
      featured: p.highlight || false,
      status: 'published',
      order: gIdx * 10 + idx + 1
    }))
  );
  const [packages, setPackages] = useState<CmsPackage[]>(initialPackages);

  // Transform initial testimonials
  const initialTestimonials: CmsTestimonial[] = TESTIMONIALS.map((t, idx) => ({
    ...t,
    status: 'published',
    order: idx + 1,
    showOnHome: idx === 0,
    photo: idx === 0 ? 'https://res.cloudinary.com/dcnynnstm/image/upload/v1777088528/DSC04178_wuvhvd.jpg' : undefined
  }));
  const [testimonials, setTestimonials] = useState<CmsTestimonial[]>(initialTestimonials);

  // Transform initial FAQs
  const initialFaqs: CmsFaq[] = FAQ_ITEMS.map((f, idx) => ({
    ...f,
    id: `faq-${idx + 1}`,
    status: 'published',
    order: idx + 1
  }));
  const [faqs, setFaqs] = useState<CmsFaq[]>(initialFaqs);

  // Initial media library seeded from existing portfolio and stories images
  const initialMedia: CmsMedia[] = PORTFOLIO_ITEMS.map((p) => ({
    id: `med-${p.id}`,
    url: p.image,
    title: p.title,
    altText: p.title,
    category: p.categoryLabel || 'General',
    focalPoint: 'center',
    createdAt: new Date().toISOString()
  }));
  const [media, setMedia] = useState<CmsMedia[]>(initialMedia);
  const [inquiries, setInquiries] = useState<CmsInquiry[]>([]);
  const [pagesContent, setPagesContent] = useState<Record<string, PageSectionData>>({});
  const [loading, setLoading] = useState(true);

  // Real-time Firestore Listeners
  useEffect(() => {
    // 1. Settings listener
    const unsubSettings = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(prev => ({ ...prev, ...(docSnap.data() as Partial<StudioInfo>) }));
      }
    }, (err) => {
      console.warn('Could not load settings from Firestore, using default:', err.message);
    });

    // 2. Portfolio listener
    const unsubPortfolio = onSnapshot(collection(db, 'portfolio'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CmsPortfolioItem));
        items.sort((a, b) => ((a as any).order || 99) - ((b as any).order || 99));
        setPortfolio(items);
      }
    }, (err) => console.warn('Portfolio snapshot fallback:', err.message));

    // 3. Stories listener
    const unsubStories = onSnapshot(collection(db, 'stories'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CmsStory));
        setStories(items);
      }
    }, (err) => console.warn('Stories snapshot fallback:', err.message));

    // 4. Packages listener
    const unsubPackages = onSnapshot(collection(db, 'packages'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CmsPackage));
        items.sort((a, b) => a.order - b.order);
        setPackages(items);
      }
    }, (err) => console.warn('Packages snapshot fallback:', err.message));

    // 5. Testimonials listener
    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CmsTestimonial));
        items.sort((a, b) => a.order - b.order);
        setTestimonials(items);
      }
    }, (err) => console.warn('Testimonials snapshot fallback:', err.message));

    // 6. FAQs listener
    const unsubFaqs = onSnapshot(collection(db, 'faq'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CmsFaq));
        items.sort((a, b) => a.order - b.order);
        setFaqs(items);
      }
    }, (err) => console.warn('FAQ snapshot fallback:', err.message));

    // 7. Media listener
    const unsubMedia = onSnapshot(collection(db, 'media'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CmsMedia));
        setMedia(items);
      }
    }, (err) => console.warn('Media snapshot fallback:', err.message));

    // 8. Inquiries listener
    const unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CmsInquiry));
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setInquiries(items);
      }
    }, (err) => console.warn('Inquiries snapshot fallback:', err.message));

    // 9. Pages content listener
    const unsubPages = onSnapshot(collection(db, 'pages'), (snapshot) => {
      if (!snapshot.empty) {
        const pagesMap: Record<string, PageSectionData> = {};
        snapshot.docs.forEach(d => {
          pagesMap[d.id] = d.data();
        });
        setPagesContent(pagesMap);
      }
      setLoading(false);
    }, (err) => {
      console.warn('Pages snapshot fallback:', err.message);
      setLoading(false);
    });

    return () => {
      unsubSettings();
      unsubPortfolio();
      unsubStories();
      unsubPackages();
      unsubTestimonials();
      unsubFaqs();
      unsubMedia();
      unsubInquiries();
      unsubPages();
    };
  }, []);

  // CRUD Mutations
  const updateSettings = async (newSettings: Partial<StudioInfo>) => {
    try {
      const merged = { ...settings, ...newSettings, updatedAt: new Date().toISOString() };
      setSettings(merged);
      await setDoc(doc(db, 'settings', 'general'), merged, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/general');
    }
  };

  const updatePageContent = async (pageKey: string, data: PageSectionData) => {
    try {
      setPagesContent(prev => ({ ...prev, [pageKey]: data }));
      await setDoc(doc(db, 'pages', pageKey), { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `pages/${pageKey}`);
    }
  };

  const savePortfolioItem = async (item: Partial<CmsPortfolioItem>) => {
    try {
      const id = item.id || `work-${Date.now()}`;
      const payload: CmsPortfolioItem = {
        id,
        slug: item.slug || id,
        title: item.title || 'Nuevo Trabajo',
        category: item.category || 'BODAS',
        categoryLabel: item.categoryLabel || 'Bodas',
        location: item.location || 'Abancay, Apurímac',
        aspect: item.aspect || 'square',
        image: item.image || '',
        year: item.year || '2025',
        description: item.description || '',
        featured: item.featured || false,
        status: item.status || 'published',
        order: item.order || portfolio.length + 1,
        focalPoint: item.focalPoint || 'center',
        videoUrl: item.videoUrl || '',
      };
      setPortfolio(prev => {
        const filtered = prev.filter(p => p.id !== id);
        return [...filtered, payload];
      });
      await setDoc(doc(db, 'portfolio', id), payload, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'portfolio');
    }
  };

  const deletePortfolioItem = async (id: string) => {
    try {
      setPortfolio(prev => prev.filter(p => p.id !== id));
      await deleteDoc(doc(db, 'portfolio', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `portfolio/${id}`);
    }
  };

  const saveStory = async (story: Partial<CmsStory>) => {
    try {
      const id = story.id || (story.coupleOrProject ? story.coupleOrProject.toLowerCase().replace(/\s+/g, '-') : `story-${Date.now()}`);
      const payload: CmsStory = {
        id,
        coupleOrProject: story.coupleOrProject || 'Historia',
        subtitle: story.subtitle || '',
        location: story.location || 'Abancay, Apurímac',
        year: story.year || '2025',
        coverImage: story.coverImage || '',
        secondaryImage: story.secondaryImage,
        description: story.description || '',
        quote: story.quote,
        videoId: story.videoId,
        details: story.details || ['Cobertura completa'],
        status: story.status || 'published',
        blocks: story.blocks || [],
      };
      setStories(prev => {
        const filtered = prev.filter(s => s.id !== id);
        return [...filtered, payload];
      });
      await setDoc(doc(db, 'stories', id), payload, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'stories');
    }
  };

  const deleteStory = async (id: string) => {
    try {
      setStories(prev => prev.filter(s => s.id !== id));
      await deleteDoc(doc(db, 'stories', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `stories/${id}`);
    }
  };

  const savePackage = async (pkg: Partial<CmsPackage>) => {
    try {
      const id = pkg.id || `pkg-${Date.now()}`;
      const payload: CmsPackage = {
        id,
        name: pkg.name || 'Paquete',
        category: pkg.category || 'Bodas',
        price: pkg.price || 'Consultar',
        pricePrefix: pkg.pricePrefix || 'Inversión',
        description: pkg.description || '',
        features: pkg.features || [],
        featured: pkg.featured || false,
        status: pkg.status || 'published',
        order: pkg.order || packages.length + 1,
      };
      setPackages(prev => {
        const filtered = prev.filter(p => p.id !== id);
        return [...filtered, payload];
      });
      await setDoc(doc(db, 'packages', id), payload, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'packages');
    }
  };

  const deletePackage = async (id: string) => {
    try {
      setPackages(prev => prev.filter(p => p.id !== id));
      await deleteDoc(doc(db, 'packages', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `packages/${id}`);
    }
  };

  const saveTestimonial = async (t: Partial<CmsTestimonial>) => {
    try {
      const id = t.id || `test-${Date.now()}`;
      const payload: CmsTestimonial = {
        id,
        author: t.author || 'Cliente',
        quote: t.quote || '',
        event: t.event || 'Celebración',
        location: t.location || 'Abancay',
        year: t.year || '2025',
        photo: t.photo,
        showOnHome: t.showOnHome || false,
        status: t.status || 'published',
        order: t.order || testimonials.length + 1,
      };
      setTestimonials(prev => {
        const filtered = prev.filter(item => item.id !== id);
        return [...filtered, payload];
      });
      await setDoc(doc(db, 'testimonials', id), payload, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'testimonials');
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `testimonials/${id}`);
    }
  };

  const saveFaq = async (faq: Partial<CmsFaq>) => {
    try {
      const id = faq.id || `faq-${Date.now()}`;
      const payload: CmsFaq = {
        id,
        question: faq.question || '',
        answer: faq.answer || '',
        category: faq.category || 'General',
        status: faq.status || 'published',
        order: faq.order || faqs.length + 1,
      };
      setFaqs(prev => {
        const filtered = prev.filter(item => item.id !== id);
        return [...filtered, payload];
      });
      await setDoc(doc(db, 'faq', id), payload, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'faq');
    }
  };

  const deleteFaq = async (id: string) => {
    try {
      setFaqs(prev => prev.filter(f => f.id !== id));
      await deleteDoc(doc(db, 'faq', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `faq/${id}`);
    }
  };

  const saveMediaItem = async (item: Partial<CmsMedia>) => {
    try {
      const id = item.id || `med-${Date.now()}`;
      const payload: CmsMedia = {
        id,
        url: item.url || '',
        title: item.title || 'Foto',
        altText: item.altText || item.title || 'Foto',
        category: item.category || 'General',
        focalPoint: item.focalPoint || 'center',
        createdAt: item.createdAt || new Date().toISOString()
      };
      setMedia(prev => [payload, ...prev.filter(m => m.id !== id)]);
      await setDoc(doc(db, 'media', id), payload, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'media');
    }
  };

  const deleteMediaItem = async (id: string) => {
    try {
      setMedia(prev => prev.filter(m => m.id !== id));
      await deleteDoc(doc(db, 'media', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `media/${id}`);
    }
  };

  const submitInquiry = async (inquiry: Omit<CmsInquiry, 'id' | 'createdAt' | 'status'>) => {
    try {
      const id = `inq-${Date.now()}`;
      const payload: CmsInquiry = {
        ...inquiry,
        id,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      setInquiries(prev => [payload, ...prev]);
      await setDoc(doc(db, 'inquiries', id), payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'inquiries');
    }
  };

  const updateInquiryStatus = async (id: string, status: CmsInquiry['status']) => {
    try {
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
      await setDoc(doc(db, 'inquiries', id), { status }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `inquiries/${id}`);
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `inquiries/${id}`);
    }
  };

  return (
    <CmsContext.Provider
      value={{
        settings,
        portfolio,
        stories,
        packages,
        testimonials,
        faqs,
        media,
        inquiries,
        pagesContent,
        loading,
        updateSettings,
        updatePageContent,
        savePortfolioItem,
        deletePortfolioItem,
        saveStory,
        deleteStory,
        savePackage,
        deletePackage,
        saveTestimonial,
        deleteTestimonial,
        saveFaq,
        deleteFaq,
        saveMediaItem,
        deleteMediaItem,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
