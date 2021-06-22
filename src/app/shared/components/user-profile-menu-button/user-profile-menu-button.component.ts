import { Component, OnInit } from '@angular/core';
import { Observable, of as observableOf  } from 'rxjs';
import { PerfilModel } from '../../models/perfil.model';

@Component({
  selector: 'app-user-profile-menu-button',
  templateUrl: './user-profile-menu-button.component.html',
  styleUrls: ['./user-profile-menu-button.component.scss']
})
export class UserProfileMenuButtonComponent implements OnInit {

  nomeCompleto$: Observable<string> = observableOf('João do Santos');
  perfil$: Observable<PerfilModel> = observableOf({id: 1, descricao: 'Administrador', sigla: 'ADM'});
  helpLink!: string;

  constructor(
    // private authService: AuthService,
    // private securityService: SecurityService,
  ) { }

  ngOnInit(): void {
    this.helpLink = '';
  }

  changeProfile(): void {
    // this.securityService.navigateToChooseProfile(true);
  }

  logout(): void {
    // this.authService.logout();
  }

}
