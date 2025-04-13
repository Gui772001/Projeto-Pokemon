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
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations:[
    UserDetailsComponent,
    FilterComponent,
    UsersListComponent,
    UsersPageComponent,
    HeaderComponent,
    FooterComponent
    
  ],
    imports:[
    FormsModule,
     AngularMaterialModule,
     RouterModule,
     CommonModule,
     MatPaginatorModule,
     HttpClientModule
     
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