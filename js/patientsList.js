var PatientsListArray_Default = [//All patients' given name
                            		[],
        	                    //Starred
        	                    	[]	,
        	                    //Starred index
        	                    	[]	];	

var PatientsListArray = [//All patients' given name
                       		[],
	                    //Starred
	                    	[]	,
	                    //Starred index
	                    	[]	];	

var PatientsList_SelectedType=0;

var patientsList_currentLetterCode = 'B'.charCodeAt(0);

//Determine wether the hold timer is beening triggered
var holdTimerStatus = false;

function init(){
	updateWorkSpaceLetterSelector();
	updatePatientsList("B");
	addWorkSpaceListScrollEvent();
}

function addWorkSpaceListScrollEvent() {
	
	var scrollEvent = function(){
		var scrollTop = document.getElementById("patientsList").scrollTop;
		if(scrollTop>10) {
			document.getElementById("patientsList_Page_Title").style.visibility="hidden";
			document.getElementById("patientsList_Page_CurrentTime").style.visibility="hidden";
		}else{
			document.getElementById("patientsList_Page_Title").style.visibility="visible";
			document.getElementById("patientsList_Page_CurrentTime").style.visibility="visible";
		}
	}
	document.getElementById("patientsList").addEventListener("scroll", scrollEvent);
	
}

function showPatientDetails(index) {
	if(patientsBasicInfo[index] == null) {
		return;
	}
	//Extract and display patient's details
	let identifiers  = patientsBasicInfo[index].identifier;
	
	let detailsList = $("#patientDetailsList")[0];
	
	let listCreated = false;
	if(detailsList.childElementCount>0) listCreated = true;
	for(let i=1; i<5; i++) {
		let detail = null;
		if(listCreated) {
			let j = (i-1)*2;
			detail = detailsList.children[j];
			detailValue = detailsList.children[j+1];
		} else {
			detail = document.createElement("li");
			detail.classList.add("patientDetailsListItem_Key");
			
			detailValue = document.createElement("li");
			detailValue.classList.add("patientDetailsListItem_Value");
			
			detailsList.appendChild(detail);
			detailsList.appendChild(detailValue);
		}
		if(identifiers[i] == null)	{
			detail.innerHTML = "";
			detailValue.innerHTML = "";
		} else {
			detail.innerHTML = identifiers[i].type.text+":";
			detailValue.innerHTML = identifiers[i].value
		}
	}
	
	tau.changePage("#patientDetailsPage");

}

let holdTimer=0;

function updatePatientsList(startLetter){
	var container = document.getElementById("patientsList");
	var top = "22vw";
	container.innerHTML = "";
	var selectedPatientsList = PatientsListArray[PatientsList_SelectedType];
	for(let i=0;i<selectedPatientsList.length;i++){
		if(selectedPatientsList[i].charAt(0)!=startLetter) continue;
		let patient = document.createElement("div");
		let patientName = document.createElement("p");
		patient.classList.add("patientsList_Background");
		patient.style.top = top;
		//If patient is starred, highlight it
		if(PatientsListArray[1].includes(PatientsListArray[0][i])) {
			patient.style.backgroundColor = "rgba(200, 200, 0, 0.35)";
		}
		
		//Onhold event, hold to star a patient
		patient.addEventListener("touchstart", function(){
			patientsListMouseDown(patient, patientName, i);
		});
		patient.addEventListener("touchend", () => {patientsListMouseUp(i);});
		
		patientName.addEventListener("touchstart", function(){
			patientsListMouseDown(patient, patientName, i);
		});
		patientName.addEventListener("touchend", () => {patientsListMouseUp(i);});

		patientName.classList.add("patientsList_patientName");
		patientName.innerHTML = selectedPatientsList[i];
		patientName.style.top = (parseInt(top)+0.8)+"vw";
		container.appendChild(patientName);
		container.appendChild(patient);
		top=(parseInt(top)+20)+"vw";
	}
}

