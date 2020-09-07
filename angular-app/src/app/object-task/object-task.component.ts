import { Component, OnInit } from '@angular/core';
import {ObjectTaskService} from '../service/object-task.service';
import {ObjectTask} from '../model/object-task.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import {Datasource} from '../model/datasource.model'; 
import {DatasourceService} from '../service/datasource.service'; 
import { DomainService } from '../service/domain.service';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-object-task',
  templateUrl: './object-task.component.html',
  styleUrls: ['./object-task.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ObjectTaskComponent implements OnInit {
  objectTasks: ObjectTask[];
  datasources: Datasource[]; 
  objectTaskDialog: boolean;
  batch: Object;
  selectedObjectTasks: ObjectTask[];
  submitted: boolean;
  datasourcesOptions: SelectItem[]; 
  domain_values: SelectItem[]; 
  clonedObjectTasks: { [s: number]: ObjectTask; } = {};
  loading: boolean = true; 
  table_name: string = "objecttask";

  constructor(private objectTaskService: ObjectTaskService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private datasourceService: DatasourceService,
    private domainService: DomainService) { }

  
    ngOnInit(): void {
      this.loadObjectTasks();
      this.loadDataSource();  
      this.loadDomainValues();
    }
    loadObjectTasks():void{
      this.objectTaskService.getAll()
      .subscribe(
        data => {
          this.objectTasks = data;
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
          console.log("datasources"); 
          console.log(this.datasourcesOptions); 
          this.loading = false; 
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
        }
      );
    }

    loadDomainValues(): void{
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

    deleteObjectTask(objecttask: ObjectTask) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + objecttask.object_task_sid + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.objectTaskService.deleteObjectTask(objecttask.object_task_sid).subscribe(
            response => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Object task deleted', life: 3000 });
              this.loadObjectTasks();
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Object task couldn\'t be deleted', life: 3000 });
  
            });
        }
      });
    }

    onRowEditInit(objecttask: ObjectTask) {
      this.clonedObjectTasks[objecttask.object_task_sid] = {...objecttask};
    }

    onRowEditSave(objecttask: ObjectTask, index: number, table:Table){

      if(objecttask.object_task_sid == 0){
        let copy = {...objecttask}; 
        delete objecttask.object_task_sid;
        delete objecttask.insert_date;
        delete objecttask.update_date;
        this.objectTaskService.createObjectTask(objecttask).subscribe(
          response => {
            delete this.clonedObjectTasks[copy.object_task_sid];
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Object task added!', life: 3000 });
            this.loadObjectTasks();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Object couldn\'t be added!', life: 3000 });
            this.onRowEditCancel(copy, index, table); 
          }
        );
      }else{
        this.objectTaskService.updateObjectTask(objecttask).subscribe(
          response => {
            delete this.clonedObjectTasks[objecttask.object_task_sid];
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Object task updated!', life: 3000 });
            this.loadObjectTasks();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Object task couldn\'t be updated!', life: 3000 });
            this.onRowEditCancel(objecttask, index, table); 
          });
        }
    }

    onRowEditCancel(objecttask: ObjectTask, index: number, table: Table) {
      if (objecttask.object_task_sid == 0){
        delete this.objectTasks[index]; 
        table.value.splice(index, 1); 
      }
      else{
        this.objectTasks[index] = this.clonedObjectTasks[objecttask.object_task_sid];
      }
      delete this.clonedObjectTasks[objecttask.object_task_sid]; 
    }

}
