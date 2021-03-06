import { Component, OnInit } from '@angular/core';
import {Object} from '../model/object.model';
import {ObjectType} from '../model/object-type.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import {Datasource} from '../model/datasource.model'; 
import {DatasourceService} from '../service/datasource.service'; 
import {ObjectService} from '../service/object.service';
import {ObjectTypeService} from '../service/object-type.service';
import { DomainService } from '../service/domain.service';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ObjectComponent implements OnInit {
  objects: Object[];
  selectedObjects: Object[]; 
  datasources: Datasource[];
  objectTypes:ObjectType[];
  objectDialog: boolean;
  submitted: boolean;
  datasourcesOptions: SelectItem[]; 
  objectTypesOptions:SelectItem[];
  domain_values: SelectItem[]; 
  clonedObjects: { [s: number]: Object; } = {};
  loading: boolean = true; 
  table_name: string = "object";

  constructor(private objectService: ObjectService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private datasourceService: DatasourceService,
    private domainService: DomainService,
    private objectTypeService: ObjectTypeService) { }

  ngOnInit(): void {
    this.loadObjects();
    this.loadDataSource();  
    this.loadDomainValues();
    this.loadObjectTypes();
  }
  loadObjects():void{
    this.objectService.getAll()
    .subscribe(
      data => {
        this.objects = data;
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

  loadObjectTypes(){
    this.objectTypeService.getAll()
    .subscribe(
      data => {
        this.objectTypes=data;
        this.objectTypesOptions=[];
        for(let i = 0; i < data.length; i++){
          this.objectTypesOptions.push({label: data[i].object_type_sid, value: data[i].object_type_sid})
        }
        console.log("objectTypes"); 
        console.log(this.objectTypesOptions); 
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

  deleteObject(object: Object) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + object.object_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.objectService.deleteObject(object.object_sid).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Object deleted', life: 3000 });
            this.loadObjects();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Object couldn\'t be deleted', life: 3000 });

          });
      }
    });
  }

  deleteSelectedObjects(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected objects?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("accepted"); 
         for(let attr of this.selectedObjects){
          this.objectService.deleteObject(attr.object_sid).subscribe(
            response => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Object with sid: ' + attr.object_sid + ' deleted', life: 6000 });
              this.loadObjects();
              this.selectedObjects = this.selectedObjects.filter(item => item.object_sid !== attr.object_sid);
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Object with sid: ' + attr.object_sid + ' couldn\'t be deleted', life: 6000 });
              this.selectedObjects = this.selectedObjects.filter(item => item.object_sid !== attr.object_sid);
            });
         }
      }
  });
  }

  onRowEditInit(object: Object) {
    this.clonedObjects[object.object_sid] = {...object};
  }
  
  onRowEditSave(object: Object, index: number, table:Table){

    if(object.object_sid == 0){
      let copy = {...object}; 
      delete object.object_sid;
      delete object.insert_date;
      delete object.update_date;
      this.objectService.createObject(object).subscribe(
        response => {
          delete this.clonedObjects[copy.object_sid];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Object added!', life: 3000 });
          this.loadObjects();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Object couldn\'t be added!', life: 3000 });
          this.onRowEditCancel(copy, index, table); 
        }
      );
    }else{
      this.objectService.updateObject(object).subscribe(
        response => {
          delete this.clonedObjects[object.object_sid];
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Object updated!', life: 3000 });
          this.loadObjects();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Object couldn\'t be updated!', life: 3000 });
          this.onRowEditCancel(object, index, table); 
        });
      }
  }

  onRowEditCancel(object: Object, index: number, table: Table) {
    if (object.object_sid == 0){
      delete this.objects[index]; 
      table.value.splice(index, 1); 
    }
    else{
      this.objects[index] = this.clonedObjects[object.object_sid];
    }
    delete this.clonedObjects[object.object_sid]; 
  }

  addNewRowClick() {
    const empty = {
      object_sid: 0,
      datasource_sid:null,
      object_type_sid: 0,
      object_id: null,
      object_schema: '',
      object_name: '',
      object_description: null,
      object_status:'',
      source_select: null,
      insert_date: '',
      insert_user: '',
      update_date: null,
      update_user: null
  
    };
    return empty;
  }
}
