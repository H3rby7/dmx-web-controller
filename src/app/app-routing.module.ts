import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightboardComponent } from './dmx/lightboard/lightboard.component';

const routes: Routes = [
  {path: "", component: LightboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
