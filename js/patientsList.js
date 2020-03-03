var PatientsListArray = [//All patients
                         	[],
                         //Starred
                         	[]	];	

var PatientsList_SelectedType=0;

var patientsList_currentLetterCode = 'B'.charCodeAt(0);

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

function showPatientDetails(type,index) {
//	tau.changePage("#patientDetailsPage");
//	document.getElementById("patientDetailsPage").querySelector(".Details_Page_Position").innerHTML=PatientsListArray[type][index];
}

let holdTimer=0;

function updatePatientsList(startLetter){
	var container = document.getElementById("patientsList");
	var top = "29vw";
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
		
		patient.addEventListener("click",function(){
			showPatientDetails(PatientsList_SelectedType,i);
		});
		
		//Onhold event, hold to star a patient
		patient.addEventListener("mousedown", function(){
			patientsListMouseDown(patient, patientName, i);
		});
		patient.addEventListener("mouseup", patientsListMouseUp);
		
		patientName.addEventListener("mousedown", function(){
			patientsListMouseDown(patient, patientName, i);
		});
		patientName.addEventListener("mouseup", patientsListMouseUp);

		
		patientName.classList.add("patientsList_patientName");
		patientName.innerHTML = selectedPatientsList[i];
		if(top == "29vw") patientName.style.top = (parseInt(top)-7.8)+"vw";
		else patientName.style.top = (parseInt(top)-7.5)+"vw";
		container.appendChild(patientName);
		container.appendChild(patient);
		top=(parseInt(top)+20)+"vw";
	}
}

function patientsListMouseDown(patient, patientName, i) { 
    holdTimer = setTimeout(function(){
    	var t = tau.animation.target;
    	t(patientName).tween('tada', 800);
    	starPatient(patient, i);
    },1000); //set timeout to fire in 2 seconds when the user presses mouse button down
    
}

function patientsListMouseUp() { 
	clearTimeout(holdTimer);  //cancel timer when mouse button is released
}

function starPatient(patient, index){
	let patientStr = PatientsListArray[0][index];
	if(PatientsListArray[1].includes(patientStr)) {
		var i = PatientsListArray[1].indexOf(patientStr);
	    if (i > -1) {
	    	PatientsListArray[1].splice(i, 1);
	    	patient.style.backgroundColor = "rgba(150,150,150,0.20);";
	    }
	    return;
	}
	patient.style.backgroundColor = "rgba(200, 200, 0, 0.35)";
	//Push the index of starred patient
	PatientsListArray[1].push(patientStr)
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



