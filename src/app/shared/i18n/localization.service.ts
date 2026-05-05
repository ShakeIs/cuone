import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Injectable, inject, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';

export type Language = 'lt' | 'en';

type TranslationValue = string | TranslationDictionary;

interface TranslationDictionary {
  [key: string]: TranslationValue;
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

  private readonly storageKey = 'cuone.language';
  private readonly dictionaries = new Map<Language, TranslationDictionary>();

  readonly defaultLanguage: Language = 'lt';
  readonly availableLanguages: readonly Language[] = ['lt', 'en'];
  readonly language = signal<Language>(this.defaultLanguage);
  readonly translations = signal<TranslationDictionary>({});

  async init(): Promise<void> {
    const initialLanguage = this.getStoredLanguage() ?? this.defaultLanguage;
    await this.setLanguage(initialLanguage);
  }

  async setLanguage(language: Language): Promise<void> {
    const safeLanguage = this.isSupportedLanguage(language) ? language : this.defaultLanguage;

    if (!this.dictionaries.has(safeLanguage)) {
      const dictionary = await this.loadDictionary(safeLanguage);
      this.dictionaries.set(safeLanguage, dictionary);
    }

    this.language.set(safeLanguage);
    this.translations.set(this.dictionaries.get(safeLanguage) ?? {});
    this.document.documentElement.lang = safeLanguage;
    localStorage.setItem(this.storageKey, safeLanguage);
  }

  translate(key: string): string {
    this.language();

    const value = this.resolveKey(this.translations(), key);
    return typeof value === 'string' ? value : key;
  }

  private async loadDictionary(language: Language): Promise<TranslationDictionary> {
    const url = new URL(`public/i18n/${language}.json`, this.document.baseURI).toString();
    return firstValueFrom(this.http.get<TranslationDictionary>(url));
  }

  private getStoredLanguage(): Language | null {
    const storedLanguage = localStorage.getItem(this.storageKey);
    return this.isSupportedLanguage(storedLanguage) ? storedLanguage : null;
  }

  private isSupportedLanguage(language: string | null): language is Language {
    return language === 'lt' || language === 'en';
  }

  private resolveKey(dictionary: TranslationDictionary, key: string): TranslationValue | undefined {
    return key.split('.').reduce<TranslationValue | undefined>((current, part) => {
      if (!current || typeof current === 'string') {
        return undefined;
      }

      return current[part];
    }, dictionary);
  }
}
