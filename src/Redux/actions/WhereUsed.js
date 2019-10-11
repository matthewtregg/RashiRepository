

export const getVarWhereUsedData = (Variable, screenId, dbname) => 
({  type: 'GET_VARIABLE_WHERE_USED',
  screenId,
  url:`http://195.224.116.34:5000/findVarWhereUsedSource/MVXD008/${Variable}`,
  var: Variable
});


export const getFileWhereUsedData = (file, screenId, dbname) => ({
  type: 'GET_FILE_WHERE_USED',
  screenId,
  url: `http://195.224.116.34:5000/findEntWhereUsed/MVXD008/${file}`,
  file
})

export const getPgmWhereUsedData = (pgm, screenId, dbname) => ({
    type: 'GET_PGM_WHERE_USED',
    screenId,
    url: `http://195.224.116.34:5000/findPgmWhereUsed/MVXD008/${pgm}`,
    pgm
})


export const getFieldWhereUsedData = (field,screenId, dbname) => 
  { 
  return ({ type: 'GET_FIELD_WHERE_USED',
  screenId,
  url: `http://195.224.116.34:5000/findFileWhereUsedField/MVXD008/${field}`,
  field
});
}
export const setWhereUsedType = (type, screenId) => ({
  type: 'SET_WHERE_USED_TYPE',
  whereUsedType: type,
  screenId,
});

