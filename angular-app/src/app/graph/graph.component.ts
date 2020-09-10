import { Component, OnInit } from '@angular/core';
import {GraphNode, GraphLink} from './directed-graph-datatypes';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  constructor() { }

  
  height:number=500;
  width:number=500;
  svg:any;
  simulation:any;
  link:any;
  node:any;
  arr:any;
  nodes_data:GraphNode[];
  links:GraphLink[];
  circle:any;
  text:any;
  label:any;
  task:number;
  batch:number;
  editField: string;
  svg_batch:any;
  simulation_batch:any;
  link_batch:any;
  node_batch:any;
  arr_batch:any;
  nodes_data_batch:GraphNode[];
  links_batch:GraphLink[];
  circle_batch:any;
  text_batch:any;
  label_batch:any;
  
  ngOnInit(): void {
    this.batch=0;
    this.task=0;
  }
  openTab(type : string){
    var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(type).style.display = "block";
   
}
public ticked =()=>{
  this.node.attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; });
  this.link
  .attr("x1", function(d) { return d.source.x; })
  .attr("y1", function(d) { return d.source.y; })
  .attr("x2", function(d) { return d.target.x; })
  .attr("y2", function(d) { return d.target.y; });
  this.label
           .attr("x", function(d){ return d.x-5 })
           .attr("y", function (d) {return d.y - 10; });

  

}

public drawTaskGraph=()=>{
  if(this.task>0){
    return;
  }
  this.task+=1;
  this.nodes_data=[{id:7},{id:8},{id:9}, {id:10}];
  this.links=[{source:8,target:7}, {source:7,target:9}, {source:10, target:7}];

  this.svg = d3.select('#cont1').append("svg").attr("width", 200).attr("height", 200);
  this.simulation = d3.forceSimulation()
             .force("link", d3.forceLink().id((d: any) => d.id).distance(60).strength(1))
             .force('charge', d3.forceManyBody())
             .force('center', d3.forceCenter(100, 100))
             .on('tick', this.ticked);
             /*.force("x", d3.forceX())
             .force("y", d3.forceY());*/
             
  this.arr=this.svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 16)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");
             
  this.link=this.svg.append("g").attr("class", "links").selectAll("line").data(this.links).enter().append("line")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("marker-end", "url(#triangle)");

  this.node = this.svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(this.nodes_data)
    .enter().append("g")
    .append("circle")
    .attr("r", 5)
    .attr("fill", "red")
    
  this.label = this.svg.selectAll(null)
    .data(this.nodes_data)
    .enter()
    .append("text")
    .text(function (d) { return d.id; })
    .style("text-anchor", "middle")
    .style("fill", "#555")
    .style("font-family", "Arial")
    .style("font-size", 12);

  this.simulation
    .nodes(this.nodes_data)
    .on('tick', this.ticked);
 
    
  this.simulation.force("link")
    .links(this.links);

}

public drawBatchGraph=()=>{
  if(this.batch>0){
    return;
  }
  this.batch+=1;
  this.nodes_data_batch=[{id:7},{id:8},{id:9}, {id:10}];
  this.links_batch=[{source:8,target:7}, {source:7,target:9}, {source:10, target:7}];

  this.svg_batch = d3.select('#cont2').append("svg").attr("width", 200).attr("height", 200);
  this.simulation_batch = d3.forceSimulation()
             .force("link", d3.forceLink().id((d: any) => d.id).distance(60).strength(1))
             .force('charge', d3.forceManyBody())
             .force('center', d3.forceCenter(100, 100))
             .on('tick', this.ticked_batch);
             /*.force("x", d3.forceX())
             .force("y", d3.forceY());*/
             
  this.arr_batch=this.svg_batch.append("svg:defs").append("svg:marker")
    .attr("id", "triangleb")
    .attr("refX", 16)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");
             
  this.link_batch=this.svg_batch.append("g").attr("class", "links").selectAll("line").data(this.links_batch).enter().append("line")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("marker-end", "url(#triangleb)");

  this.node_batch = this.svg_batch.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(this.nodes_data_batch)
    .enter().append("g")
    .append("circle")
    .attr("r", 5)
    .attr("fill", "green")
    
  this.label_batch = this.svg_batch.selectAll(null)
    .data(this.nodes_data_batch)
    .enter()
    .append("text")
    .text(function (d) { return d.id; })
    .style("text-anchor", "middle")
    .style("fill", "#555")
    .style("font-family", "Arial")
    .style("font-size", 12);

  this.simulation_batch
    .nodes(this.nodes_data_batch)
    .on('tick', this.ticked_batch);
 
    
  this.simulation_batch.force("link")
    .links(this.links_batch);

}
public ticked_batch =()=>{
  this.node_batch.attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; });
  this.link_batch
  .attr("x1", function(d) { return d.source.x; })
  .attr("y1", function(d) { return d.source.y; })
  .attr("x2", function(d) { return d.target.x; })
  .attr("y2", function(d) { return d.target.y; });
  this.label_batch
           .attr("x", function(d){ return d.x-5 })
           .attr("y", function (d) {return d.y - 10; });

  

}
}
