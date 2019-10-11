import * as d3 from "d3";

const getMaxCoords = (boxes) => {
  const [Xcoord, Ycoord] = getBoxCoords(boxes)
  const maxXcoord = Xcoord.length > 0 ? Math.max(...Xcoord) : 2500;
  const maxYcoord = Ycoord.length > 0 ? Math.max(...Ycoord) : 0;
  return [maxXcoord, maxYcoord]
}

const getBoxCoords = (boxes) => {
  const Ycoord = boxes.map(box => box.ycoord)
  const Xcoord = boxes.map(box => box.xcoord)
  return [Xcoord, Ycoord]
}

const getFileBoxesByCol = (FileBoxes, startCoord) => {
  const FirstColBoxes = FileBoxes.filter(box => box.xcoord === startCoord)
  const SecondColBoxes = FileBoxes.filter(box => box.xcoord !== startCoord)
  return [FirstColBoxes, SecondColBoxes]
}

const getMaxMinFileBoxCoords = (InputFileBoxes, OutputFileBoxes) => {
  const [InputFileBoxXcoord, InputFileBoxYcoord] = getBoxCoords(InputFileBoxes)
  const [OutputFileBoxXcoord, OutputFileBoxYcoord] = getBoxCoords(OutputFileBoxes)
  const InputFileMaxBoxXcoord = Math.max(...InputFileBoxXcoord)
  const OutputFileMinBoxXcoord = Math.min(...OutputFileBoxXcoord)
  const fileBoxYcoord = InputFileBoxYcoord.concat(OutputFileBoxYcoord)
  const maxfileBoxYcoord = fileBoxYcoord.length > 0 ? Math.max(...fileBoxYcoord) : 1000;
  return [maxfileBoxYcoord, OutputFileMinBoxXcoord, InputFileMaxBoxXcoord]
}


const getXcoordGroups = (PgmBoxes) => {
  return PgmBoxes.reduce((acc, box) => {
    const ind = "xcoord" + box.xcoord
    if (acc[ind]) acc[ind] += 1;
    else acc[ind] = 1;
    return acc
  }, {})

}

const getSingleBoxes = (PgmxCoordGroups, PgmBoxes) => {
  const singlePgmBoxes = Object.keys(PgmxCoordGroups).filter(key => PgmxCoordGroups[key] === 1)
  const singleXcoord = singlePgmBoxes.map(xcoord => parseInt(xcoord.match(/[0-9]+/)))
  return singleXcoord.length > 0 ? singleXcoord.map(xcoord => PgmBoxes.filter(box => box.xcoord === xcoord)).reduce((acc, obj) => acc.concat(obj)) : []
}

const getRemBoxes = (PgmxCoordGroups, PgmBoxes) => {
  const remCalledPgmBoxes = Object.keys(PgmxCoordGroups).filter(key => PgmxCoordGroups[key] !== 1)
  const remCalledXcoord = remCalledPgmBoxes.map(xcoord => parseInt(xcoord.match(/[0-9]+/)))
  return remCalledXcoord.length > 0 ? remCalledXcoord.map(xcoord => PgmBoxes.filter(box => box.xcoord === xcoord)).reduce((acc, obj) => acc.concat(obj)) : [];
}

const separateBetweenBoxes = (CalledPgmBoxes, CallingPgmBoxes) => {
  // create Pgm Line boxes 
  const calledPgmxCoordGroups = getXcoordGroups(CalledPgmBoxes)
  const callingPgmxCoordGroups = getXcoordGroups(CallingPgmBoxes)
  const singleCalledBoxes = getSingleBoxes(calledPgmxCoordGroups, CalledPgmBoxes);
  const remCalledBoxes = getRemBoxes(calledPgmxCoordGroups, CalledPgmBoxes);
  const singleCallingBoxes = getSingleBoxes(callingPgmxCoordGroups, CallingPgmBoxes);
  const remCallingBoxes = getRemBoxes(callingPgmxCoordGroups, CallingPgmBoxes);

  return [singleCalledBoxes, remCalledBoxes, singleCallingBoxes, remCallingBoxes]
}


