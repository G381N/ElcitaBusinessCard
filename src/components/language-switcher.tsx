"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import translations from '@/lib/translations.json';
import { motion, AnimatePresence } from 'framer-motion';

type Language = 'en' | 'kn';

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>('en');

  const handleLanguageChange = () => {
    const newLang = language === 'en' ? 'kn' : 'en';
    setLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    const updateText = (lang: Language) => {
      const elementsToTranslate = document.querySelectorAll('[data-translate-key]');
      elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate-key') as keyof typeof translations.en;
        if (key && translations[lang] && translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      });

      const companyNameEn = document.getElementById('company-name-en');
      const companyNameKn = document.getElementById('company-name-kn');
      if (companyNameEn && companyNameKn) {
          companyNameEn.textContent = translations['en']['companyName'];
          companyNameKn.textContent = translations['kn']['companyName'];
      }
    };

    const updateLogo = (lang: Language) => {
      const enLogo = document.getElementById('company-logo-en');
      const knLogo = document.getElementById('company-logo-kn');
      if (enLogo && knLogo) {
        if (lang === 'kn') {
          enLogo.classList.add('hidden');
          knLogo.classList.remove('hidden');
        } else {
          enLogo.classList.remove('hidden');
          knLogo.classList.add('hidden');
        }
      }
    };

    updateText(language);
    updateLogo(language);
  }, [language]);

  return (
    <div className="relative w-16 h-7 md:w-20 md:h-8">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={language}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Button
            variant="outline"
            onClick={handleLanguageChange}
            className="w-full h-full text-xs px-1 py-0.5 md:px-2 md:py-1 font-medium shadow-sm hover:shadow-md transition-all duration-200 border-primary/20 hover:border-primary/40"
            size="sm"
          >
            {language === 'en' ? 'ಕನ್ನಡ' : 'EN'}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
