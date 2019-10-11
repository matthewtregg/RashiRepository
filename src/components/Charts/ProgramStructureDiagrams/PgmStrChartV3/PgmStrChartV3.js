
  import * as d3 from "d3";
  import {
    createChildLinks,
    createIndLinks,
    diagonal,
    getPgmCoords,
    checkIfBlueOrRed,
    findEndPointRelCoords,
    findRemRelCoords,
    converttocoords
  } from '../PgmStrChartUtils';


  export const newPgmStrChart3 = (res, context) => {

    const [PgmStrChart, EndPointPgms, EndPointRels, RemRels, Diagram, levelsCount] = res;
    const DiagramData = Diagram.reduce((acc, Obj) => {
      return acc.concat(Obj)
    });

    ///////////////////////new trial
    let width = 9000;
    let treewidth = 8000;
    const MaxLevel = Math.max(...levelsCount) - 15;

    var nodeWidth = 150;
    var nodeHeight = 150;
    var horizontalSeparationBetweenNodes = 70;
    var verticalSeparationBetweenNodes = 150;


    if (MaxLevel > 0) {
      width = 9000 + (MaxLevel * 9000 / 15);
      treewidth = 8000 + (MaxLevel * 8000 / 15);
    }

    const height = 5000;
    const treedepth = 4000;
    const treeLayout = d3.tree()
      .nodeSize([nodeWidth + horizontalSeparationBetweenNodes, nodeHeight + verticalSeparationBetweenNodes])
      .separation(function (a, b) {
        return a.parent === b.parent ? 1 : 1.25;
      })


    ////////////////////////////////////////// 

    const root1 = d3.hierarchy(PgmStrChart, function (d) {
      return d.children;
    });




    d3.select(context.MainDiv).selectAll("svg").remove();


    const svg = d3.select(context.MainDiv).append("svg")
      .attr("id", "svg1")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("id", "grpmain")
      .attr("transform", "translate(" + (5000 * context.props.zoomLevel) + "," + 0 + ") scale(" + context.props.zoomLevel + "," + context.props.zoomLevel + ") ")

    update(EndPointRels, Diagram, EndPointPgms, DiagramData, RemRels, root1, context, svg, treeLayout, context.props.zoomLevel);

  }


  const update = (EndPointRels, Diagram, EndPointPgms, DiagramData, RemRels, source, context, svg, treeLayout, zoomLevel) => {



    d3.select(".node").classed("visited", false);
    const scale = context.props.zoomLevel;
    const treeData = treeLayout(source);

    context.centerX = (treeData.x * context.props.zoomLevel + 5000 * context.props.zoomLevel)
    context.centerY = (treeData.y * context.props.zoomLevel)
    if (!context.centred) context.props.setChartCentre({
      centerX: context.centerX,
      centerY: context.centerY
    }, context.props.screenId);
    context.centred = true;

    const nodes = treeData.descendants();
    const Xcoords = nodes.map((node) => node.x);
    const Ycoords = nodes.map((node) => node.y);
    const treeWidth = Math.max(...Xcoords) - Math.min(...Xcoords)
    const treedepth = Math.max(...Ycoords) - Math.min(...Ycoords)

    const EndPointPgmsWidth = (treeWidth) / (EndPointPgms.length);
    const EndPointPgmsDepth = treedepth + (2 * treedepth / Diagram.length);
    let runningLength = Math.min(...Xcoords);
    const newEndPointCoords = EndPointPgms.map((Pgm, index) => {
      if (index > 0) {
        runningLength += EndPointPgmsWidth;
      }

      Pgm.xcoord = runningLength;
      Pgm.ycoord = EndPointPgmsDepth;
      return Pgm;
    })


    const links = treeData.descendants().slice(1);

    let newEndPointRels = findEndPointRelCoords(EndPointRels, newEndPointCoords, links);
    let newRemRels = findRemRelCoords(RemRels, links)
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
        return '<div class="FinalRectContent"><div class="finalProgram"><h3>' +
          d.program + '</h3></div>' + progProps + '</div>'
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



    nodeEnter.append('text')
      .attr("y", "10")
      .attr("x", function (d) {
        return 60;
      })
      .attr("text-anchor", "middle")
      .text(function (d) {
        return d.data.name
      })
      .attr("dominant-baseline", "central")

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
            const position = d3.mouse(container);

            d3.select(context.contextMenu)
              .style("top", "" + 0 + "px")
              .style("left", "" + 0 + "px")
              .style("visibility", "hidden");
          });
        context.pgmName = d.data.name;
        d3.event.stopPropagation();
      });

    // ****************** links section ***************************
    // Update the links..
    const link = svg.selectAll('path.link')
      .data(links, function (d) {
        return d.id;
      });

    // Enter any new links at the parent's previous position.
    link.enter().insert('path', "g")
      .attr("class", function (d) {
        if (d.data.name === context.HighlightedPgm) return "highlightedLink"
        if (d.parent.data.name === context.HighlightedPgm) return "highlightedLink"
        return "link"
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
        if (d.child.name === context.HighlightedPgm) return "highlightedLink";
        if (d.parent.name === context.HighlightedPgm) return "highlightedLink";
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
        if (d.child.name === context.HighlightedPgm) return "highlightedLink";
        if (d.parent.name === context.HighlightedPgm) return "highlightedLink";
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
        const Pgm1 = d.relID.split(':')[0];
        const Pgm2 = d.relID.split(':')[1];
        if (Pgm1 === context.HighlightedPgm) return "highlightedLink"
        if (Pgm2 === context.HighlightedPgm) return "highlightedLink"
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
        const Pgm1 = d.relID.split(':')[0];
        const Pgm2 = d.relID.split(':')[1];
        if (Pgm1 === context.HighlightedPgm) return "highlightedLink"
        if (Pgm2 === context.HighlightedPgm) return "highlightedLink"
        else return "link"
      })
      .merge(linkOther3)
      .attr('d', function (d) {
        return diagonal(d.coords[0], d.coords[1])
      });






  }