export const createDFDChart = (data, context, Pgm) => {

  d3.select(context.MainDiv).selectAll("svg").remove();

  const pgms = data.DFDPgmInfo;
  const centralSchema = data.centralSchema;

  let callingPgms = pgms.filter(pgm => pgm.PGMID!==Pgm);
  let calledPgms = pgms.filter(pgm => pgm.PGMID==Pgm);
  
  let nonDuplicateFiles = data.DFDFileInfo.filter(file => file.VIEWID!=="");
  let prevfiles = [];

  if (nonDuplicateFiles.length > 0 ){
    nonDuplicateFiles = nonDuplicateFiles.filter(file => {
      if (prevfiles.includes(file.VIEWID)) return false;
      else prevfiles.push(file.VIEWID);
      return true;
    })
  }
  
  let inputFiles = nonDuplicateFiles.filter(file => file.WHFUSG === "1");
  let outputFiles = nonDuplicateFiles.filter(file => file.WHFUSG !== "1");

  let prevpgms = [];
  if (callingPgms.length > 0) {
    callingPgms = callingPgms.filter(pgm => {
      if (prevpgms.includes(pgm.PGMID)) return false;
      else prevpgms.push(pgm.PGMID);
      return true
    })
  }
  prevpgms = [];
  if (calledPgms.length > 0) {
    calledPgms = calledPgms.filter(pgm => {
      if (prevpgms.includes(pgm.CLDPGM)) return false;
      else prevpgms.push(pgm.CLDPGM);
      return true;
    })
  }
  //getCallingPgmBoxes
  const [CallingPgmBoxes, _] = createPgmCoords(callingPgms, 1100, -300, 450, 5);
  const [CallingPgmBoxmaxXcoord, CallingPgmBoxmaxYcoord] = getMaxCoords(CallingPgmBoxes)

  const InputfileBoxes = createFileCoords(inputFiles, 0, CallingPgmBoxmaxYcoord + 50);
  const [FirstColInputBoxes, SecondColInputBoxes] = getFileBoxesByCol(InputfileBoxes, 0)

  const OutputfileBoxes = createFileCoords(outputFiles, CallingPgmBoxmaxXcoord + 600, CallingPgmBoxmaxYcoord + 50);
  const [FirstColOutputBoxes, SecondColOutputBoxes] = getFileBoxesByCol(OutputfileBoxes, CallingPgmBoxmaxXcoord + 600)
  const [maxfileBoxYcoord, OutputfileMinBoxXcoord, InputfileMaxBoxXcoord] = getMaxMinFileBoxCoords(InputfileBoxes, OutputfileBoxes)

  // get Called PgmBoxes
  const [CalledPgmBoxes, Yadjust] = createPgmCoords(calledPgms, 1100, maxfileBoxYcoord + 50, -450, 5)
  CalledPgmBoxes.forEach(box => {
    box.ycoord += Yadjust - 900;
    return box
  })

  // create center Box
  const centerBoxX = (CallingPgmBoxmaxXcoord + 1100) / 2;
  const centerBoxY = (maxfileBoxYcoord + CallingPgmBoxmaxYcoord + 600) / 2;
  const centerBox = [{
    xcoord: centerBoxX,
    ycoord: centerBoxY
  }]

  context.centerX = (centerBox[0].xcoord * context.props.zoomLevel);
  context.centerY = (centerBox[0].ycoord * context.props.zoomLevel);


  if (!context.centred) {
  context.props.setChartCentre({
    centerX: context.centerX,
    centerY: context.centerY
  }, context.props.screenId);
  context.props.changeLoadedStatus(context.props.screenId);
  context.centred = true; } 
  else {
  // sort by X 
  const [singleCalledBoxes, remCalledBoxes, singleCallingBoxes, remCallingBoxes] = separateBetweenBoxes(CalledPgmBoxes, CallingPgmBoxes)

  const svg = d3.select(context.MainDiv).append("svg")
    .attr("id", "svg1")
    .attr("width", 10000000)
    .attr("height", 200000000)
    .append("g")
    .attr("id", "grpmain")
    .attr("transform", "translate(" + 300 + "," + 0 + ") scale("+ context.props.zoomLevel + "," + context.props.zoomLevel +" )  ");

  // getTopCoords 
  const g6 = svg.append("g");
  const g7 = svg.append("g");
  const g8 = svg.append("g");
  const g9 = svg.append("g");
  const g10 = svg.append("g");
  const g11 = svg.append("g");
  const g12 = svg.append("g");
  const g13 = svg.append("g");

  const callingNodes = svg.selectAll('g.node')
    .data(CallingPgmBoxes, function (d, i) {
      return d.id || (d.id = i);
    })

  const nodeEnter = callingNodes.enter().append('g')
    .attr('class', 'node2')
    .attr("id", function (d, i) {
      return `grpid${i}`
    })

  nodeEnter.append("foreignObject")
    .attr('width', 310)
    .attr('height', 310)
    .append('xhtml:div')
    .attr('class', function (d) {
      return 'FinalRectContent2'
    })
    .style('overflow-y', 'scroll')
    .html(function (d) {
      return '<div class="callingProgram"><h3>' +
        d.pgmBoxData.PGMID + '</h3></div>'
    })

  const nodeUpdate = nodeEnter.merge(callingNodes);

  // Transition to the proper position for the node
  nodeUpdate.attr("transform", function (d) {
      return "translate(" + (d.xcoord) + "," + (d.ycoord) + ") scale(1.8,1.8)"
    })
    .on("contextmenu", function (d) {
      const container = d3.select(context.MainDiv).node();
      d3.event.preventDefault();
      const position = d3.mouse(container);
      const posX = (position[0]);
      const posY = position[1];


      d3.select(context.contextMenu)
        .style("top", "" + posY + "px")
        .style("left", "" + posX + "px")
        .style("visibility", "visible")
        .style("z-index", 1);

      const notMainDiv = ".DFDchartCanvas" + context.screenId + ":not(" + context.contextMenu + ")"
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
      context.pgm = true;
      context.pgmName = d.pgmBoxData.PGMID.trim();
      d3.event.stopPropagation();
    });

  const calledNodes = svg.selectAll('g.node')
    .data(CalledPgmBoxes, function (d, i) {
      return d.id || (d.id = i);
    })

  const nodeEnter2 = calledNodes.enter().append('g')
    .attr('class', 'node2')
    .attr("id", function (d, i) {
      return `grpid${i}`
    })

  nodeEnter2.append("foreignObject")
    .attr('width', 310)
    .attr('height', 310)
    .append('xhtml:div')
    .attr('class', function (d) {
      return 'FinalRectContent2'
    })
    .style('overflow-y', 'scroll')
    .html(function (d) {
      return '<div class="calledProgram"><h3>' +
        d.pgmBoxData.CLDPGM + '</h3></div>' +
        '<div> <div>'
    })



  const nodeUpdate2 = nodeEnter2.merge(calledNodes);

  // Transition to the proper position for the node
  nodeUpdate2
    .attr("transform", function (d) {
      return "translate(" + (d.xcoord) + "," + (d.ycoord) + ") scale(1.8,1.8)"
    })
    .on("contextmenu", function (d) {
      const container = d3.select(context.MainDiv).node();
      d3.event.preventDefault();
      const position = d3.mouse(container);
      const posX = (position[0]);
      const posY = position[1];

      d3.select(context.contextMenu)
        .style("top", "" + posY + "px")
        .style("left", "" + posX + "px")
        .style("visibility", "visible")
        .style("z-index", 1);

      const notMainDiv = ".DFDchartCanvas" + context.screenId + ":not(" + context.contextMenu + ")"
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
      context.pgm = true;
      context.pgmName = d.pgmBoxData.CLDPGM.trim();
      d3.event.stopPropagation();
    });

  const inputFileNodes = svg.selectAll('g.node')
    .data(InputfileBoxes, function (d, i) {
      return d.id || (d.id = i);
    })

  const nodeEnter3 = inputFileNodes.enter().append('g')
    .attr('class', 'node2')
    .attr("id", function (d, i) {
      return `grpid${i}`
    })

  nodeEnter3.append("foreignObject")
    .attr('width', 310)
    .attr('height', 310)
    .append('xhtml:div')
    .attr('class', function (d) {
      return 'FinalRectContent2'
    })
    .style('overflow-y', 'scroll')
    .html(function (d) {
      return '<div class="inputFile"><h3>' + d.fileData.VIEWID + '(' + d.fileData.ENTID + ')</h3></div>'
    })


  const nodeUpdate3 = nodeEnter3.merge(inputFileNodes);

  // Transition to the proper position for the node
  nodeUpdate3
    .attr("transform", function (d) {
      return "translate(" + (d.xcoord - 200) + "," + (d.ycoord) + ") scale(1.8,1.8)"
    })
    .on("contextmenu", function (d) {
      const container = d3.select(context.MainDiv).node();
      d3.event.preventDefault();
      const position = d3.mouse(container);
      const posX = (position[0]);
      const posY = position[1];


      d3.select(context.contextMenu)
        .style("top", "" + posY + "px")
        .style("left", "" + posX + "px")
        .style("visibility", "visible")
        .style("z-index", 1);

      const notMainDiv = ".DFDchartCanvas" + context.screenId + ":not(" + context.contextMenu + ")"
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
      
      context.fileName = d.fileData.VIEWID;
      context.pgm = false;
      context.entName = d.fileData.ENTID;
      if (context.entName) context.entName = context.entName.trim();
      d3.event.stopPropagation();
    });

  const outputFileNodes = svg.selectAll('g.node')
    .data(OutputfileBoxes, function (d, i) {
      return d.id || (d.id = i);
    })

  const nodeEnter4 = outputFileNodes.enter().append('g')
    .attr('class', 'node2')
    .attr("id", function (d, i) {
      return `grpid${i}`
    })

  nodeEnter4.append("foreignObject")
    .attr('width', 310)
    .attr('height', 310)
    .append('xhtml:div')
    .attr('class', function (d) {
      return 'FinalRectContent2'
    })
    .style('overflow-y', 'scroll')
    .html(function (d) {
      return '<div class="outputFile"><h3>' + d.fileData.VIEWID + '(' + d.fileData.ENTID + ')</h3></div>'
    })

  const nodeUpdate4 = nodeEnter4.merge(outputFileNodes);

  // Transition to the proper position for the node
  nodeUpdate4
    .attr("transform", function (d) {
      return "translate(" + (d.xcoord) + "," + (d.ycoord) + ") scale(1.8,1.8)"
    })
    .on("contextmenu", function (d) {
      const container = d3.select(context.MainDiv).node();
      d3.event.preventDefault();
      const position = d3.mouse(container);
      const posX = (position[0]);
      const posY = position[1];

      d3.select(context.contextMenu)
        .style("top", "" + posY + "px")
        .style("left", "" + posX + "px")
        .style("visibility", "visible")
        .style("z-index", 1);

      const notMainDiv = ".DFDchartCanvas" + context.screenId + ":not(" + context.contextMenu + ")"
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
      context.entName = d.fileData.ENTID;
      if (context.entName) context.entName = context.entName.trim();
      context.fileName = d.fileData.VIEWID;
      context.pgm = false;
      d3.event.stopPropagation();
    });
  const centerNodes = svg.selectAll('g.node')
    .data(centerBox, function (d, i) {
      return d.id || (d.id = i);
    })

  const nodeEnter5 = centerNodes.enter().append('g')
    .attr('class', 'node2')
    .attr("id", function (d, i) {
      return `grpid${i}`
    })

  nodeEnter5.append("foreignObject")
    .attr('width', 620)
    .attr('height', 400)
    .append('xhtml:div')
    .attr('class', function (d) {
      return 'FinalRectContent3';
    })
    .style('overflow-y', 'scroll')
    .html(function (d) {
      return '<div class="centerProgram"><h3>' +
        Pgm + '</h3></div>';
    })

  const nodeUpdate5 = nodeEnter5.merge(centerNodes);
  
  // Transition to the proper position for the node
  nodeUpdate5
    .attr("transform", function (d) {
      return "translate(" + (d.xcoord - 350) + "," + (d.ycoord - 250) + ") scale(1.8,1.8)"
    })
    .on("contextmenu", function (d) {
      const container = d3.select(context.MainDiv).node();
      d3.event.preventDefault();
      const position = d3.mouse(container);
      const posX = (position[0]);
      const posY = position[1];
      d3.select(context.contextMenu)
        .style("top", "" + posY + "px")
        .style("left", "" + posX + "px")
        .style("visibility", "visible")
        .style("z-index", 1);

      const notMainDiv = ".DFDchartCanvas" + context.screenId + ":not(" + context.contextMenu + ")"
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
      d3.event.stopPropagation();
    });






  // single links 
  const link = g6.selectAll("path.link")
    .data(remCalledBoxes, function (d) {
      return d.id;
    })

  const calledPgmPath = (center, child, initialY) => {
    const initialX = center[0].xcoord + 150;
    const firstLineY = initialY;
    const secondLineX = child.xcoord - 25;
    const thirdLineY = child.ycoord + 150;
    const fourthLineX = child.xcoord + 150;
    const path = `M ${initialX} ${center[0].ycoord}
                  L ${initialX} ${firstLineY}
                  L ${secondLineX} ${firstLineY}
                  L ${secondLineX} ${thirdLineY}
                  L ${fourthLineX} ${thirdLineY}`
    return path;
  }

  link.enter().insert('path')
    .attr("class", "link")
    .merge(link)
    .attr('d', function (d) {
      return calledPgmPath(centerBox, d, maxfileBoxYcoord + 450)
    });

  const singleLink = g12.selectAll("path.link")
    .data(singleCalledBoxes, function (d) {
      return d.id;
    })

  const calledSinglePath = (center, child, initialY) => {
    const initialX = center[0].xcoord + 150;
    const firstLineY = initialY;
    const secondLineX = child.xcoord + 200;
    const thirdLineY = child.ycoord;
    const path = `M ${initialX} ${center[0].ycoord}
                   L ${initialX} ${firstLineY}
                   L ${secondLineX} ${firstLineY}
                   L ${secondLineX} ${thirdLineY}
                   `
    return path;
  }

  singleLink.enter().insert('path')
    .attr("class", "link")
    .merge(singleLink)
    .attr('d', function (d) {
      return calledSinglePath(centerBox, d, maxfileBoxYcoord + 450)
    });

  const link2 = g7.selectAll("path.link")
    .data(remCallingBoxes, function (d) {
      return d.id;
    })

  const callingPgmPath = (center, child, initialY) => {
    const initialX = center[0].xcoord + 150;
    const firstLineY = initialY;
    const secondLineX = child.xcoord - 25;
    const thirdLineY = child.ycoord + 150;
    const fourthLineX = child.xcoord + 150;
    const path = `M ${initialX} ${center[0].ycoord}
                  L ${initialX} ${firstLineY}
                  L ${secondLineX} ${firstLineY}
                  L ${secondLineX} ${thirdLineY}
                  L ${fourthLineX} ${thirdLineY}`
    return path;
  }

  link2.enter().insert('path')
    .attr("class", "link")
    .merge(link2)
    .attr('d', function (d) {
      return callingPgmPath(centerBox, d, CallingPgmBoxmaxYcoord + 450)
    });

  const singleLink2 = g13.selectAll("path.link")
    .data(singleCallingBoxes, function (d) {
      return d.id;
    })

  const callingSinglePath = (center, child, initialY) => {
    const initialX = center[0].xcoord + 150;
    const firstLineY = initialY;
    const secondLineX = child.xcoord + 200;
    const thirdLineY = child.ycoord;
    const path = `M ${initialX} ${center[0].ycoord}
                   L ${initialX} ${firstLineY}
                   L ${secondLineX} ${firstLineY}
                   L ${secondLineX} ${thirdLineY}
                   `
    return path;
  }

  singleLink2.enter().insert('path')
    .attr("class", "link")
    .merge(singleLink2)
    .attr('d', function (d) {
      return callingSinglePath(centerBox, d, CallingPgmBoxmaxYcoord + 450)
    });

  const InputFilePathFirstCol = (center, child, initialX) => {
    const initialY = center[0].ycoord + 150;
    const firstLineX = initialX;
    const secondLineY = child.ycoord - 25;
    const thirdLineX = child.xcoord + 150;
    const fourthLineY = child.ycoord + 150;
    const path = `M ${center[0].xcoord} ${initialY}
                  L ${firstLineX} ${initialY}
                  L ${firstLineX} ${secondLineY}
                  L ${thirdLineX} ${secondLineY}
                  L ${thirdLineX} ${fourthLineY}`
    return path;
  }

  const link3 = g8.selectAll("path.link")
    .data(FirstColInputBoxes, function (d) {
      return d.id;
    })

  link3.enter().insert('path')
    .attr("class", "link")
    .merge(link3)
    .attr('d', function (d) {
      return InputFilePathFirstCol(centerBox, d, InputfileMaxBoxXcoord + 450)
    });

  const InputFilePathSecondCol = (center, child, initialX) => {

    const initialY = center[0].ycoord + 150;
    const firstLineX = initialX;
    const secondLineY = child.ycoord + 150;
    const thirdLineX = child.xcoord
    const path = `M ${center[0].xcoord-300} ${initialY}
                  L ${firstLineX} ${initialY}
                  L ${firstLineX} ${secondLineY}
                  L ${thirdLineX} ${secondLineY}`
    return path;
  }

  const link4 = g9.selectAll("path.link")
    .data(SecondColInputBoxes, function (d) {
      return d.id;
    })

  link4.enter().insert('path')
    .attr("class", "link")
    .merge(link4)
    .attr('d', function (d) {
      return InputFilePathSecondCol(centerBox, d, InputfileMaxBoxXcoord + 450)
    });

  const OutputFilePathFirstCol = (center, child, initialX) => {
    const initialY = center[0].ycoord + 150;
    const firstLineX = initialX;
    const secondLineY = child.ycoord - 25;
    const thirdLineX = child.xcoord + 150;
    const fourthLineY = child.ycoord + 150;
    const path = `M ${center[0].xcoord} ${initialY}
              L ${firstLineX} ${initialY}
              L ${firstLineX} ${secondLineY}
              L ${thirdLineX} ${secondLineY}
              L ${thirdLineX} ${fourthLineY}`
    return path;
  }

  const link5 = g10.selectAll("path.link")
    .data(SecondColOutputBoxes, function (d) {
      return d.id;
    })

  link5.enter().insert('path')
    .attr("class", "link")
    .merge(link5)
    .attr('d', function (d) {
      return OutputFilePathFirstCol(centerBox, d, OutputfileMinBoxXcoord - 150)
    });

  const OutputFilePathSecondCol = (center, child, initialX) => {

    const initialY = center[0].ycoord + 150;
    const firstLineX = initialX;
    const secondLineY = child.ycoord + 150;
    const thirdLineX = child.xcoord
    const path = `M ${center[0].xcoord-300} ${initialY}
                  L ${firstLineX} ${initialY}
                  L ${firstLineX} ${secondLineY}
                  L ${thirdLineX} ${secondLineY}`
    return path;
  }


  const link6 = g11.selectAll("path.link")
    .data(FirstColOutputBoxes, function (d) {
      return d.id;
    })

  link6.enter().insert('path')
    .attr("class", "link")
    .merge(link6)
    .attr('d', function (d) {
      return OutputFilePathSecondCol(centerBox, d, OutputfileMinBoxXcoord - 150)
    });
  }
}



