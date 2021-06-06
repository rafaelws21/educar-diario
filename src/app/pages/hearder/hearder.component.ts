import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.scss']
})
export class HearderComponent implements OnInit {


  @Input() notificationSidenav!: MatSidenav;

  menuSidenavOpen$!: Observable<boolean>;
  title$!: Observable<string>;

  constructor(
    private layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    this.menuSidenavOpen$ = this.layoutService.menuSidenavOpen();
    this.title$ = this.layoutService.getTitle();
  }

  openMenu(): void {
    this.layoutService.menuSidenavExpanded();
  }

}
