

export const getVarWhereUsedData = (Variable, screenId,repo) => 
({  type: 'GET_VARIABLE_WHERE_USED',
  screenId,
  url:`http://195.224.116.34:5000/findVarWhereUsedSource/${Variable}/${repo}`,
  var: Variable,
  repo
});


export const getFileWhereUsedData = (file, screenId, repo) => ({
  type: 'GET_FILE_WHERE_USED',
  screenId,
  url: `http://195.224.116.34:5000/findEntWhereUsed/${file}/${repo}`,
  file,
  repo
})

export const getPgmWhereUsedData = (pgm, screenId, repo) => ({
    type: 'GET_PGM_WHERE_USED',
    screenId,
    url: `http://195.224.116.34:5000/findPgmWhereUsed/${pgm}/${repo}`,
    pgm, 
    repo
})


export const getFieldWhereUsedData = (field,screenId, repo) => 
  { 
  return ({ type: 'GET_FIELD_WHERE_USED',
  screenId,
  url: `http://195.224.116.34:5000/findFileWhereUsedField/${field}/${repo}`,
  field,
  repo
});
}
export const setWhereUsedType = (type, screenId) => ({
  type: 'SET_WHERE_USED_TYPE',
  whereUsedType: type,
  screenId,
});

