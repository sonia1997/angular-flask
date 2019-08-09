import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShowTemplatesComponent } from './components/show-templates/show-templates.component';
import { AddTemplatesComponent } from './components/add-templates/add-templates.component'
import { EditTemplatesComponent } from './components/edit-templates/edit-templates.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "add", component: AddTemplatesComponent },
  { path: "show", component: ShowTemplatesComponent },
  { path: "edit/:template", component: EditTemplatesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
