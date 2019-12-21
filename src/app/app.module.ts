import { WelcomeComponent } from './misc/welcome/welcome.component';
import { AuthService } from './services/auth.service';
import { ProductAddComponent } from './misc/product-add/product-add.component';
import { EditStoreComponent } from './misc/edit-store/edit-store.component';
import { BuyComponent } from './misc/buy/buy.component';
import { CreatestoreComponent } from './misc/createstore/createstore.component';
import { AllstoresComponent } from './misc/allstores/allstores.component';
import { ViewproductComponent } from './misc/viewproduct/viewproduct.component';
import { ViewstoreComponent } from './misc/viewstore/viewstore.component';
import { AboutComponent } from './misc/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './misc/edit-profile/edit-profile.component';
import { UiService } from './services/ui.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [
    AppComponent,
    EditProfileComponent,
    AboutComponent,
    ViewproductComponent,
    ViewstoreComponent,
    AllstoresComponent,
    CreatestoreComponent,
    BuyComponent,
    EditStoreComponent,
    ProductAddComponent,
    WelcomeComponent
  ],
  entryComponents: [
    EditProfileComponent,
    AboutComponent,
    ViewproductComponent,
    ViewstoreComponent,
    ViewproductComponent,
    AllstoresComponent,
    CreatestoreComponent,
    BuyComponent,
    EditStoreComponent,
    WelcomeComponent,
    ProductAddComponent
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    GooglePlus,
    UiService,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
