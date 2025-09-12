"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import translations from '@/lib/translations.json';

type Language = 'en' | 'kn';

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>('en');

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    updateText(lang);
    updateLogo(lang);
  };

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

  useEffect(() => {
    handleLanguageChange('en');
  }, []);

  return (
    <div className="flex gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        onClick={() => handleLanguageChange('en')}
      >
        English
      </Button>
      <Button
        variant={language === 'kn' ? 'default' : 'outline'}
        onClick={() => handleLanguageChange('kn')}
      >
        ಕನ್ನಡ
      </Button>
    </div>
  );
}
