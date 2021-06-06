import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';
import { MaterialModule } from 'src/material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenuSidenavComponent,
  ],
  exports: [
    MenuSidenavComponent,
  ],
  imports: [
    BrowserModule,
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
