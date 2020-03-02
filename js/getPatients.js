let patientsBasicInfo = 
	[	{	"ID" : "",
			"Name" : ""} ,
		{	"ID" : "",
			"Name" : ""} 
	];

function getPatients() {
	
	const url = "https://178.62.0.181:5001/api/Patient/";
	
    const userAction = async () => {

        const response = await fetch(url);

        switch(response.status) {
            //200 means the REST API successfully carried out whatever action the client requested
            case 200:
                const myJson = await response.json(); //extract JSON from the http response
                return myJson;
            default:
                return "Failed to update";
          }
    }

    userAction().then(myJson => processReturnedData(myJson));
        
}

function processReturnedData(myJson) {
    let patientsBasicInfo = extractPatientsBasicInfo(myJson);
    console.log(patientsBasicInfo);
    //Extract patients' given name to list
    for(let i in patientsBasicInfo) {
    	workSpaceListArray[0].push(patientsBasicInfo[i].name[0].given[0]);
    }
 }

function extractPatientsBasicInfo(myJson) {
	let patientsInfo = [];
	for(let i in myJson) {
		singleBundlePatientsList = myJson[i].entry;
		for(let j in singleBundlePatientsList) {
			patientsInfo.push(singleBundlePatientsList[j].resource);	
		}
	}
	return patientsInfo;
}


getPatients();