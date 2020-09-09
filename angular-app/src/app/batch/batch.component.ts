import { Component, OnInit } from '@angular/core';
import { BatchService } from '../service/batch.service';
import { Batch } from '../model/batch.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import {Datasource} from '../model/datasource.model'; 
import {DatasourceService} from '../service/datasource.service'; 
import { DomainService } from '../service/domain.service';
import { Table } from 'primeng/table';

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
  datasourcesOptions: SelectItem[]; 
  domain_values: SelectItem[]; 
  clonedBatches: { [s: number]: Batch; } = {};
  loading: boolean = true; 
  table_name: string = "batch";

  constructor(private batchService: BatchService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private datasourceService: DatasourceService,
    private domainService: DomainService) {
  }

  ngOnInit() {
    this.loadBatches();
    this.loadDataSource();  
    this.loadDomainValues();
  }

  loadBatches(): void {
    this.batchService.getAll()
      .subscribe(
        data => {
          this.batches = data;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
        });
  }

  loadDataSource(): void{
    this.datasourceService.getAll()
    .subscribe(
      data => {
        this.datasources = data;
        this.datasourcesOptions = []; 
        for(let i = 0; i < data.length; i++){
          this.datasourcesOptions.push({label: data[i].datasource_name, value: data[i].datasource_sid})
        }
        this.loading = false; 
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
      }
    );
  }

  loadDomainValues(): void {
    this.domainService.getAll(this.table_name)
      .subscribe(
        data => {
          this.domain_values = [];
          for (let i = 0; i < data.length; i++) {
            this.domain_values.push({ label: data[i].domain_value_value, value: data[i].domain_value_value })
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
        }
      );
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
    this.clonedBatches[batch.batch_sid] = {...batch};
  }

  onRowEditSave(batch: Batch, index: number, table:Table){

    if(batch.batch_sid == 0){
      let copy = {...batch}; 
      delete batch.batch_sid;
      delete batch.insert_date; 
      delete batch.update_date; 
      this.batchService.createBatch(batch).subscribe(
        response => {
          delete this.clonedBatches[copy.batch_sid];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Batch added!', life: 3000 });
          this.loadBatches();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Batch couldn\'t be added!', life: 3000 });
          this.onRowEditCancel(copy, index, table); 
        }
      );
    }else{
      this.batchService.updateBatch(batch).subscribe(
        response => {
          delete this.clonedBatches[batch.batch_sid];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Batch updated!', life: 3000 });
          this.loadBatches();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Batch couldn\'t be updated!', life: 3000 });
          this.onRowEditCancel(batch, index, table); 
        });
      }
  }

  onRowEditCancel(batch: Batch, index: number, table: Table) {
    if (batch.batch_sid == 0){
      delete this.batches[index]; 
      table.value.splice(index, 1); 
    }
    else{
      this.batches[index] = this.clonedBatches[batch.batch_sid];
    }
    delete this.clonedBatches[batch.batch_sid]; 
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
}


