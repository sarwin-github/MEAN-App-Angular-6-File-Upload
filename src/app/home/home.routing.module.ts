import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../home/home.component';
import { ListComponent } from '../list/list.component';

const homeRoute: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list', component: ListComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(homeRoute)
  ],
  exports: [RouterModule],
  declarations: [
    ListComponent,
    HomeComponent
  ],
  providers: []
})

export class HomeRoutingModule { }