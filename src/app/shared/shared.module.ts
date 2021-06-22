import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';
import { MaterialModule } from 'src/material/material.module';
import { RouterModule } from '@angular/router';
import { UserProfileMenuButtonComponent } from './components/user-profile-menu-button/user-profile-menu-button.component';



@NgModule({
  declarations: [
    MenuSidenavComponent,
    UserProfileMenuButtonComponent,
  ],
  exports: [
    MenuSidenavComponent,
    UserProfileMenuButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Angular Flex-Layout
    FlexLayoutModule,
    // Angular Material
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule { }
