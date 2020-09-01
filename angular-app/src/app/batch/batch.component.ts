import { Component, OnInit } from '@angular/core';
import { BatchService } from '../service/batch.service';
import { Batch } from '../model/batch';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import {Datasource} from '../model/datasource'; 
import {DatasourceService} from '../service/datasource.service'; 

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class BatchComponent implements OnInit {
  batches: Batch[];
  datasources: Datasource[]; 
  batchDialog: boolean;
  batch: Batch;
  selectedBatches: Batch[];
  submitted: boolean;
  options: SelectItem[]; 
  clonedBatches: { [s: number]: Batch; } = {};

  constructor(private batchService: BatchService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private datasourceService: DatasourceService) {
  }

  ngOnInit() {
    this.loadBatches();
    this.loadDataSource();  
  }

  loadDataSource(): void{
    this.datasourceService.getAll()
    .subscribe(
      data => {
        this.datasources = data;
        console.log(data);
        this.options = this.datasources.map((data) => ({label: data.datasource_name, value: data.datasource_sid})); 
      },
      error => {
        console.log(error);
      }
    );
  }

  loadBatches(): void {
    this.batchService.getAll()
      .subscribe(
        data => {
          this.batches = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteBatch(batch: Batch) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + batch.batch_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.batchService.deleteBatch(batch.batch_sid).subscribe(
          response => {
            console.log("response");
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Batch deleted', life: 3000 });
            this.loadBatches();
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Batch couldn\'t be deleted', life: 3000 });

          });
      }
    });
  }

  onRowEditInit(batch: Batch) {
    console.log('On row edit init');
    this.clonedBatches[batch.batch_sid] = {...batch};
  }

  onRowEditSave(batch: Batch, index: number){
    console.log('On row edit save');
      this.batchService.updateBatch(batch).subscribe(
        response => {
          console.log("response");
          delete this.clonedBatches[batch.batch_sid];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Batch updated!', life: 3000 });
          this.loadBatches();
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Batch couldn\'t be updated!', life: 3000 });
          this.onRowEditCancel(batch, index); 
        });
  }

  onRowEditCancel(batch: Batch, index: number) {
    console.log('On row edit cancel');
    this.batches[index] = this.clonedBatches[batch.batch_sid]; 
    delete this.batches[batch.batch_sid]; 
  }

  add(){
    this.batches.push();
    this.onRowEditInit(this.batches[this.batches.length - 1]);
}
}


