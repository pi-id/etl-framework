import { svg, SimulationNodeDatum, SimulationLinkDatum, forceSimulation} from 'd3';
export class GraphNode implements SimulationNodeDatum{
    public x?: number;
    public y?: number;
    constructor(public id: number){}
  }
  
  export class GraphLink implements SimulationLinkDatum<GraphNode>{
    constructor(public source: number,
    public target: number){}
  }