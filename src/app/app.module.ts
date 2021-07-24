import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {environment} from './../environments/environment';
import {FeedlistComponent} from './feedlist/feedlist.component';
import {AddFeedSourceComponent} from './add-feedsource/add-feedsource.component';
import {FeedDetailsComponent} from './feed-details/feed-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    FeedlistComponent,
    AddFeedSourceComponent,
    FeedDetailsComponent,
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    keycloakService
      .init({
        config: environment.sso,
        initOptions: {
          flow: 'implicit',
          onLoad: 'login-required'
        },
        enableBearerInterceptor: true
      })
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');

        appRef.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
}
