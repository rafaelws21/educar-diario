import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';
import { switchMap, tap, delay, map } from 'rxjs/operators';


import { MenuModel } from '../models/menu.model';
import { ConfigService } from './config.service';
import { PerfilModel } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private cache: Map<string, MenuModel[]> = new Map();
  private perfilSelecionado!: PerfilModel;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
  ) { }

  filterItem!: (menuItem: MenuModel) => boolean;

  reset(): void {
    this.cache.clear();
  }


}
