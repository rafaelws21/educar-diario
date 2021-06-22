import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayoutConfig } from 'src/config/layout.config';
import { MenuModel } from '../../models/menu.model';
import { ConfigService } from '../../services/config.service';
import { LayoutService } from '../../services/layout.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],
})
export class MenuSidenavComponent implements OnInit {
  homeRoute = `/home`;
  versionRoute = `000`;
  appName: string = 'Educar & Diario';
  appVersion: string = '0.0.0';
  appVersionSuffix: string = '---';
  menu: MenuModel[] = [
    {
      descricao: 'TESTE',
      path: '',
      itens: [{ descricao: 'TESTE - sub', path: '' }],
    },
  ];

  constructor(
    // @Inject('LayoutConfig')
    // private layoutConfig: LayoutConfig,
    private configService: ConfigService,
    private layoutService: LayoutService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    // this.appName = this.layoutConfig.appName;
    // this.appVersion = this.layoutConfig.appVersion;
    // this.menu$ = this.menuService.get();
    // this.appVersionSuffix$ = this.configService.getList([
    //   'ENV',
    //   'BUILD_NUMBER'
    // ]).pipe(
    //   map((configs: [string, string]) => (
    //     (configs[0] || '')
    //     +
    //     (configs[1] ? `#${configs[1]}` : '')
    //   ))
    // );
  }

  closeMenu(): void {
    this.layoutService.menuSidenavCollapsed();
  }

  isInternalLink(path: string): boolean {
    path = path || '';
    path = String(path);
    const regex = /^https?:\/\/[^\/].*/;
    return !regex.test(path);
  }
}
