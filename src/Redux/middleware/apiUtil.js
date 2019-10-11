export const filterChildren = (rels) => {
  const relChildren = [];
  const newRels = rels.filter((rel)=>{
    if (!relChildren.includes(rel.CHLD)){
      relChildren.push(rel.CHLD);
      return true;
    }
    else  return false;
  })
  return newRels;
}

export const filterParents = (rels) => {
  const relParents = [];
  const newRels = rels.filter((rel)=>{
    if (!relParents.includes(rel.PAR)){
      relParents.push(rel.PAR);
      return true;
    }
    else  return false;
  })
  return newRels;
}