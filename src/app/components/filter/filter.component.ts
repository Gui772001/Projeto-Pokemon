import { Component, EventEmitter, Output } from '@angular/core';
import { IfilterOption } from '../../interfaces/Pokemons/filter-optinons.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
filteroptions = {
  name:undefined,
}
@Output() onFilterEmitt = new EventEmitter<IfilterOption>();

onFilter(){
  this.onFilterEmitt.emit(this.filteroptions)
}

 
}
