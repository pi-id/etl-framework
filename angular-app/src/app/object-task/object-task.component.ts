import { Component, OnInit } from '@angular/core';
import { ObjectService } from '../service/object.service';
import { TaskService } from '../service/task.service';
import { ObjectTaskService } from '../service/object-task.service';
import { Object } from '../model/object.model';
import { Task } from '../model/task.model';
import { ObjectTask } from '../model/object-task.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Datasource } from '../model/datasource.model';
import { DatasourceService } from '../service/datasource.service';
import { DomainService } from '../service/domain.service';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-object-task',
  templateUrl: './object-task.component.html',
  styleUrls: ['./object-task.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ObjectTaskComponent implements OnInit {
  objectTasks: ObjectTask[];
  datasources: Datasource[];
  tasks: Task[];
  tasksOptions: SelectItem[];
  sourceObjects: Object[];
  objectTaskDialog: boolean;
  batch: Object;
  selectedObjectTasks: ObjectTask[];
  submitted: boolean;
  datasourcesOptions: SelectItem[];
  sourceObjectsOptions: SelectItem[];
  domain_values: SelectItem[];
  clonedObjectTasks: { [s: number]: ObjectTask; } = {};
  loading: boolean = true;
  table_name: string = "object_task";

  constructor(private objectTaskService: ObjectTaskService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datasourceService: DatasourceService,
    private domainService: DomainService,
    private objectService: ObjectService,
    private taskService: TaskService) { }


  ngOnInit(): void {
    this.loadObjectTasks();
    this.loadDataSource();
    this.loadDomainValues();
    this.loadSourceObjects();
    this.loadTasks();
  }
  loadObjectTasks(): void {
    this.objectTaskService.getAll()
      .subscribe(
        data => {
          this.objectTasks = data;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
        });
  }

  loadDataSource(): void {
    this.datasourceService.getAll()
      .subscribe(
        data => {
          this.datasources = data;
          this.datasourcesOptions = [];
          for (let i = 0; i < data.length; i++) {
            this.datasourcesOptions.push({ label: data[i].datasource_name, value: data[i].datasource_sid })
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

  loadSourceObjects(): void {
    this.objectService.getAll()
      .subscribe(
        data => {
          this.sourceObjects = data;
          this.sourceObjectsOptions = [];
          for (let i = 0; i < data.length; i++) {
            this.sourceObjectsOptions.push({ label: data[i].object_name, value: data[i].object_sid })
          }
          console.log("sourceObjects");
          console.log(this.sourceObjectsOptions);
          this.loading = false;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
        }
      );
  }

  loadTasks(): void {
    this.taskService.getAll()
      .subscribe(
        data => {
          this.tasks = data;
          this.tasksOptions = [];
          for (let i = 0; i < data.length; i++) {
            this.tasksOptions.push({ label: data[i].task_name, value: data[i].task_sid })
          }
          console.log("tasks");
          console.log(this.tasksOptions);
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

  deleteSelectedObjectTasks() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected object tasks?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("accepted");
        for (let attr of this.selectedObjectTasks) {
          this.objectTaskService.deleteObjectTask(attr.object_task_sid).subscribe(
            response => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Object task with sid: ' + attr.object_task_sid + ' deleted', life: 6000 });
              this.loadObjectTasks();
              this.selectedObjectTasks = this.selectedObjectTasks.filter(item => item.object_task_sid !== attr.object_task_sid);
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Object task with sid: ' + attr.object_task_sid + ' couldn\'t be deleted', life: 6000 });
              this.selectedObjectTasks = this.selectedObjectTasks.filter(item => item.object_task_sid !== attr.object_task_sid);
            });
        }
      }
    });
  }

  onRowEditInit(objecttask: ObjectTask) {
    this.clonedObjectTasks[objecttask.object_task_sid] = { ...objecttask };
  }

  onRowEditSave(objecttask: ObjectTask, index: number, table: Table) {

    if (objecttask.object_task_sid == 0) {
      let copy = { ...objecttask };
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
    } else {
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
    if (objecttask.object_task_sid == 0) {
      delete this.objectTasks[index];
      table.value.splice(index, 1);
    }
    else {
      this.objectTasks[index] = this.clonedObjectTasks[objecttask.object_task_sid];
    }
    delete this.clonedObjectTasks[objecttask.object_task_sid];
  }

  addNewRowClick() {
    const empty = {
      object_task_sid: 0,
      source_object_sid: 0,
      target_object_sid: 0,
      task_sid: null,
      object_task_status: '',
      incremental_load: null,
      insert_date: '',
      insert_user: '',
      update_date: null,
      update_user: null

    };
    return empty;
  }

}
