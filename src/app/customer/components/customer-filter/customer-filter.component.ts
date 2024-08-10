import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: [],
})
export class CustomerFilterComponent {
  filterTerm: string = '';

  @Output() filterChange = new EventEmitter<string>();

  onFilterChange() {
    this.filterChange.emit(this.filterTerm);
  }
}
