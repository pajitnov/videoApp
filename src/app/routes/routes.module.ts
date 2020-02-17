import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent }   from '../modules/landing/landing.component';
// import { ContentComponent }      from '../modules/common/content/content.component';
import { ContentDetail }  from '../modules/content.detail/content.detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/promo', pathMatch: 'full' },
  { path: 'promo', component: LandingComponent },
  { path: 'movie/:id', component: ContentDetail }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
