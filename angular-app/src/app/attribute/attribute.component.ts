import { Component, OnInit } from '@angular/core';
import { AttributeService } from '../service/attribute.service';
import { Attribute } from '../model/attribute.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';

import { TaskService } from '../service/task.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class AttributeComponent implements OnInit {
  attributes: Attribute[];
  tasksOptions: SelectItem[]; 
  attributeDialog: boolean;
  attribute: Attribute;
  submitted: boolean;
  clonedAttributes: { [s: number]: Attribute; } = {};
  loading: boolean = true; 
  table_name: string = "attribute";

  constructor(private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private attributeService: AttributeService,
    private taskService: TaskService) {
  }

  ngOnInit() {
    this.loadAttributes();
    this.loadTasks();  
  }

  loadAttributes(): void {
    this.attributeService.getAll()
      .subscribe(
        data => {
          this.attributes = data;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
        });
  }

  loadTasks(): void{
    this.taskService.getAll()
    .subscribe(
      data => {
        this.tasksOptions = []; 
        for(let i = 0; i < data.length; i++){
          this.tasksOptions.push({label: data[i].task_name, value: data[i].task_sid})
        }
        this.loading = false; 
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while loading data!', life: 3000 });
      }
    );
  }

  deleteAttribute(attribute: Attribute) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + attribute.column_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.attributeService.deleteAttribute(attribute.attribute_id).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attribute deleted', life: 3000 });
            this.loadAttributes();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Attribute couldn\'t be deleted', life: 3000 });

          });
      }
    });
  }

  onRowEditInit(attribute: Attribute) {
    this.clonedAttributes[attribute.attribute_id] = {...attribute};
  }

  onRowEditSave(attribute: Attribute, index: number, table:Table){

    if(attribute.attribute_id == 0){
      let copy = {...attribute}; 
      delete attribute.attribute_id;
      this.attributeService.createAttribute(attribute).subscribe(
        response => {
          delete this.clonedAttributes[copy.attribute_id];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attribute added!', life: 3000 });
          this.loadAttributes();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Attribute couldn\'t be added!', life: 3000 });
          this.onRowEditCancel(copy, index, table); 
        }
      );
    }else{
      this.attributeService.updateAttribute(attribute).subscribe(
        response => {
          delete this.clonedAttributes[attribute.attribute_id];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attribute updated!', life: 3000 });
          this.loadAttributes();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Attribute couldn\'t be updated!', life: 3000 });
          this.onRowEditCancel(attribute, index, table); 
        });
      }
  }

  onRowEditCancel(attribute: Attribute, index: number, table: Table) {
    if (attribute.attribute_id == 0){
      delete this.attributes[index]; 
      table.value.splice(index, 1); 
    }
    else{
      this.attributes[index] = this.clonedAttributes[attribute.attribute_id];
    }
    delete this.clonedAttributes[attribute.attribute_id]; 
  }

  addNewRowClick() {
    const empty = {
      attribute_id: 0, 
      task_sid: null, 
      column_name: null,
      pk_flag: false,
      DV_f: false,
      dv_sid: null,
    };
    return empty;
  }
}


