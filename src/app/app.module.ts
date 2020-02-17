import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './req/in-memory-data.service';

import { AppRoutingModule }     from './routes/routes.module';

import { AppComponent }         from './app.component';
import { LandingComponent }   from './modules/landing/landing.component';
import { ContentDetail }  from './modules/content.detail/content.detail.component';
import { ContentService }          from './services/content.service';
import { ComService }       from './services/com.service';
import { MessagesComponent }    from './modules/com/com.component';
import { UserComponent } from './modules/user/user.component';
import { ConfigComponent } from './config/config.component';
import { AnalyticsComponent } from './modules/analytics/analytics.component';
import { PromoDirective } from './directives/promocontent/promo.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    ContentDetail,
    MessagesComponent,
    UserComponent,
    ConfigComponent,
    AnalyticsComponent,
    PromoDirective
  ],
  providers: [ ContentService, ComService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
