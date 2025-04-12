import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { UserDetailsComponent } from './user-Details/user-details.component';
import { FilterComponent } from './filter/filter.component';
import {FormsModule} from '@angular/forms';
import { CommonModule } from "@angular/common";
import { UsersListComponent } from './users-list/users-list.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { UsersPageComponent } from './users-page/users-page.component';

@NgModule({
    declarations:[
    UserDetailsComponent,
    FilterComponent,
    UsersListComponent,
    UsersPageComponent
    
  ],
    imports:[
    FormsModule,
     AngularMaterialModule,
     RouterModule,
     CommonModule,
     MatPaginatorModule,
     
    ],
    exports:[
      UserDetailsComponent,
      FilterComponent,
      UsersListComponent,
      MatTableModule,
      UsersPageComponent
    ],
})
export class ComponentModule{}