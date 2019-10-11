export const getEndPointCoordsandRemainingRelations = (DiagObjs, CoreRelations, programs) => {
    // split into endpoint and remaining objs
    let EndPointObjs = DiagObjs.map((Obj) => {
        Obj.EndPointPgms = Obj.EndPointPgms.map((ent) => {
            ent.parentXcoord = Obj.xcoord;
            ent.parentYcoord = Obj.ycoord;
            return ent
        })
        return Obj.EndPointPgms;
    });


    EndPointObjs = EndPointObjs.reduce((acc, endpoint) => {
        return acc.concat(endpoint)
    });


    let RemainingObjs = EndPointObjs.filter((endpoint) => {
        return endpoint.endPointPgm === "false"
    });


    EndPointObjs = EndPointObjs.filter((endpoint) => {
        return endpoint.endPointPgm === "true"
    });

    const RemainingRelationsCoords = getRemainingRels(RemainingObjs, DiagObjs, CoreRelations);
    const [EndPointPgms, EntPointRelationsCoords] = getEndPointCoords(EndPointObjs, 8000, programs);

    return [EndPointPgms, EntPointRelationsCoords, RemainingRelationsCoords];
}

function getRemainingRels(RemainingObjs, DiagObjs, CoreRelations) {
    let RemainingRels = RemainingObjs.map((Obj) => {
        const newObj = findCalledPgmCoord(Obj, DiagObjs)
        return newObj
    })

    let RemainingRelationsCoords = RemainingRels.map((rel) => {
        const relID = rel.relID;
        const coords = getcoords(rel.parentXcoord, rel.parentYcoord, rel.xcoord, rel.ycoord);
        let newrel = {
            relID,
            "coords": coords
        }
        return newrel
    })


    CoreRelations = CoreRelations.map((rel) => {
        return rel.relID
    })
    RemainingRelationsCoords = RemainingRelationsCoords.filter((rel) => {
        return !CoreRelations.includes(rel.relID)
    })

    return RemainingRelationsCoords

};

function getEndPointCoords(EndPointObjs, EndPointLevelCoord, programs) {
    let EndPointPgms = EndPointObjs.map((Obj) => {
        return Obj.calledPgm
    })


    EndPointPgms = EndPointPgms.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    });


    //  ycoord should be 1000 below bottom level of diagram     
    let xcoord = 0;
    let ycoord = EndPointLevelCoord;
    // ycoord = bottomLevel +1000
    // add in EntityGap
    EndPointPgms = EndPointPgms.map((pgm) => {
        xcoord = xcoord + 300;
        const FinalPgm = checkIfFinalPgm(pgm, programs)
        const pgmObj = {
            "program": pgm,
            "xcoord": xcoord,
            "ycoord": ycoord,
            "text-xcoord": xcoord + 25,
            "text-ycoord": ycoord + 50,
            "Final_Program": FinalPgm
        }
        return pgmObj
    })

    let EndPointRels = EndPointObjs.map((endpoint) => {
        const endpointRelInfo = createEndPointRel(endpoint, EndPointPgms)
        const endxcoord = endpointRelInfo[0]
        const endycoord = endpointRelInfo[1]
        return {
            "relID": endpoint.parentProgram + ":" + endpoint.calledPgm,
            ...endpoint,
            "xcoord": endxcoord,
            "ycoord": endycoord
        };
    })

    let EntPointRelationsCoords = EndPointRels.map((rel) => {
        const relID = rel.relID;
        const coords = getcoords(rel.parentXcoord, rel.parentYcoord, rel.xcoord, rel.ycoord);
        let newrel = {
            relID,
            "coords": coords
        }
        return newrel
    })

    return [EndPointPgms, EntPointRelationsCoords]
}

function findCalledPgmCoord(RemObj, DiagObjs) {

    let CallingObj = DiagObjs.filter((Obj) => {
        return Obj.program === RemObj.calledPgm
    })[0]
    return {
        "relID": RemObj.parentProgram + ":" + RemObj.calledPgm,
        "calledPgm": RemObj.calledPgm,
        "parentProgram": RemObj.parentProgram,
        "parentXcoord": RemObj.parentXcoord,
        "parentYcoord": RemObj.parentYcoord,
        "xcoord": CallingObj.xcoord,
        "ycoord": CallingObj.ycoord
    }
}

function getcoords(parentX, parentY, childX, childY) {

    let coords = [{
            "x": parentX,
            "y": parentY
        },
        {
            "x": parentX,
            "y": childY - 300,
        },
        {
            "x": childX,
            "y": childY - 300
        }, {
            "x": childX,
            "y": childY
        }
    ]
    return coords
}

function checkIfFinalPgm(pgm, programs) {

    let calledPgms = programs.filter((entry) => {
        return entry.PGMID === pgm
    })
    if (calledPgms.length > 0) {
        return true
    } else {
        return false
    }

}

function createEndPointRel(endpoint, EndPointPgms) {

    let EndPointPgm = EndPointPgms.filter((pgm) => {
        return pgm.program === endpoint.calledPgm
    })[0]
    return [EndPointPgm.xcoord, EndPointPgm.ycoord]

}


