export const getPgmChartDataArray = () => {
  return fetch(`http://195.224.116.34:5000/ProgramStructureChart`)
    .then(res => res.json());

};

export const getPgmDFDDataArray = (pgmId) => {
  return fetch(`http://195.224.116.34:5000/PgmDFD/${pgmId}`)
    .then(res => res.json());
}

export const getEntRelChartData = (EntName) => {
  return fetch(`http://195.224.116.34:5000/EntityRelationshipChart`)
    .then(res => res.json())

};

export const getDFDData = (DFDName) => {
  return fetch(`http://195.224.116.34:5000/${DFDName}`)
    .then(res => res.json());
};

export const getPgmListData = (repoName) => {
  return fetch(`http://195.224.116.34:5000/ProgramList`)
    .then(res => res.json());

}

//http://195.224.116.34:5000/MVXD010/SourceBrowser/PgmCodeData/${pgmName}
export const getPgmSource = (pgmName) => {
  return fetch(`http://195.224.116.34:5000/SourceBrowser/PgmCodeData/${pgmName}`)
    .then(res => res.json())
    .then(res => console.log(res));
}


export const getFullData = (PgmNames) => {
  const fetchRequests = PgmNames.map((PgmName) => fetch(`http://195.224.116.34:5000/ProgramStructureChart/${PgmName}`))
  return Promise.all(fetchRequests).then(values => values.map((value) => value.json()))
}
  

