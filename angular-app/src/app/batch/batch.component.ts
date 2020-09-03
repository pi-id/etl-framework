import { Component, OnInit } from '@angular/core';
import { BatchService } from '../service/batch.service';
import { Batch } from '../model/batch';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import {Datasource} from '../model/datasource'; 
import {DatasourceService} from '../service/datasource.service'; 
import { Table } from 'primeng/table';
import { identifierModuleUrl } from '@angular/compiler';

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
  loading: boolean; 

  constructor(private batchService: BatchService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private datasourceService: DatasourceService) {
  }

  ngOnInit() {
    this.loading = true; 
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
        this.loading = false; 
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

  addNewRowClick() {
    const empty = {
      batch_sid: 0,
      datasource_sid: '',
      batch_id: '',
      batch_name: '',
      batch_desc: '',
      batch_type: '',
      batch_status: '',
      server_name: '',
      source_database_name: '',
      destination_database_name: '',
      ssis_package_name: '',
      job_name: '',
      job_step_name: '',
      job_scheduled: false,
      dashboard_type: '',
      use_mail_status: false,
      insert_date: null,
      insert_user: '',
      update_date: null,
      update_user: ''
    };
    return empty;
  }

  deleteBatch(batch: Batch) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + batch.batch_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.batchService.deleteBatch(batch.batch_sid).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Batch deleted', life: 3000 });
            this.loadBatches();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Batch couldn\'t be deleted', life: 3000 });

          });
      }
    });
  }

  onRowEditInit(batch: Batch) {
    console.log('On row edit init');
    this.clonedBatches[batch.batch_sid] = {...batch};
  }

  onRowEditSave(batch: Batch, index: number, table:Table){

    if(batch.batch_sid == 0){
      console.log("Adding new batch");  
      console.log(batch); 
      batch.batch_sid = null; 
      console.log(batch); 
      this.batchService.createBatch(batch).subscribe(
        response => {
          console.log("response");
          delete this.clonedBatches[batch.batch_sid];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Batch added!', life: 3000 });
          this.loadBatches();
        },
        error => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Batch couldn\'t be added!', life: 3000 });
          this.onRowEditCancel(batch, index, table); 
        }
      );
    }else{
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
          this.onRowEditCancel(batch, index, table); 
        });
      }
  }

  onRowEditCancel(batch: Batch, index: number, table: Table) {
    console.log('On row edit cancel');
    console.log(batch.batch_sid); 
    if (batch.batch_sid == 0){
      console.log("deleting non added batch"); 
      delete this.batches[index]; 
      table.value.splice(index, 1); 
    }
    else{
      this.batches[index] = this.clonedBatches[batch.batch_sid];
    }
    delete this.clonedBatches[batch.batch_sid]; 
  }
}


