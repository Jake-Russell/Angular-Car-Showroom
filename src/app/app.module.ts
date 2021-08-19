import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { appRoutes } from './routes';
import { CarList } from './cars/car-list/car-list.component';
import { CarThumbnailComponent } from './cars/car-thumbnail/car-thumbnail.component';
import { CarService } from './cars/car.service';
import { AddCarDialogComponent } from './add-car-dialog/add-car-dialog.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarList,
    CarThumbnailComponent,
    AddCarDialogComponent,
    LogInComponent,
    RegisterComponent,
    CarDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
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
  providers: [Title, CarService],
  bootstrap: [AppComponent]
})
export class AppModule {}
