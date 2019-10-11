import {
  createDiagData
} from './createDiagramData';
import {
  reformatData
} from './ReformatData'
import {
  getCorePgmrelations
} from './PgmRelations';
import {
  getEndPointCoordsandRemainingRelations
} from './EndPointAndRemainingRels';
import {
  removeManyChildrenEntities
} from './RemoveManyChildrenEntities';
import {
  getLevelsCount
} from './LevelsCount';

export const getPgmStructureChartData = async (pgm, programs) => {

  const Diagram = createDiagData(pgm, programs);
  const levelsCount = getLevelsCount(Diagram);
  let Dendogramtree = reformatData(Diagram);
  const CoreDiagramrels = getCorePgmrelations(flattenDiagram(Diagram));
  let [EndPointCoords, EndPointrels, Remainingrels] = getEndPointCoordsandRemainingRelations(flattenDiagram(Diagram), CoreDiagramrels, programs);
  [Dendogramtree, Remainingrels] = await removeManyChildrenEntities(Dendogramtree, Remainingrels);
  return ({
    "name": pgm,
    "data": [Dendogramtree, EndPointCoords, EndPointrels, Remainingrels, Diagram, levelsCount]
  });
}

const flattenDiagram = (Diagram) => {
  return Diagram.reduce((acc, obj) => acc.concat(obj));
}