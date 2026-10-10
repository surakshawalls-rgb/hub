import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import type { PluginListenerHandle } from '@capacitor/core';
import {
  APPLICATIONS,
  APPLICATION_CATEGORIES,
  ApplicationCategory,
  HubApplication
} from './core/application-directory';
import { isSafeDestination } from './core/platform-navigation';

type DashboardView = 'home' | 'applications' | 'favorites' | 'about';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  readonly applications = APPLICATIONS;
  readonly categories = APPLICATION_CATEGORIES;
  readonly frequentIds = ['tools', 'worklog', 'suraksha-software', 'dandaata'];

  view: DashboardView = 'home';
  selectedCategory: ApplicationCategory | null = null;
  searchQuery = '';
  mobileMenuOpen = false;
  favorites = new Set<string>();
  recentIds: string[] = [];
  message = '';
  private backButtonListener?: PluginListenerHandle;

  ngOnInit(): void {
    this.restorePreferences();
    if (Capacitor.isNativePlatform()) {
      void this.registerAndroidBackButton();
    }
  }

  ngOnDestroy(): void {
    void this.backButtonListener?.remove();
  }

  get visibleApplications(): HubApplication[] {
    const query = this.searchQuery.trim().toLocaleLowerCase();

    return this.applications.filter((application) => {
      const matchesView = this.view !== 'favorites' || this.favorites.has(application.id);
      const matchesCategory = !this.selectedCategory || application.category === this.selectedCategory;
      const matchesSearch =
        !query ||
        `${application.name} ${application.category} ${application.description} ${application.businessName ?? ''}`
          .toLocaleLowerCase()
          .includes(query);

      return matchesView && matchesCategory && matchesSearch;
    });
  }

  get favoriteApplications(): HubApplication[] {
    return this.applications.filter((application) => this.favorites.has(application.id));
  }

  get recentApplications(): HubApplication[] {
    return this.recentIds
      .map((id) => this.applications.find((application) => application.id === id))
      .filter((application): application is HubApplication => application !== undefined);
  }

  get frequentApplications(): HubApplication[] {
    return this.frequentIds
      .map((id) => this.applications.find((application) => application.id === id))
      .filter((application): application is HubApplication => application !== undefined);
  }

  categoryCount(category: ApplicationCategory): number {
    return this.applications.filter((application) => application.category === category).length;
  }

  get pageTitle(): string {
    if (this.view === 'about') return 'About Suraksha Hub';
    if (this.view === 'favorites') return 'Your favourites';
    if (this.selectedCategory) return this.selectedCategory;
    if (this.view === 'applications') return 'All applications';
    return 'Home';
  }

  showHome(): void {
    this.view = 'home';
    this.selectedCategory = null;
    this.mobileMenuOpen = false;
    this.message = '';
  }

  showApplications(): void {
    this.view = 'applications';
    this.selectedCategory = null;
    this.mobileMenuOpen = false;
    this.message = '';
  }

  showCategory(category: ApplicationCategory): void {
    this.view = 'applications';
    this.selectedCategory = category;
    this.mobileMenuOpen = false;
    this.message = '';
  }

  showFavorites(): void {
    this.view = 'favorites';
    this.selectedCategory = null;
    this.mobileMenuOpen = false;
    this.message = '';
  }

  showAbout(): void {
    this.view = 'about';
    this.selectedCategory = null;
    this.mobileMenuOpen = false;
    this.message = '';
  }

  toggleFavorite(application: HubApplication, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const nextFavorites = new Set(this.favorites);
    if (nextFavorites.has(application.id)) {
      nextFavorites.delete(application.id);
    } else {
      nextFavorites.add(application.id);
    }
    this.favorites = nextFavorites;
    this.persistPreferences();
  }

  async launch(application: HubApplication, event: MouseEvent): Promise<void> {
    event.preventDefault();
    if (!this.isSafeApplication(application)) {
      this.message = `The saved destination for ${application.name} is not a valid HTTPS address.`;
      return;
    }

    this.rememberRecent(application.id);
    this.message = '';

    try {
      if (Capacitor.isNativePlatform()) {
        await Browser.open({ url: application.url });
        return;
      }
      window.location.assign(application.url);
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'The browser could not open the link.';
      this.message = `Could not open ${application.name}. ${detail}`;
    }
  }

  isSafeApplication(application: HubApplication): boolean {
    return isSafeDestination(application.url);
  }

  clearMessage(): void {
    this.message = '';
  }

  private restorePreferences(): void {
    try {
      const savedFavorites = localStorage.getItem('suraksha-hub:favorites');
      const savedRecents = localStorage.getItem('suraksha-hub:recent');
      if (savedFavorites) {
        const parsedFavorites: unknown = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavorites) && parsedFavorites.every((id) => typeof id === 'string')) {
          this.favorites = new Set(
            parsedFavorites.filter((id) => this.applications.some((application) => application.id === id))
          );
        }
      }
      if (savedRecents) {
        const parsedRecents: unknown = JSON.parse(savedRecents);
        if (Array.isArray(parsedRecents) && parsedRecents.every((id) => typeof id === 'string')) {
          this.recentIds = parsedRecents
            .filter((id) => this.applications.some((application) => application.id === id))
            .slice(0, 5);
        }
      }
    } catch {
      this.message = 'Saved preferences could not be read. You can still use the application directory.';
    }
  }

  private rememberRecent(id: string): void {
    this.recentIds = [id, ...this.recentIds.filter((recentId) => recentId !== id)].slice(0, 5);
    this.persistPreferences();
  }

  private persistPreferences(): void {
    try {
      localStorage.setItem('suraksha-hub:favorites', JSON.stringify([...this.favorites]));
      localStorage.setItem('suraksha-hub:recent', JSON.stringify(this.recentIds));
    } catch {
      this.message = 'Browser storage is unavailable. Favourites and recent apps will not persist.';
    }
  }

  private async registerAndroidBackButton(): Promise<void> {
    try {
      this.backButtonListener = await CapacitorApp.addListener('backButton', () => {
        if (this.mobileMenuOpen) {
          this.mobileMenuOpen = false;
        } else if (this.view !== 'home' || this.selectedCategory !== null) {
          this.showHome();
        } else {
          void CapacitorApp.exitApp();
        }
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Android back navigation is unavailable.';
      this.message = detail;
    }
  }

}
