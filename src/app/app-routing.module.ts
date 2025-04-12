import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-Details/user-details.component';
import { UsersPageComponent } from './components/users-page/users-page.component';


const routes: Routes = [
  { path: '', component: UsersPageComponent  },
  { path: 'pokemon/:id', component: UserDetailsComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
