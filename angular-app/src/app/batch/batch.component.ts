import { Component, OnInit } from '@angular/core';
import { BatchService } from './batch-service.service'; 
import { Batch } from './batch'

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})

export class BatchComponent implements OnInit{
  batches: Batch[] = [];

  constructor(public service: BatchService) { }

  ngOnInit() {

    this.service.getAll().subscribe((data: Batch[])=>{
      console.log(data);
      this.batches = data;
    })  
  }
}


