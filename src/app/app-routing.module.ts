import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedlistComponent } from './feedlist/feedlist.component'
import { AddFeedSourceComponent } from './add-feedsource/add-feedsource.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';

const routes: Routes = [
    { path: 'list', component: FeedlistComponent },
    { path: 'add', component: AddFeedSourceComponent },
    { path: 'details/:name', component: FeedDetailsComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
