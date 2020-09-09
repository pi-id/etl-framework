import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ExportService } from '../service/export.service';

@Directive({
  selector: '[appExport]'
})
export class ExportDirective {

  constructor(private exportService: ExportService) { }

  @Input('appExport') data: any[];
  @Input() fileName: string;

  @HostListener('click', ['$event']) onClick($event) {
    console.log('clicked: ' + $event);
    this.exportService.exportExcel(this.data, this.fileName);
  }

}