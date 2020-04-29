import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedlistComponent } from './feedlist/feedlist.component';
import { FeedDetailComponent } from './feed-detail/feed-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { MaterialModule } from './material/material.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from './../environments/environment';

const keycloakService = new KeycloakService();

@NgModule({
    declarations: [
        AppComponent,
        FeedlistComponent,
        FeedDetailComponent,
        MessagesComponent,
        NewFeedComponent
    ],
    imports: [
        KeycloakAngularModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
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
