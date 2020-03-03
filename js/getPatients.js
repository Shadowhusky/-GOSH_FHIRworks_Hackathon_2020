let patientsBasicInfo = 
	[	{	"ID" : "",
			"Name" : ""} ,
		{	"ID" : "",
			"Name" : ""} 
	];

function getPatients() {
	
	//If a copy of patientsList exist in localStorage, using it directly(May not be the most updated one, update feature can be implements in the future)
	if(localStorage.getItem("patientsList")!=null) {
		try{
			PatientsListArray = JSON.parse(localStorage.getItem("patientsList"));
		}catch (e) {
			if(e instanceof SyntaxError) {
				//JSON format error
				localStorage.removeItem("patientsList");
			}
		}
		return;
	}
	
	//Show initialization page, blur the background
	$("#iniWindowBG")[0].style.visibility = "visible";
	
	iniWindowBlur(true);
		
	const url = "https://husky1.azurewebsites.net/api/Patient/";	//To trust local, enter 'dotnet dev-certs https --trust' on the API side
	
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

function iniWindowBlur(bool) {
	if(bool) {
		$("#MenuPage_Title")[0].style.filter="blur(2px)";
		$("#MenuPage_CurrentTime")[0].style.filter="blur(2px)";
		$("#menuIcon_ALL")[0].style.filter="blur(2px)";
		$("#menuIcon_Starred")[0].style.filter="blur(2px)";
	}else{
		$("#MenuPage_Title")[0].style.filter="none";
		$("#MenuPage_CurrentTime")[0].style.filter="none";
		$("#menuIcon_ALL")[0].style.filter="none";
		$("#menuIcon_Starred")[0].style.filter="none";
	}
}


function processReturnedData(myJson) {
    let patientsBasicInfo = extractPatientsBasicInfo(myJson);
    console.log(patientsBasicInfo);
    //Extract patients' given name to list
    for(let i in patientsBasicInfo) {
    	PatientsListArray[0].push(patientsBasicInfo[i].name[0].given[0]);
    }
    //Store patientsList in local storage
    localStorage.setItem("patientsList", JSON.stringify(PatientsListArray))
    //Close iniWindow and remove Blur filter
    $("#iniWindowBG")[0].style.visibility = "hidden";
    iniWindowBlur(false);
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