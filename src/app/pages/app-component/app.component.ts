import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Observable, Subscription,  of as observableOf } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('routerOutlet') routerOutlet!: RouterOutlet;

  isLoading$!: Observable<boolean>;
  menuSidenavMode: any = '';
  menuSidenavOpen$!: Observable<boolean>;
  enabled$!: Observable<boolean>;
  layoutColorClass$: Observable<string> =  observableOf('');
  animatedClass$: Observable<string> = observableOf('');

  private mediaSubscription!: Subscription;
  private routerEventSubscription!: Subscription;

  constructor(
    private mediaObserver: MediaObserver,
    private layoutService: LayoutService,
    // private dialogService: DialogService,
    private changeDetectorRef: ChangeDetectorRef,
    router: Router,
  ) {
    const finish = () => {
      this.layoutService.loaded();
      this.colorizeAndAnimate(true);
    };

    this.routerEventSubscription = router.events.subscribe((event: any) => {

      // Events:
      // ★ NavigationStart
      // ☆ RouteConfigLoadStart
      // ☆ RouteConfigLoadEnd
      // ☆ RoutesRecognized
      // ☆ GuardsCheckStart
      // ☆ ChildActivationStart
      // ☆ ActivationStart
      // ☆ GuardsCheckEnd
      // ☆ ResolveStart
      // ☆ ResolveEnd
      // ☆ ChildActivationEnd
      // ☆ ActivationEnd
      // ★ NavigationEnd
      // ★ NavigationCancel
      // ★ NavigationError
      // ☆ Scroll

      if (event instanceof NavigationStart) {
        this.animatedClass$ = observableOf('');
        this.layoutService.loading();
      }

      if (event instanceof NavigationError) {
        let message: string;
        if (typeof event.error === 'string') {
          message = event.error;
        } else if (typeof event.error.message === 'string') {
          message = event.error.message;
        }
        console.log('%cRouter.event (NavigationError):', 'background-color: #444; color: #fa6', event.error);
        finish();
        // if (message) {
        //   router.navigate([`/home`])
        //         .then(() => this.dialogService.showAlert(message));
        // }
      }

      if (event instanceof NavigationEnd) {
        finish();
      }

      if (event instanceof NavigationCancel) {
        finish();
      }
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.layoutService.isLoading();
    this.menuSidenavOpen$ = this.layoutService.menuSidenavOpen();
    this.mediaSubscription = this.mediaObserver.asObservable().subscribe(
      (changes: MediaChange[]) => this.calculateSidenavStatus()
    );
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
    this.enabled$ = this.layoutService.isEnabled().pipe(
      tap((enabled: boolean) => {
        console.log('enabled -->', enabled);
        if (enabled) {
          this.calculateSidenavStatus();
        }
        this.colorizeAndAnimate(false);
      })
    );
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
    this.routerEventSubscription.unsubscribe();
  }

  menuSidenavClosed(): void {
    this.layoutService.menuSidenavCollapsed();
  }

  menuSidebarSwipeRight(): void {
    this.layoutService.menuSidenavExpanded();
  }

  private colorizeAndAnimate(withDelay: boolean): void {
    let layoutAnimation: boolean;
    let layoutColor: string;
    try {
      layoutAnimation = this.routerOutlet.activatedRouteData.layoutAnimation;
    } catch (e) {
      layoutAnimation = false;
    }
    try {
      layoutColor = this.routerOutlet.activatedRouteData.layoutColor;
    } catch (e) {
      layoutColor = 'none';
    }
    if (withDelay) {
      this.animatedClass$ = observableOf(layoutAnimation ? 'animated' : '').pipe(delay(1));
      this.layoutColorClass$ = observableOf('with-layout-color-' + layoutColor).pipe(delay(1));
    } else {
      this.animatedClass$ = observableOf(layoutAnimation ? 'animated' : '');
      this.layoutColorClass$ = observableOf('with-layout-color-' + layoutColor);
    }
  }

  private calculateSidenavStatus(): void {
    const isMobile = this.mediaObserver.isActive('lt-md');
    this.menuSidenavMode = isMobile ? 'over' : 'side';
    if (isMobile) {
      this.layoutService.menuSidenavCollapsed();
    } else {
      this.layoutService.menuSidenavExpanded();
    }
  }
}
