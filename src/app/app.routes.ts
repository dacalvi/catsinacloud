import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'cats',  component: HomeComponent },
  { path: 'cats/hats',  component: HomeComponent },
  { path: 'cats/space',  component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
