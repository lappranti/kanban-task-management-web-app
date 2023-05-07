import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = 'light';
  private themeChanged = new BehaviorSubject<string>(this.currentTheme);
  constructor() {}

  getCurrentTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.themeChanged.next(this.currentTheme);
    }
    return this.themeChanged.asObservable();
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.themeChanged.next(theme);
  }
}
