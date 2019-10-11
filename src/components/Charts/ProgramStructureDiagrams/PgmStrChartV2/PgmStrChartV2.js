import * as d3 from "d3";
import {
  createChildLinks,
  createIndLinks,
  diagonal,
  checkIfBlueOrRed,
  findEndPointRelCoords,
  findRemRelCoords,
  converttocoords
} from '../PgmStrChartUtils';

export const newPgmStrChart2 = (res, context) => {

  const [PgmStrChart, EndPointPgms, EndPointRels, RemRels, Diagram, levelsCount] = res;
  const DiagramData = Diagram.reduce((acc, Obj) => {
    return acc.concat(Obj)
  });

  ///////////////////////new trial
  let width = 9000;
  let treewidth = 8000;
  const MaxLevel = Math.max(...levelsCount) - 15;

  if (MaxLevel > 0) {
    width = 9000 + (MaxLevel * 9000 / 15);
    treewidth = 8000 + (MaxLevel * 8000 / 15);
  }

  const height = 5000;
  const treedepth = 4000;
  const treeLayout = d3.tree()
    .size([treewidth, treedepth])

  ////////////////////////////////////////// 

  const root1 = d3.hierarchy(PgmStrChart, function (d) {
    return d.children;
  });

  const EndPointPgmsWidth = (treewidth) / (EndPointPgms.length);
  const EndPointPgmsDepth = treedepth + (treedepth / Diagram.length);
  let runningLength = 0;
  const newEndPointCoords = EndPointPgms.map((Pgm) => {
    runningLength += EndPointPgmsWidth;
    Pgm.xcoord = runningLength;
    Pgm.ycoord = EndPointPgmsDepth;
    return Pgm;
  })


  d3.select(context.MainDiv).selectAll("svg").remove();


  const svg = d3.select(context.MainDiv).append("svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", "grpmain")
    .attr("transform", "translate(" + 0 + "," + 0 + ") scale(" + context.props.zoomLevel + "," + context.props.zoomLevel + ") ")


  d3.select(".node").classed("visited", false);
  const scale = context.props.zoomLevel;
  const treeData = treeLayout(root1);
  context.centerX = (treeData.x * context.props.zoomLevel)
  context.centerY = (treeData.y * context.props.zoomLevel)
  if (!context.centred) context.props.setChartCentre({
    centerX: context.centerX,
    centerY: context.centerY
  }, context.props.screenId);
  context.centred = true;

  const nodes = treeData.descendants();
  const links = treeData.descendants().slice(1);

  const node = svg.selectAll('g.node')
    .data(nodes, function (d, i) {
      return d.id || (d.id = i);
    })

  const nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr("id", function (d, i) {
      return `grpid${d.data.name}${i}`
    })

  let newEndPointRels = findEndPointRelCoords(EndPointRels, newEndPointCoords, root1.descendants());
  newEndPointRels = newEndPointRels.map((rel) => {
    return converttocoords(rel)
  })

  const PgmInfo = (localentity) => {
    const objProps = Object.keys(localentity)
    return objProps.map((objProp) => {
      return '<p>' + objProp + ':' + localentity[objProp] + '</p>'
    }).join('');

  }


  const Endpointnode = svg.selectAll('g.node2')
    .data(newEndPointCoords, function (d, i) {
      return d.id || (d.id = i);
    })

  const nodeEnter2 = Endpointnode.enter().append('g')
    .attr('class', 'node2')
    .attr("id", function (d, i) {
      return `grpid${i}`
    })


  nodeEnter2.append("foreignObject")
    .attr('width', 300)
    .attr('height', 300)
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
          d3.mouse(container);

          d3.select(context.contextMenu)
            .style("top", "" + 0 + "px")
            .style("left", "" + 0 + "px")
            .style("visibility", "hidden");
        });
      context.pgmName = d.program;
      d3.event.stopPropagation();
    })

  // Add Rectangle for the nodes
  nodeEnter.append("foreignObject")
    .attr('width', 300)
    .attr('height', 300)
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
      return '<div class=' + class1 + '><h3>' + d.data.name + '</h3></div>' + progProps
    })


  // UPDATE
  const nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")"
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
          d3.mouse(container);

          d3.select(context.contextMenu)
            .style("top", "" + 0 + "px")
            .style("left", "" + 0 + "px")
            .style("visibility", "hidden");
        });
      context.pgmName = d.data.name;
      d3.event.stopPropagation();
    });


  svg.selectAll('path.link2')
    .data(newEndPointRels, function (d) {
      return d.id;
    });



  const link = svg.selectAll('path.link')
    .data(links, function (d) {
      return d.id;
    });

  // Enter any new links at the parent's previous position.
  link.enter().insert('path', "g")
    .attr("class", function (d) {
      if (d.data.name === context.HighlightedPgm) return "highlightedLink"
      if (d.parent.data.name === context.HighlightedPgm) return "highlightedLink"
      else return "link"
    })
    .merge(link)
    .attr('d', function (d) {
      return diagonal(d, d.parent)
    });

  const linkOther1 = svg.selectAll('path.highlightedLink')
    .data(links, function (d) {
      return d.id;
    });

  // Enter any new links at the parent's previous position.
  linkOther1.enter().insert('path', "g")
    .attr("class", function (d) {
      if (d.data.name === context.HighlightedPgm) return "highlightedLink"
      if (d.parent.data.name === context.HighlightedPgm) return "highlightedLink"
      else return "link"
    })
    .merge(linkOther1)
    .attr('d', function (d) {
      return diagonal(d, d.parent)
    });


  //create indirect links 
  const coords = findRemRelCoords(RemRels, nodes);
  const newCoords = createIndLinks(coords);
  const finalCoords = createChildLinks(newCoords);
  const finalRemRels = finalCoords.filter((rel) => {
    return (rel.child.y - rel.parent.y > 2000);
  });

  // move parent coords by one for common parents
  const link2 = svg.selectAll('path.link')
    .data(finalRemRels, function (d) {
      return d.id;
    });
  // Enter any new links at the parent's previous position.
  link2.enter().insert('path', "g")
    .attr("class", function (d) {
      if (d.child.name === context.HighlightedPgm) return "highlightedLink"
      if (d.parent.name === context.HighlightedPgm) return "highlightedLink"
      else return "link"
    })
    .merge(link2)
    .attr('d', function (d) {
      return diagonal(d.child, d.parent)
    });


  const linkOther2 = svg.selectAll('path.highlightedLink')
    .data(finalRemRels, function (d) {
      return d.id;
    });

  // Enter any new links at the parent's previous position.
  linkOther2.enter().insert('path', "g")
    .attr("class", function (d) {
      if (d.child.name === context.HighlightedPgm) return "highlightedLink"
      if (d.parent.name === context.HighlightedPgm) return "highlightedLink"
      else return "link"
    })
    .merge(linkOther2)
    .attr('d', function (d) {
      return diagonal(d.child, d.parent)
    });


  const link3 = svg.selectAll('path.link')
    .data(newEndPointRels, function (d) {
      return d.id;
    });
  // Enter any new links at the parent's previous position.
  link3.enter().insert('path', "g")
    .attr("class", function (d) {
      if (d.coords[0] === context.HighlightedPgm) return "highlightedLink"
      if (d.coords[1] === context.HighlightedPgm) return "highlightedLink"
      else return "link"
    })
    .merge(link3)
    .attr('d', function (d) {
      return diagonal(d.coords[0], d.coords[1])
    });

  const linkOther3 = svg.selectAll('path.highlightedLink')
    .data(newEndPointRels, function (d) {
      return d.id;
    });

  // Enter any new links at the parent's previous position.
  linkOther3.enter().insert('path', "g")
    .attr("class", function (d) {
      if (d.coords[0] === context.HighlightedPgm) return "highlightedLink"
      if (d.coords[1] === context.HighlightedPgm) return "highlightedLink"
      else return "link"
    })
    .merge(linkOther3)
    .attr('d', function (d) {
      return diagonal(d.coords[0], d.coords[1])
    });





}