function patientsListMouseDown(patient, patientName, i) { 
	holdTimerStatus = true;
    holdTimer = setTimeout(function(){
    	starPatient(patient, patientName, i);
    	holdTimerStatus = false;
    },1000); //set timeout to fire in 2 seconds when the user presses mouse button down
    
}

function patientsListMouseUp(i) { 
	if(holdTimerStatus === true) {
		PatientsList_SelectedType == 0 ? showPatientDetails(i) : showPatientDetails(PatientsListArray[2][i]);
	}
	clearTimeout(holdTimer);  //cancel timer when mouse button is released
}

function starPatient(patient, patientName, index){
	var t = tau.animation.target;
	if(PatientsList_SelectedType==1) {
		PatientsListArray[1].splice(index, 1);
    	//Store the updated patientsList
    	localStorage.setItem("patientsList", JSON.stringify(PatientsListArray));
    	t(patient).tween('zoomOut', 500);
    	t(patientName).tween('zoomOut', 500);
    	return;
	}
	//Starring animation
	t(patientName).tween('tada', 800);
	let patientStr = PatientsListArray[0][index];
	if(PatientsListArray[1].includes(patientStr)) {
		var i = PatientsListArray[1].indexOf(patientStr);
	    if (i > -1) {
	    	PatientsListArray[1].splice(i, 1);
	    	//Store the updated patientsList
	    	localStorage.setItem("patientsList", JSON.stringify(PatientsListArray));
	    	//Reset the background
	    	patient.style.backgroundColor = "rgba(150, 150, 150, 0.2)";
	    }
	    return;
	}
	patient.style.backgroundColor = "rgba(200, 200, 0, 0.35)";
	//Push the index of starred patient
	PatientsListArray[1].push(patientStr)
	PatientsListArray[2].push(index);
	//Store the updated patientsList
	localStorage.setItem("patientsList", JSON.stringify(PatientsListArray));
}


var patientsList_PreviousLetterElement = document.getElementById("patientsListPage").querySelector("#PreviousLetter");
var patientsList_CurrentLetterElement = document.getElementById("patientsListPage").querySelector("#CurrentLetter");
var patientsList_NextLetterElement = document.getElementById("patientsListPage").querySelector("#NextLetter");

function updateWorkSpaceLetterSelector() {
	if(patientsList_currentLetterCode < 'A'.charCodeAt(0)) {
		patientsList_currentLetterCode = 'A'.charCodeAt(0);
		return;
	}
	if(patientsList_currentLetterCode > 'Z'.charCodeAt(0)) {
		patientsList_currentLetterCode = 'Z'.charCodeAt(0);
		return;
	}
	var previousLetter = patientsList_currentLetterCode-1 < ( 'A'.charCodeAt(0) ) ? 32/*White space*/ : patientsList_currentLetterCode-1;
	var NextLetter = patientsList_currentLetterCode+1 > ( 'Z'.charCodeAt(0) ) ? 32/*White space*/ : patientsList_currentLetterCode+1;
	patientsList_PreviousLetterElement.innerHTML=String.fromCharCode(previousLetter);
	patientsList_CurrentLetterElement.innerHTML=String.fromCharCode(patientsList_currentLetterCode);
	patientsList_NextLetterElement.innerHTML=String.fromCharCode(NextLetter);
	updatePatientsList(String.fromCharCode(patientsList_currentLetterCode));
}

function iniWorkSpaceList(type) {
	if(type=="All") {
		PatientsList_SelectedType = 0;
		document.getElementById("patientsList_Page_Title").innerHTML="All"
	}else if(type=="Starred") {
		PatientsList_SelectedType = 1;
		document.getElementById("patientsList_Page_Title").innerHTML="Starred"
	}
	updatePatientsList(String.fromCharCode(patientsList_currentLetterCode));
}

function selectWorkSpaceType(type) {
		tau.changePage("patientsListPage");
		iniWorkSpaceList(type);
}

window.onload=init();



