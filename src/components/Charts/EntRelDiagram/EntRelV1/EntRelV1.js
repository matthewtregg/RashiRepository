import * as d3 from "d3";
import {getChildNode,diagonal,getOtherRelCoords, otherRelDiagonal,adjustParentLinkCoords,getParNode, otherDiagonal} from './EntRelV1Utils';
export const entRelChart  = (res, context) => {
d3.select(context.MainDiv).selectAll("svg").remove();

const [ChildEntities,ParentEntities] = res;

const treeLayout = d3.tree()
    .nodeSize([600, 600])
    .separation(function (a, b) { return a.parent === b.parent ? 1 : 0.8;  }); 
      
const root1 = d3.hierarchy(ChildEntities, function (d) { return d.children;});
const root2 = d3.hierarchy(ParentEntities, function (d) { return d.children;});
  
const svg = d3.select(context.MainDiv).append("svg")
  .attr("id", "svg1")
  .attr("width", 120000)
  .attr("height", 160000)
  .append("g")
  .attr("id", "grpmain")
  .attr("transform", "translate(" + 6000+ "," + 8000 + ")  ");

d3.select(".node").classed("visited", false);

const parentTreeData = treeLayout(root2);
const childTreeData = treeLayout(root1);

const g1 = svg.append("g")
              .attr("transform", "translate(500,250) scale(0.25,0.25) ");

const g2 = svg.append("g")
              .attr("transform", "translate(500,250) scale(0.25,0.25) rotate(180, 0,0) ");

const g3 = svg.append("g")
              .attr("transform", "translate(500,250) scale(0.25,0.25) ");

const g4 = svg.append("g")
              .attr("transform", "translate(500,250) scale(0.25,0.25) ");              

const g5 = svg.append("g")
              .attr("transform", "translate(500,250) scale(0.25,0.25) rotate(180, 0,0)");              
 
const g6 = svg.append("g")
              .attr("transform", "translate(500,250) scale(0.25,0.25) ");              



let parentNodes = parentTreeData.descendants();
let childNodes = childTreeData.descendants();


// furthest left
const firstNodeDiff = parentNodes[0].x - childNodes[0].x
const newChildNodes = childNodes.map(node => {
  node.x = node.x + firstNodeDiff;
  node.y = node.y-90;
  return node
});
    
const firstParentNode = [parentNodes[0]];
context.centerX = (parentNodes[0].x +6000);
context.centerY = (parentNodes[0].y +8000);
if (!context.centred) context.props.setEntChartCentre({centerX:context.centerX,centerY:context.centerY}, context.props.screenId);
context.centred = true;



let prevPlacedParent = [];
parentNodes = parentNodes.reverse();
parentNodes= parentNodes.map((node)=> { 
  node.IsDuplicate = false;
  if (prevPlacedParent.includes(node.data.name)) node.IsDuplicate = true;
  prevPlacedParent.push(node.data.name);
  return node;
})
let duplicateParentNodes = parentNodes.filter(node => node.IsDuplicate);
duplicateParentNodes = duplicateParentNodes.map(node => getParNode(node,parentNodes));
parentNodes = parentNodes.reverse();

let prevPlacedChildren = [];
childNodes = childNodes.reverse();
childNodes= childNodes.map((node)=> { 
  node.IsDuplicate = false;
  if (prevPlacedChildren.includes(node.data.name)) node.IsDuplicate = true
  prevPlacedChildren.push(node.data.name);
  return node;
})
const dupOneNodes = childNodes.filter(node => node.IsDuplicate);
const duplicateChildNodes = dupOneNodes.map(node => getChildNode(node,childNodes));
childNodes = childNodes.reverse();

const extensionButtonOne = parentNodes.filter(node => node.data.LastParent===true);
const extensionButtonTwo = childNodes.filter(node => node.data.LastChild===true);
const parentNodeLinks = parentNodes.filter(node => node.parent);
const childNodeLinks = newChildNodes.filter(node=> node.parent);
const finalParentNodes = parentNodes.filter((node, index)=>  index>0 ) ;
const finalChildNodes = newChildNodes.filter((node, index)=> index>0);

const childExtensionNodes = g4.selectAll('g.node')
  .data(extensionButtonTwo, function (d,i) { return d.id || (d.id = i); })

const childNodeEnter = childExtensionNodes.enter().append('g')
  .attr('class', 'node')
  .attr("id", function (d, i) { return `grpid${d.data.name}${i}`})

childNodeEnter.append("foreignObject")
  .attr('width', 55)
  .attr('height', 55)
  .append('xhtml:div')
  .attr('class','ExtensionBox')
  .style('overflow-y', 'scroll')
  .html(function(d){
    if (d.data.ButtonPressed) return '<div><p>-</p></div>'
    else return'<div><p>+</p></div>'})
//   // UPDATE
const childNodeUpdate = childNodeEnter.merge(childExtensionNodes);
 
childNodeUpdate
  .attr("transform", function (d) { 
    return "translate(" + (d.x+55)  + "," + (d.y+170) + ")"  })  
  .on("click", function (d) {
      context.child = true;
      context.entName = d.data.name;
      context.expandChildrenParents(context, d.data.ButtonPressed)
  })    

const parentExtensionNodes = g5.selectAll('g.node')
  .data(extensionButtonOne, function (d,i) { return d.id || (d.id = i); })

const parentNodeEnter = parentExtensionNodes.enter().append('g')
  .attr('class', 'node')
  .attr("id", function (d, i) { return `grpid${d.data.name}${i}`})

parentNodeEnter.append("foreignObject")
  .attr('width', 55)
  .attr('height', 55)
  .append('xhtml:div')
  .attr('class','ExtensionBox')
  .style('overflow-y', 'scroll')
  .html(function(d){
    if (d.data.ButtonPressed) return '<div><p>-</p></div>'
    else return'<div><p>+</p></div>'})
//   // UPDATE
const parentNodeUpdate = parentNodeEnter.merge(parentExtensionNodes);
  
parentNodeUpdate
  .attr("transform", function (d) { 
    return "translate(" + (d.x+45)  + "," + (d.y+150) + ")"  }) 
  .on("click", function (d) {
    context.parent = true;
    context.entName = d.data.name;
    // buttonPressed
    context.expandChildrenParents(context, d.data.ButtonPressed)
  })   
  

const duplicateParentLinks = g2.selectAll('path.link')
.data(duplicateParentNodes, function (d) { return d.id; });

duplicateParentLinks.enter().insert('path', "g")
.attr("class", function (d) { return "link"}) 
.merge(duplicateParentLinks)
.attr('d', function (d) { 
  return otherDiagonal(d, d.parent) });

const duplicateChildLinks = g1.selectAll('path.link')
.data(duplicateChildNodes, function (d) { return d.id; });
  
duplicateChildLinks.enter().insert('path', "g")
.attr("class", function (d) { return "link"}) 
.merge(duplicateChildLinks)
.attr('d', function (d) { 
  return otherDiagonal(d, d.parent) });

const finalParentNodeLinks = parentNodeLinks.filter(node => !node.IsDuplicate) 
const parentLinks = g2.selectAll('path.entRellink')
.data(finalParentNodeLinks, function (d) { return d.id; });

const finalChildNodeLinks = childNodeLinks.filter(node => !node.IsDuplicate);
const childLinks = g1.selectAll('path.entRellink')
.data(finalChildNodeLinks, function (d){ return d.id;});








const parentNodeCoords = parentNodeLinks.map(node => ({"name":node.data.name,"x":(-node.x),"y":(-node.y)}))
const childNodeCoords = childNodeLinks.map(node => ({"name":node.data.name,"x":node.x,"y":node.y}))
const otherLinkNodeCoords = parentNodeCoords.concat(childNodeCoords);


// const otherNodeLinks = otherRels.map(rel => {
//   return getOtherRelCoords(rel, otherLinkNodeCoords)
// })

// const parentacc1 = otherNodeLinks.reduce((acc,link)=> {
//   if (acc[link.PAR]) acc[link.PAR]+=1;
//   else acc[link.PAR]=1;
//   return acc; 
// },{})

// const childacc2 = otherNodeLinks.reduce((acc,link)=> {
//   if (acc[link.CHLD]) acc[link.CHLD]+=1;
//   else acc[link.CHLD]=1;
//   return acc; 
// },{})

// const parentOtherNodeLinks = otherNodeLinks.filter(link => parentacc1[link.PAR]<2);
// const childOtherNodeLinks = otherNodeLinks.filter(link => childacc2[link.CHLD]<2);
// const newOtherNodeLinks = parentOtherNodeLinks.concat(childOtherNodeLinks);
// const parentKeys = Object.keys(parentacc1);
// const childKeys = Object.keys(childacc2);


// const otherLinks = g1.selectAll('path.link')
// .data(newOtherNodeLinks, function (d) { return d.id; });

// otherLinks.enter().insert('path', "g")
// .attr("class", function (d) { return "link"}) 
// .merge(otherLinks)
// .attr('d', function (d) { 
//    return otherRelDiagonal(d.ParentNode,d.ChildNode,parentKeys,childKeys);
//  });


// // Enter any new links at the parent's previous position.
childLinks.enter().insert('path', "g")
.attr("class", function (d) { return "entRellink"}) 
.merge(childLinks)
.attr('d', function (d) { return diagonal(d, d.parent) });

parentLinks.enter().insert('path', "g")
.attr("class", function (d) { return "entRellink"}) 
.merge(parentLinks)
.attr('d', function (d) { return diagonal(d, d.parent) });
  

const node = g2.selectAll('g.node')
  .data(finalParentNodes, function (d,i) { return d.id || (d.id = i); })

const nodeEnter = node.enter().append('g')
  .attr('class', 'node')
  .attr("id", function (d, i) { return `grpid${d.data.name}${i}`})

// Add Rectangle for the nodes
nodeEnter.append("foreignObject")
.attr('width', 500)
.attr('height', 300)
.append('xhtml:div')
.attr('class','EntRectContent')
.style('overflow-y', 'scroll')
.html(function(d){
  const entClass = d.data.LastParent ? "finalProgram" : "Program"  
  return'<div class='+entClass+'><h3>'+d.data.name+'</h3></div>'})
// UPDATE
const nodeUpdate = nodeEnter.merge(node);

// Transition to the proper position for the node
nodeUpdate
  .attr("transform", function (d) { 
    return "translate(" + (d.x+150)  + "," + (d.y+150) + ") rotate(180)"  })    
  .on("contextmenu", function(d) {
    const container = d3.select(context.MainDiv).node();
    d3.event.preventDefault();
    const position = d3.mouse(container);
    const posX = (position[0]);
    const posY = position[1] ;
    d3.select(context.contextMenu)
      .style("top", ""+posY+"px")
      .style("left", ""+posX+"px")
      .style("visibility", "visible")
      .style("z-index",1);

    const notMainDiv = ".entRelChartCanvas" + context.screenId +":not(" +context.contextMenu+")"    
    d3.selectAll(notMainDiv)
      .on("click", function (d){
        const container = d3.select(context.MainDiv).node();
        d3.event.preventDefault();
        const position = d3.mouse(container);
      
      d3.select(context.contextMenu)
      .style("top", ""+0+"px")
      .style("left", ""+0+"px")
      .style("visibility", "hidden");
      });
    context.parent = true;
    context.entName = d.data.name;
    d3.event.stopPropagation();
    })



  const node2 = g1.selectAll('g.node')
  .data(finalChildNodes, function (d,i) { return d.id || (d.id = i); })
  
  const nodeEnter2 = node2.enter().append('g')
    .attr('class', 'node')
    .attr("id", function (d, i) { return `grpid${d.data.name}${i}`})
  
  // Add Rectangle for the nodes
  nodeEnter2.append("foreignObject")
  .attr('width', 500)
  .attr('height', 300)
  .append('xhtml:div')
  .attr('class',function (d){ 
    return 'EntRectContent'})
  .style('overflow-y', 'scroll')
  .html(function(d){  
    const entClass = d.data.LastChild ? "finalProgram" : "Program"  
    return'<div class='+entClass+'><h3>'+d.data.name+'</h3></div>'})
   
  // UPDATE
  const nodeUpdate2 = nodeEnter2.merge(node2);
  
  // Transition to the proper position for the node
  nodeUpdate2
    .attr("transform", function (d) { return "translate(" + d.x  + "," + (d.y-125) + ")"  })    
    .on("contextmenu", function(d) {
      const container = d3.select(context.MainDiv).node();
      d3.event.preventDefault();
      const position = d3.mouse(container);
      const posX = (position[0]);
      const posY = position[1] ;
      d3.select(context.contextMenu)
        .style("top", ""+posY+"px")
        .style("left", ""+posX+"px")
        .style("visibility", "visible")
        .style("z-index",1);
  
      const notMainDiv = ".entRelChartCanvas" + context.screenId +":not(" +context.contextMenu+")"    
      d3.selectAll(notMainDiv)
        .on("click", function (d){
          const container = d3.select(context.MainDiv).node();
          d3.event.preventDefault();
          const position = d3.mouse(container);
      
        d3.select(context.contextMenu)
        .style("top", ""+0+"px")
        .style("left", ""+0+"px")
        .style("visibility", "hidden");
        });
      context.entName = d.data.name;
      context.child = true
      d3.event.stopPropagation();
      })
        
        

const node3 = g3.selectAll('g.node')
  .data(firstParentNode, function (d,i) { return d.id || (d.id = i); })
    
const nodeEnter3 = node3.enter().append('g')
  .attr('class', 'node')
  .attr("id", function (d, i) { return `grpid${d.data.name}${i}`})
    
    // Add Rectangle for the nodes
nodeEnter3.append("foreignObject")
  .attr('width', 1200)
  .attr('height', 600)
  .append('xhtml:div')
  .attr('class',function (d){ 
      return 'CenterRectContent'})
  .style('overflow-y', 'scroll')
    .html(function(d){  return'<div class=finalProgram><h3>'+d.data.name+'</h3></div>'})
    // UPDATE
    const nodeUpdate3 = nodeEnter3.merge(node);
    
    // Transition to the proper position for the node
    nodeUpdate3
      .attr("transform", function (d) { 
        return "translate(" + (d.x-600)  + "," + (d.y-350) + ")"  })    
      .on("contextmenu", function(d) {
        const container = d3.select(context.MainDiv).node();
        d3.event.preventDefault();
        const position = d3.mouse(container);
        const posX = (position[0]);
        const posY = position[1] ;
        d3.select(context.contextMenu)
          .style("top", ""+posY+"px")
          .style("left", ""+posX+"px")
          .style("visibility", "visible")
          .style("z-index",1);
    
        const notMainDiv = ".entRelChartCanvas" + context.screenId +":not(" +context.contextMenu+")"    
        d3.selectAll(notMainDiv)
          .on("click", function (d){
            const container = d3.select(context.MainDiv).node();
            d3.event.preventDefault();
            const position = d3.mouse(container);
          
          d3.select(context.contextMenu)
          .style("top", ""+0+"px")
          .style("left", ""+0+"px")
          .style("visibility", "hidden");
          });
      
        context.entName = d.data.name;
        d3.event.stopPropagation();
    })
    
}