export const diagonal = (s, d) => {
  const diff = (d.y - s.y - 150) / 2;
  const p = s.x + 75;
  const q = s.y + 150;
  const r = q + diff;
  s = d.x + 75;
  const t = d.y;
  const path = `M ${p} ${q}
            L ${p} ${r}
            L ${s} ${r}
            L ${s} ${t}`
  return path;

}


export const otherDiagonal = (s, d) => {
  const diff = (d.y - s.y - 150) / 2;
  const p = s.x;
  const q = s.y + 150;
  const r = q + diff;
  s = d.x + 75;
  const t = d.y;
  const path = `M ${p} ${q}
            L ${s} ${t}`
  return path;

}


export const otherRelDiagonal = (parent, child, parentKeys, childKeys) => {
  const parentIndex = parentKeys.indexOf(parent.name);
  const childIndex = childKeys.indexOf(child.name);
  if (parent.y===child.y & parent.y < 0 ){
    const ChldX = child.x + 75;
    const ChldY = child.y +150;
    const parX = parent.x + 75;
    const parY = parent.y;
    const MidY = parent.y -250 + (childIndex*10);
    const path = `M ${parX} ${parY}
              L ${parX} ${MidY}
              L ${ChldX} ${MidY}
              L ${ChldX} ${ChldY}`
    return path;
  }
  if(child.x <0 & parent.x>0 & parent.y!==child.y) {
    const ChldX = child.x + 350;
    const ChldY = child.y - 100;
    const parX = parent.x + 75;
    const parY = parent.y;
    const MidY = parent.y +175;
    const path = `M ${parX} ${parY}
              L ${ChldX} ${ChldY}`
    return path;
  }
  
  if (child.x !== parent.x) {
  const diff = (child.y - 150) + (childIndex*10);
  const ChldX = child.x + 75;
  const ChldY = child.y +150;
  const parX = parent.x + 75;
  const parY = parent.y;
  const MidY = parent.y +175 + (childIndex*5);
  const path = `M ${parX} ${parY}
            L ${parX} ${MidY}
            L ${ChldX} ${MidY}
            L ${ChldX} ${ChldY}`
  return path;
  } else {
  const diff = (child.y - 150) + (childIndex*10);
  const ChldX = child.x + 75;
  const ChldY = child.y +150;
  const parX = parent.x + 75;
  const parY = parent.y;
  const MidY = parent.y +175;

  const path = `M ${parX} ${parY}
            L ${parX} ${MidY}
            L ${ChldX} ${MidY}
            L ${ChldX} ${ChldY}`
  return path;

  }
};

export const getParNode = (dupNode, ParentNodes) => {
  const node = ParentNodes.filter(parentNode => parentNode.data.name=== dupNode.data.name)[0];
  dupNode.x = node.x;
  dupNode.y = node.y;
  return dupNode;
}

export const getChildNode = (dupNode, ChildNodes) => {
  const node = ChildNodes.filter(childNode => childNode.data.name=== dupNode.data.name)[0];
  dupNode.x = node.x;
  dupNode.y = node.y;
  return dupNode;
}


export const getOtherRelCoords = (rel, otherLinkNodeCoords) => {
  const parentNode = otherLinkNodeCoords.filter(node => node.name===rel.PAR.trim())[0];
  const childNode = otherLinkNodeCoords.filter(node => node.name===rel.CHLD.trim())[0];
  return {
    'relID': rel.RLNID.trim(),
    'PAR': rel.PAR.trim(),
    'CHLD': rel.CHLD.trim(),
    'ParentNode': parentNode,
    'ChildNode': childNode,
  }
}

// export const adjustParentLinkCoords = (coords) => {
//   console.log(coords);
//   const parentAdjustment = {}
//   return coords.map((coord) => {
//     // for each parent 
//     if (parentAdjustment[coord.ParentNode.name]) parentAdjustment[coord.ParentNode.name]+=1;
//     else parentAdjustment[coord.ParentNode.name] = 1
//     //coord.ParentNode.x = coord.ParentNode.x + (parentAdjustment[coord.ParentNode.name]*5); 
//     coord.ParentNode.y = coord.ParentNode.y - (parentAdjustment[coord.ParentNode.name]*5); 
//     return coord;
//   })
// }


// export const adjustChildLinkCoords = (coords) => {
   
//   const parentAdjustment = {}
//   return coords.map((coord) => {
//     // for each parent 
//     if (parentAdjustment[coord.parent.name]) parentAdjustment[coord.parent.name]+=1;
//     else parentAdjustment[coord.parent.name] = 1
    
//     coord.parent.x = coord.parent.x + (parentAdjustment[coord.parent.name]*5); 
//     coord.parent.y = coord.parent.y - (parentAdjustment[coord.parent.name]*5); 

//     return coord;
//   })
// }