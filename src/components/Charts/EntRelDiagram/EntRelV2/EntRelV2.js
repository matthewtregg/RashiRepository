import * as d3 from "d3";
import {diagonal} from './EntRelV1Utils';
export const entRelChart  = (res,context) => {
  
  d3.select(context.MainDiv).selectAll("svg").remove();
  const [ChildEntities,ParentEntities] = res;
  console.log(ChildEntities);
  console.log(ParentEntities);

  //create other whole diagram 










}  