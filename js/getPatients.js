let patientsBasicInfo = [{
    "ID": "",
    "Name": ""
}, {
    "ID": "",
    "Name": ""
}];

let tauAnimation = tau.animation.target;
let numberOfUpdatingAttempts = 0;
let limitOfAttempts = 3;

//Determine whether to use patientList saved in localStorage from last initialization, turned off will request the list from cloud every time initializing
let allowReadPatientsListFromLocal = false;

function getPatients() {

    //If a copy of patientsList exist in localStorage, using it directly(May not be the most updated one, update feature can be implements in the future)
    if (allowReadPatientsListFromLocal && localStorage.getItem("patientsList") != null) {
        try {
            PatientsListArray = JSON.parse(localStorage.getItem("patientsList"));
        } catch (e) {
            if (e instanceof SyntaxError) {
                //JSON format error
                localStorage.removeItem("patientsList");
            }
        }
        return;
    }

    //Show initialization page, blur the background
    $("#iniWindowBG")[0].style.visibility = "visible";

    iniWindowBlur(true);

    //Connecting to the API
    changeIniWindowText("Connecting to server...");

    const url = "http://husky1.azurewebsites.net/api/Patient/"; //To trust local, enter 'dotnet dev-certs https --trust' on the API side

    var xmlhttp = new XMLHttpRequest();

    function userAction() {

        let response = "";

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
            	if(this.status == 200) {
                    changeIniWindowText("Reveieved data from server, ");
	                changeIniWindowText("Processing raw data...");
	                const response = this.responseText;
	                const myJson = JSON.parse(this.responseText); //extract JSON from the http response
	                processReturnedData(myJson)
            	} else {
            		  changeIniWindowText("Failed to get data, making another attempt...");
                      if (numberOfUpdatingAttempts < limitOfAttempts) {
                      	userAction();
                      	numberOfUpdatingAttempts++;
                      } else {
                          changeIniWindowText("Achieved maximum number of attempts, updating failed");
                          return;
                      }
            	}
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    userAction();

}

function iniWindowBlur(bool) {
    if (bool) {
        $("#iniWindowBG")[0].style.visibility = "visible";
        $("#iniWindowCurrentTask")[0].style.visibility = "visible";
        let blurValue = "blur(3px)";
        $("#MenuPage_Title")[0].style.filter = blurValue;
        $("#MenuPage_CurrentTime")[0].style.filter = blurValue;
        $("#menuIcon_ALL")[0].style.filter = blurValue;
        $("#menuIcon_Starred")[0].style.filter = blurValue;
    } else {
        $("#MenuPage_Title")[0].style.filter = "none";
        $("#MenuPage_CurrentTime")[0].style.filter = "none";
        $("#menuIcon_ALL")[0].style.filter = "none";
        $("#menuIcon_Starred")[0].style.filter = "none";
    }
}


function processReturnedData(myJson) {
    if (myJson == "Failed to update") {
        return;
    }
    let patientsBasicInfo = extractPatientsBasicInfo(myJson);
    changeIniWindowText("Extracting patients name...");
    //Extract patients' given name to list
    for (let i in patientsBasicInfo) {
        PatientsListArray[0].push(patientsBasicInfo[i].name[0].given[0]);
    }
    changeIniWindowText("Update Complete.");
    //Store patientsList in local storage
    localStorage.setItem("patientsList", JSON.stringify(PatientsListArray))
        //Close iniWindow and remove Blur filter

    //Animation: tranfer the BG's Opacity to zero
    tauAnimation('#iniWindowCurrentTask').tween({
        opacity: [1, 0]
    }, 1000);
    tauAnimation('#iniWindowBG').tween({
        opacity: [0.2, 0]
    }, 1000, {
        onComplete: function() {
            $("#iniWindowBG")[0].style.visibility = "hidden";
            $("#iniWindowCurrentTask")[0].style.visibility = "hidden";
            iniWindowBlur(false);
        }
    });
}

function extractPatientsBasicInfo(myJson) {
    let patientsInfo = [];
    for (let i in myJson) {
        singleBundlePatientsList = myJson[i].entry;
        for (let j in singleBundlePatientsList) {
            patientsInfo.push(singleBundlePatientsList[j].resource);
        }
    }
    return patientsInfo;
}

function changeIniWindowText(text) {
    $("#iniWindowCurrentTask")[0].innerHTML = text;
}


getPatients();