const createFileCoords = (files, initialX, initialY, xGap, yGap) => {
  let i = 0;
  let ycoord = initialY;
  let xcoord = initialX;
  let inputFilesBox = [];
  let fileData = {};
  while (i < files.length) {
    if (i % 2 === 0) {
      ycoord += 450;
      xcoord = initialX;
    } else {
      xcoord = initialX + 750;
    }
    fileData = files[i];
    inputFilesBox.push({
      xcoord,
      ycoord,
      fileData
    })
    i++
  }
  return inputFilesBox;
}

// generalize change for larger call stacks x> 100 

const createPgmCoords = (pgms, initialX, initialY, ymovement, n) => {
  let i = 0
  let ycoord = initialY;
  let xcoord = initialX;
  let pgmBox = [];
  let pgmLineBox = [];
  let Yadjust = 0;
  let Box = {};
  let midpoint = 0;
  let startIndex = 0;
  let pgmBoxIndex = 0;
  let pgmBoxData = {};
  while (i < pgms.length) {

    if (i % n === 0) {
      if (ymovement < 0) {
        Yadjust += 450;
      }

      if (pgmBox.length > 0) {
        pgmBox = pgmBox.map((box) => {
          box.ycoord += ymovement
          return box;
        })
      }
      pgmBox = pgmBox.concat(pgmLineBox);
      ycoord = initialY + 900;
      midpoint = (initialX + ((n - 1) * 750) / 2);
      startIndex = i;
      pgmBoxIndex = startIndex;
      pgmBoxData = pgms[i];
      pgmLineBox = [{
        xcoord: midpoint,
        ycoord,
        pgmBoxData
      }];
    } else {

      if ((i % n) % 2 === 1) {
        let tempXcoord1 = 0;
        pgmLineBox = [];
        pgmBoxIndex = startIndex;
        for (let j = 0; j <= i % n; j++) {
          pgmBoxData = pgms[pgmBoxIndex];
          tempXcoord1 = (midpoint - ((i % n - 1) * 375) - 375 + (j * 750));
          Box = {
            xcoord: tempXcoord1,
            ycoord: ycoord,
            pgmBoxData
          };
          pgmLineBox.push(Box);
          pgmBoxIndex++;
        }
      } else {
        let tempXcoord2 = 0;
        pgmLineBox = []
        pgmBoxIndex = startIndex;
        for (let j = 0; j <= i % n; j++) {
          pgmBoxData = pgms[pgmBoxIndex];
          tempXcoord2 = (midpoint - ((i % n) * 375) + (j * 750));
          Box = {
            xcoord: tempXcoord2,
            ycoord: ycoord,
            pgmBoxData
          };
          pgmLineBox.push(Box);
          pgmBoxIndex++;

        }
      }

    }

    i++;
  }

  if (pgmBox.length > 0 && pgmLineBox.length > 0) {
    pgmBox = pgmBox.map((box) => {
      box.ycoord += ymovement
      return box;
    })
    pgmBox = pgmBox.concat(pgmLineBox)
  } else if (pgmBox.length === 0 && pgmLineBox.length > 0) {
    pgmBox = pgmLineBox
  }
  return [pgmBox, Yadjust];

}
  
  


    

    