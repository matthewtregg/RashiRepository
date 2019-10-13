

export const getVarWhereUsedData = (Variable, screenId,repo) => 
({  type: 'GET_VARIABLE_WHERE_USED',
  screenId,
  url:`http://195.224.116.34:5000/findVarWhereUsedSource/${repo}/${Variable}`,
  var: Variable,
  repo
});


export const getFileWhereUsedData = (file, screenId, repo) => ({
  type: 'GET_FILE_WHERE_USED',
  screenId,
  url: `http://195.224.116.34:5000/findEntWhereUsed/${repo}/${file}`,
  file,
  repo
})

export const getPgmWhereUsedData = (pgm, screenId, repo) => ({
    type: 'GET_PGM_WHERE_USED',
    screenId,
    url: `http://195.224.116.34:5000/findPgmWhereUsed/${repo}/${pgm}`,
    pgm, 
    repo
})


export const getFieldWhereUsedData = (field,screenId, repo) => 
  { 
  return ({ type: 'GET_FIELD_WHERE_USED',
  screenId,
  url: `http://195.224.116.34:5000/findFileWhereUsedField/${repo}/${field}`,
  field,
  repo
});
}
export const setWhereUsedType = (type, screenId) => ({
  type: 'SET_WHERE_USED_TYPE',
  whereUsedType: type,
  screenId,
});

