import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  private title$: BehaviorSubject<string> = new BehaviorSubject('');
  private enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private onMobile$: Observable<boolean>;
  private menuSidenavOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private totalVisualizacao$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private quantidadeviews$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.onMobile$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((breakpointState: BreakpointState) => breakpointState.matches));
  }

  /**
   * Ajusta o título da funcionalidade
   * @param title Título da funcionalidade
   */
  setTitle(title: string): void {
    if (title) {
      this.on();
    }
    this.title$.next(title);
  }


   /**
   * Recupera o título da funcionidade
   */
    getTitle(): Observable<string> {
      return this.title$.asObservable();
    }

  /**
   * Liga o layout
   */
  on(): void {
    this.enabled$.next(true);
  }

  /**
   * Desliga o layout
   */
  off(): void {
    this.setTitle('');
    this.enabled$.next(false);
  }

  /**
   * Recupera se o layout está ligado ou não
   */
  isEnabled(): Observable<boolean> {
    return this.enabled$.asObservable().pipe(startWith(true), delay(0));
  }

  /**
   * Exibe o carregando...
   */
  loading(): void {
    this.loading$.next(true);
  }

  /**
   * Esconde o carregando...
   */
  loaded(): void {
    this.loading$.next(false);
  }

  /**
   * Recupera se está carregando ou não
   */
  isLoading(): Observable<boolean> {
    return this.loading$.asObservable().pipe(startWith(false), delay(0));
  }

  /**
   * Recupera se está em uma tela pequena
   */
  onMobile(): Observable<boolean> {
    return this.onMobile$;
  }

  /**
   * Recupera o estado do menu
   */
  menuSidenavOpen(): Observable<boolean> {
    return this.menuSidenavOpen$.asObservable();
  }

  /**
   * Expande o menu
   */
  menuSidenavExpanded(): void {
    this.menuSidenavOpen$.next(true);
  }

  /**
   * Recolhe o menu
   */
  menuSidenavCollapsed(): void {
    this.menuSidenavOpen$.next(false);
  }

  /**
   * set valorer total visualização rodapé
   */

  setTotalView(show: boolean, valueNumber: number): void {
    this.totalVisualizacao$.next(show);
    this.quantidadeviews$.next(valueNumber)
  }

  getTotalVisualizacao(): Observable<boolean> {
    return this.totalVisualizacao$.asObservable();
  }

  getQuantidadeViews():Observable<number> {
    return this.quantidadeviews$.asObservable();
  }

}
