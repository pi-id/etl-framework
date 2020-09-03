import { Component, OnInit } from '@angular/core';
import { BatchService } from '../service/batch.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {TaskService} from '../service/task.service';

import { Task } from '../model/task';
import { Batch } from '../model/batch';

import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class TaskComponent implements OnInit {
  tasks: Task[];
  batches: Batch[]; 
  taskDialog: boolean;
  task: Task;
  selectedBatches: number[];
  submitted: boolean;
  batchesOptions: SelectItem[]; 
  clonedTasks: { [s: number]: Task; } = {};
  loading: boolean = true; 

  constructor(private batchService: BatchService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private taskService: TaskService) {
  }

  ngOnInit() {
    this.loadTasks();
    this.loadBatches();  
  }

  loadTasks(): void {
    this.taskService.getAll()
      .subscribe(
        data => {
          this.tasks = data;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
        });
  }

  loadBatches(): void{
    this.batchService.getAll()
    .subscribe(
      data => {
        this.batches = data;
        this.batchesOptions = []; 
        for(let i = 0; i < data.length; i++){
          this.batchesOptions.push({label: data[i].batch_name, value: data[i].batch_sid})
        }
        this.loading = false; 
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
      }
    );
  }

  deleteTask(task: Task) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete task ' + task.task_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.deleteTask(task.task_sid).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task deleted!', life: 3000 });
            this.loadTasks();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task couldn\'t be deleted', life: 3000 });

          });
      }
    });
  }

  onRowEditInit(task: Task) {
    this.clonedTasks[task.task_sid] = {...task};
  }

  onRowEditSave(task: Task, index: number, table:Table){

    if(task.task_sid == 0){
      let copy = {...task}; 
      delete task.task_sid;
      this.taskService.createTask(task).subscribe(
        response => {
          delete this.clonedTasks[copy.task_sid];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task added!', life: 3000 });
          this.loadTasks();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task couldn\'t be added!', life: 3000 });
          this.onRowEditCancel(copy, index, table); 
        }
      );
    }else{
      this.taskService.updateTask(task).subscribe(
        response => {
          delete this.clonedTasks[task.task_sid];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task updated!', life: 3000 });
          this.loadTasks();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task couldn\'t be updated!', life: 3000 });
          this.onRowEditCancel(task, index, table); 
        });
      }
  }

  onRowEditCancel(task: Task, index: number, table: Table) {
    if (task.task_sid == 0){
      delete this.tasks[index]; 
      table.value.splice(index, 1); 
    }
    else{
      this.tasks[index] = this.clonedTasks[task.task_sid];
    }
    delete this.clonedTasks[task.task_sid]; 
  }

  selectTask(){
    console.log(this.selectedBatches); 
  }

  addNewRowClick() {
    const empty = {
      task_sid: 0,
      batch_sid: 0,
      task_type: null,
      task_id: null,
      dependent_task_sid: null,
      task_name: null,
      task_desc: null,
      task_status: null,
      dq_check_type_sid: null,
      ssis_package_guid: null,
      ssis_package_name: null,
      ssis_package_version: null,
      ssis_package_path: null,
      ssis_package_file_name: null,
      server_name: null,
      source_database_name: null,
      destination_database_name: null,
      include_in_report: false,
      external_end_task: false,
      insert_date: null,
      insert_user: null,
      update_date: null,
      update_user: null,
      task_order: null,
    };
    return empty;
  }
}


