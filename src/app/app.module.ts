import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Custom
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddCarDialogComponent } from './add-car-dialog/add-car-dialog.component';
import { appRoutes } from './routes';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppComponent } from './app.component';

import {
  CarList,
  CarService,
  CarThumbnailComponent,
  CarDetailsComponent,
  CarRouteActivatorService
} from './cars/index';
import { AuthService } from './user/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarList,
    CarThumbnailComponent,
    AddCarDialogComponent,
    CarDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    FlexLayoutModule
  ],
  providers: [CarService, CarRouteActivatorService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
