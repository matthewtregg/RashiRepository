

import {buildChart} from './EntRelationshipDiagram';
import {convertChildrenHierarchy} from './DendogramData';

export const buildEntData = (startingPgm, entrels) => {
console.log(entrels);
console.log(startingPgm);

  entrels = entrels.map(rel => {
  rel.PAR = rel.PAR.trim();
  rel.CHLD = rel.CHLD.trim();
  return rel;
})


let Diagrams = buildChart(entrels, startingPgm);
console.log(Diagrams);
let ParentTree = Diagrams[0];
ParentTree = ParentTree[1];
let ChildTree = Diagrams[1]; 
ChildTree = ChildTree[1]; 
let RemRelsGoingDown = convertChildrenHierarchy(Diagrams);
return [ParentTree,ChildTree];
   
}