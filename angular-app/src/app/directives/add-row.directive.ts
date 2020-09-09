import { Directive, Input, HostListener } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[pAddRow]'
})
export class AddRowDirective {
  @Input() table: Table;
  @Input() newRow: any;

  @HostListener('click', ['$event'])
  onClick(event: Event) {

    // Insert a new empty row
    this.table.value.unshift(this.newRow);

    // Set the new row in edit mode
    this.table.initRowEdit(this.newRow);

    //return to the first page where new empty row is added
    this.table.first = 0; 

    event.preventDefault();
  }
}
