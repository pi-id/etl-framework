import { Component, OnInit, ViewChild } from '@angular/core';
import { BatchService } from '../service/batch.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TaskService } from '../service/task.service';
import { DomainService } from '../service/domain.service';

import { Task } from '../model/task.model';
import { Batch } from '../model/batch.model';


import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class TaskComponent implements OnInit {
  @ViewChild('dt', { static: false }) dt: any;
  tasks: Task[];
  dependentTasks: SelectItem[]; 
  allTasks: Task[]; 
  batches: Batch[];
  domain_values: SelectItem[]; 
  taskDialog: boolean;
  task: Task;
  selectedBatches: number[];
  submitted: boolean;
  batchesOptions: SelectItem[];
  clonedTasks: { [s: number]: Task; } = {};
  loading: boolean = true;
  table_name: string = "task";


  constructor(private batchService: BatchService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TaskService,
    private domainService: DomainService) {
  }

  ngOnInit() {
    this.loading = true; 
    this.loadTasks();
    this.loadBatches();
    this.loadDomainValues();
  }

  loadTasks(): void {
    this.taskService.getAll()
      .subscribe(
        data => {
          this.tasks = data;
          this.allTasks = data; 
          this.dependentTasks = [];
          for (let i = 0; i < data.length; i++) {
            this.dependentTasks.push({ label: data[i].task_name, value: data[i].task_sid })
          }
          this.loading = false;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
        });
  }

  loadBatches(): void {
    this.batchService.getAll()
      .subscribe(
        data => {
          this.batches = data;
          this.batchesOptions = [];
          for (let i = 0; i < data.length; i++) {
            this.batchesOptions.push({ label: data[i].batch_name, value: data[i].batch_sid })
          }
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
    this.clonedTasks[task.task_sid] = { ...task };
  }

  onRowEditSave(task: Task, index: number, table: Table) {

    if (task.task_sid == 0) {
      let copy = { ...task };
      delete task.task_sid;
      delete task.insert_date; 
      delete task.update_date; 
      this.taskService.createTask(task).subscribe(
        response => {
          delete this.clonedTasks[copy.task_sid];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task added!', life: 3000 });
          this.loadTasks();
          //set page to last page 
          this.dt.first = Math.floor(this.dt.totalRecords / this.dt.rows) * this.dt.rows;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Task couldn\'t be added!', life: 3000 });
          this.onRowEditCancel(copy, index, table);
        }
      );
    } else {
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
    if (task.task_sid == 0) {
      delete this.tasks[index];
      table.value.splice(index, 1);
    }
    else {
      this.tasks[index] = this.clonedTasks[task.task_sid];
    }
    delete this.clonedTasks[task.task_sid];
  }

  selectBatch(table: Table) {
    if (this.selectedBatches.length == 0 || 
      this.selectedBatches.length == this.batches.length) {
      this.tasks = this.allTasks; 
    } else {
      this.dt.first = 0; 
      this.loading = true; 
      this.tasks = []; 
      for (let i = 0; i < this.selectedBatches.length; i++) {
        this.taskService.getTaskByBatchId(this.selectedBatches[i])
          .subscribe(
            data => {
              this.tasks = this.tasks.concat(data); 
              error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
              }
            });
        this.loading = false; 
      }
    }
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.tasks);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "tasks");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

  addNewRowClick() {
    const empty = {
      task_sid: 0,
      batch_sid: null,
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


