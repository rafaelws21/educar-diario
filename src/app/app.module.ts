import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePtExtra from '@angular/common/locales/extra/pt';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app-component/app.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HearderComponent } from './pages/hearder/hearder.component';
import { SharedModule } from './shared/shared.module';




const PORTUGUESE = 'pt-br';
const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

registerLocaleData(localePt, PORTUGUESE, localePtExtra);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HearderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    // Angular Flex-Layout
    FlexLayoutModule,
    // Angular Material
    MaterialModule,
    // Shared
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: PORTUGUESE },
    { provide: MAT_DATE_LOCALE, useValue: PORTUGUESE },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
