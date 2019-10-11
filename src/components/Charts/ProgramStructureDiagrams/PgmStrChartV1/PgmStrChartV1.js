import * as d3 from "d3";
import {
  checkIfBlueOrRed,
  findEndPointRelCoords,
  findRemRelCoords,
  converttocoords
} from '../PgmStrChartUtils';

export const newPgmStrChart = (res, context) => {

  const [PgmStrChart, EndPointPgms, EndPointRels, RemRels, Diagram, levelsCount] = res;

  const DiagramData = Diagram.reduce((acc, Obj) => {
    return acc.concat(Obj)
  });

  ///////////////////////new trial
  let width = 11000;
  let treewidth = 8500;
  const MaxLevel = Math.max(...levelsCount) - 15;

  if (MaxLevel > 0) {
    width = 11000 + (MaxLevel * 11000 / 15);
    treewidth = 8500 + (MaxLevel * 8500 / 15);
  }

  const height = 5000;
  const treedepth = 6000;
  const treeLayout = d3.tree()
    .size([treewidth, treedepth])

  ////////////////////////////////////////// 

  const root1 = d3.hierarchy(PgmStrChart, function (d) {
    return d.children;
  });

  context.diagData = root1;

  const EndPointPgmsWidth = (treewidth) / (EndPointPgms.length);
  const EndPointPgmsDepth = treedepth + (treedepth / Diagram.length);
  let runningLength = 0;
  const newEndPointCoords = EndPointPgms.map((Pgm) => {
    runningLength += EndPointPgmsWidth;
    Pgm.xcoord = runningLength;
    Pgm.ycoord = EndPointPgmsDepth;
    return Pgm;
  })

  const line2 = d3.line()
    .x(function (d) {
      return d.x;
    }) // set the x values for the line generator
    .y(function (d) {
      return d.y;
    }) // set the y values for the line generator 
    .curve(d3.curveCardinal);

  d3.select(context.MainDiv).selectAll("svg").remove();

  const svg = d3.select(context.MainDiv).append("svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", "grpmain")
    .attr("transform", "translate(" + 0 + "," + 200 + ") scale(" + context.props.zoomLevel + "," + context.props.zoomLevel + ") ")

  d3.select(".node").classed("visited", false);
  const scale = context.props.zoomLevel;
  const treeData = treeLayout(root1);

  let newEndPointRels = findEndPointRelCoords(EndPointRels, newEndPointCoords, root1.descendants());
  let newRemRels = findRemRelCoords(RemRels, root1.descendants())
  newEndPointRels = newEndPointRels.map((rel) => {
    return converttocoords(rel)
  })
  newRemRels = newRemRels.filter((rel) => {
    return (rel.child.y - rel.parent.y > 2000);
  });

  newRemRels = newRemRels.map((rel) => {
    return converttocoords(rel)
  })


  context.centerX = (treeData.x * context.props.zoomLevel)
  context.centerY = (treeData.y * context.props.zoomLevel)
  if (!context.centred) context.props.setChartCentre({
    centerX: context.centerX,
    centerY: context.centerY
  }, context.props.screenId);
  context.centred = true;

  const nodes = treeData.descendants();
  const links = treeData.links();

  const g1 = svg.append("g");
  const g2 = svg.append("g");
  const g3 = svg.append("g");
  const g4 = svg.append("g");

  g1.selectAll("g")
    .data(links)
    .enter()
    .append('line')
    .style("fill", 'none')
    .attr("stroke", function (d) {
      return 'black';
    })
    .attr("stroke-width", function (d) {
      return 5;

    })
    .attr('x1', function (d) {
      return d.source.x;
    })
    .attr('y1', function (d) {
      return d.source.y;
    })
    .attr('x2', function (d) {
      return d.target.x;
    })
    .attr('y2', function (d) {
      return d.target.y;
    });

  g2.selectAll("line")
    .data(newEndPointRels)
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("d", function (d) {
      return line2(d.coords)
    })
    .attr("stroke",
      function (d) {
        const Pgm1 = d.relID.split(':')[0];
        const Pgm2 = d.relID.split(':')[1];

        if (!context.HighlightedPgm) return 'grey';
        else if (context.HighlightedPgm === Pgm1 || context.HighlightedPgm === Pgm2) return 'black';
        return 'grey';
      }
    )
    .attr("stroke-width",
      function (d) {
        const Pgm1 = d.relID.split(':')[0];
        const Pgm2 = d.relID.split(':')[1];

        if (!context.HighlightedPgm) return 1;
        else if (context.HighlightedPgm === Pgm1 || context.HighlightedPgm === Pgm2) {
          return 5;
        }
        return 1;
      }
    )
    .attr("fill", "none");

  // g3.selectAll("line")
  //   .data(newRemRels)
  //   .enter()
  //   .append("path")
  //   .attr("class", "line")
  //   .attr("d", function (d) {
  //     return line2(d.coords)
  //   })
  //   .attr("stroke", function (d) {
  //     const Pgm1 = d.relID.split(':')[0];
  //     const Pgm2 = d.relID.split(':')[1];

  //     if (!context.HighlightedPgm) return 'grey';
  //     else if (context.HighlightedPgm === Pgm1 || context.HighlightedPgm === Pgm2) return 'black';
  //     return 'grey';
  //   })
  //   .attr("stroke-width", function (d) {
  //       const Pgm1 = d.relID.split(':')[0];
  //       const Pgm2 = d.relID.split(':')[1];
  //       if (!context.HighlightedPgm) return 1;
  //       else if (context.HighlightedPgm === Pgm1 || context.HighlightedPgm === Pgm2) {
  //         return 5;
  //       }
  //       return 1;
  //     }

  //   )
  //   .attr("fill", "none");


  const Endpointnode = svg.selectAll('g.node2')
    .data(newEndPointCoords, function (d, i) {
      return d.id || (d.id = i);
    })

  const nodeEnter2 = Endpointnode.enter().append('g')
    .attr('class', 'node2')
    .attr("id", function (d, i) {
      return `grpid${i}`
    })


  const PgmInfo = (localentity) => {
    const objProps = Object.keys(localentity)
    return objProps.map((objProp) => {
      return '<p>' + objProp + ':' + localentity[objProp] + '</p>'
    }).join('');

  }

  nodeEnter2.append("foreignObject")
    .attr('width', 710)
    .attr('height', 710)
    .append('xhtml:div')
    .attr('class', function (d) {
      return 'FinalRectContent'
    })
    .style('overflow-y', 'scroll')
    .html(function (d) {
      const localentity = [{
        "PGMID": "SCNTRY",
        "SHORTNM": "CNAUUSTP",
        "RNMONLY": "",
        "LEN": "26",
        "DECP": null,
        "DTATYP": "Z",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "COUNTRY",
        "VIEWID": "",
        "FTXT": "UpdD/T",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "SelectCountry",
        "ENTTX": "Country"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CNAUUUSR",
        "RNMONLY": "",
        "LEN": "10",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "COUNTRY",
        "VIEWID": "",
        "FTXT": "UpdUser",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Country"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CNCNID",
        "RNMONLY": "",
        "LEN": "5",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "COUNTRY",
        "VIEWID": "",
        "FTXT": "ID",
        "FSEQ": "0000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Country"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CNNAME",
        "RNMONLY": "",
        "LEN": "50",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "COUNTRY",
        "VIEWID": "",
        "FTXT": "Name",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Country"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CUCNID",
        "RNMONLY": "",
        "LEN": "5",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "CUSTOMER",
        "VIEWID": "",
        "FTXT": "Country",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Customer"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CUCUID",
        "RNMONLY": "",
        "LEN": "10",
        "DECP": null,
        "DTATYP": "S",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "CUSTOMER",
        "VIEWID": "",
        "FTXT": "ID",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Customer"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CUNAME",
        "RNMONLY": "",
        "LEN": "50",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "CUSTOMER",
        "VIEWID": "",
        "FTXT": "Name",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Customer"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CACAID",
        "RNMONLY": "",
        "LEN": "10",
        "DECP": null,
        "DTATYP": "S",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "ADDRESS",
        "VIEWID": "",
        "FTXT": "ID",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Address"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CACNID",
        "RNMONLY": "",
        "LEN": "5",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "ADDRESS",
        "VIEWID": "",
        "FTXT": "Country",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Address"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CACUID",
        "RNMONLY": "",
        "LEN": "10",
        "DECP": null,
        "DTATYP": "S",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "ADDRESS",
        "VIEWID": "",
        "FTXT": "CustID",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Address"
      }];
      const progProps = PgmInfo(localentity[0])
      return '<div class="finalProgram"><h3>' +
        d.program + '</h3></div>' + progProps
    })

  const nodeUpdate2 = nodeEnter2.merge(Endpointnode);




  // Transition to the proper position for the node
  nodeUpdate2
    .attr("transform", function (d) {
      return "translate(" + (d.xcoord - 100) + "," + (d.ycoord - 100) + ")"
    })
    .on("contextmenu", function (d) {
      const container = d3.select(context.MainDiv).node();
      d3.event.preventDefault();
      const position = d3.mouse(container);
      const posX = (position[0] + (10 * scale));
      const posY = position[1];

      d3.select(context.contextMenu)
        .style("top", "" + posY + "px")
        .style("left", "" + posX + "px")
        .style("visibility", "visible");

      const notMainDiv = ".chartCanvas" + context.screenId + ":not(" + context.contextMenu + ")"
      d3.selectAll(notMainDiv)
        .on("click", function (d) {
          const container = d3.select(context.MainDiv).node();
          d3.event.preventDefault();
          const position = d3.mouse(container);

          d3.select(context.contextMenu)
            .style("top", "" + 0 + "px")
            .style("left", "" + 0 + "px")
            .style("visibility", "hidden");
        });
      context.pgmName = d.program;
      d3.event.stopPropagation();
    })
  //  


  console.log(nodes);
  const node = svg.selectAll('g.node')
    .data(nodes, function (d, i) {
      return d.id || (d.id = i);
    })

  const nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr("id", function (d, i) {
      return `grpid${d.data.name}${i}`
    })

  // Add Rectangle for the nodes
  nodeEnter.append("foreignObject")
    .attr('width', 710)
    .attr('height', 700)
    .append('xhtml:div')
    .attr('class', function (d) {
      const colour = checkIfBlueOrRed(d.data.name, DiagramData)
      const class1 = colour === "blue" ? 'RectContent' : 'FinalRectContent';
      return class1
    })
    .style('overflow-y', 'scroll')
    .html(function (d) {
      const localentity = [{
        "PGMID": "SCNTRY",
        "SHORTNM": "CNAUUSTP",
        "RNMONLY": "",
        "LEN": "26",
        "DECP": null,
        "DTATYP": "Z",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "COUNTRY",
        "VIEWID": "",
        "FTXT": "UpdD/T",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "SelectCountry",
        "ENTTX": "Country"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CNAUUUSR",
        "RNMONLY": "",
        "LEN": "10",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "COUNTRY",
        "VIEWID": "",
        "FTXT": "UpdUser",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Country"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CNCNID",
        "RNMONLY": "",
        "LEN": "5",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "COUNTRY",
        "VIEWID": "",
        "FTXT": "ID",
        "FSEQ": "0000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Country"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CNNAME",
        "RNMONLY": "",
        "LEN": "50",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "COUNTRY",
        "VIEWID": "",
        "FTXT": "Name",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Country"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CUCNID",
        "RNMONLY": "",
        "LEN": "5",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "CUSTOMER",
        "VIEWID": "",
        "FTXT": "Country",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Customer"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CUCUID",
        "RNMONLY": "",
        "LEN": "10",
        "DECP": null,
        "DTATYP": "S",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "CUSTOMER",
        "VIEWID": "",
        "FTXT": "ID",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Customer"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CUNAME",
        "RNMONLY": "",
        "LEN": "50",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "CUSTOMER",
        "VIEWID": "",
        "FTXT": "Name",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Customer"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CACAID",
        "RNMONLY": "",
        "LEN": "10",
        "DECP": null,
        "DTATYP": "S",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "ADDRESS",
        "VIEWID": "",
        "FTXT": "ID",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Address"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CACNID",
        "RNMONLY": "",
        "LEN": "5",
        "DECP": null,
        "DTATYP": "A",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "ADDRESS",
        "VIEWID": "",
        "FTXT": "Country",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Address"
      }, {
        "PGMID": "SCNTRY",
        "SHORTNM": "CACUID",
        "RNMONLY": "",
        "LEN": "10",
        "DECP": null,
        "DTATYP": "S",
        "FLDDBCLS": "D",
        "FLDSCNCLS": "",
        "ENTID": "ADDRESS",
        "VIEWID": "",
        "FTXT": "CustID",
        "FSEQ": "0.000",
        "DIRNM": "",
        "APPNM": "BASE",
        "PGMTX": "Select Country",
        "ENTTX": "Address"
      }];
      const progProps = PgmInfo(localentity[0])
      const colour = checkIfBlueOrRed(d.data.name, DiagramData)
      const class1 = colour === "blue" ? "Program" : "finalProgram"
      const class2 = "largeFont"
      return '<div class=' + class1 + '><h3>' + d.data.name + '</h3></div> <div class='+class2+'>' +progProps+ '</div>';
    })

  // UPDATE
  const nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate
    .attr("transform", function (d) {
      return "translate(" + (d.x - 100) + "," + (d.y - 100) + ")"
    })
    .on("contextmenu", function (d) {
      const container = d3.select(context.MainDiv).node();
      d3.event.preventDefault();
      const position = d3.mouse(container);
      const posX = (position[0] + (10 * scale));
      const posY = position[1];

      d3.select(context.contextMenu)
        .style("top", "" + posY + "px")
        .style("left", "" + posX + "px")
        .style("visibility", "visible")
        .style("z-index", 1);

      const notMainDiv = ".chartCanvas" + context.screenId + ":not(" + context.contextMenu + ")"
      d3.selectAll(notMainDiv)
        .on("click", function (d) {
          const container = d3.select(context.MainDiv).node();
          d3.event.preventDefault();
          const position = d3.mouse(container);

          d3.select(context.contextMenu)
            .style("top", "" + 0 + "px")
            .style("left", "" + 0 + "px")
            .style("visibility", "hidden");
        });
     
      context.pgmName = d.data.name;
      d3.event.stopPropagation();
    });


}

