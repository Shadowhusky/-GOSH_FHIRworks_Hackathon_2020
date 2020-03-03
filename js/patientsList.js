var PatientsListArray = [//All patients
                         	[],
                         //Starred
                         	[]	];	

var PatientsList_SelectedType=0;

var WorkSpaceList_currentLetterCode = 'B'.charCodeAt(0);

function init(){
	updateWorkSpaceLetterSelector();
	updateWorkSpaceList("B");
	addWorkSpaceListScrollEvent();
}

function addWorkSpaceListScrollEvent() {
	
	var scrollEvent = function(){
		var scrollTop = document.getElementById("WorkSpaceList").scrollTop;
		if(scrollTop>10) {
			document.getElementById("WorkSpaceList_Page_Title").style.visibility="hidden";
			document.getElementById("WorkSpaceList_Page_CurrentTime").style.visibility="hidden";
		}else{
			document.getElementById("WorkSpaceList_Page_Title").style.visibility="visible";
			document.getElementById("WorkSpaceList_Page_CurrentTime").style.visibility="visible";
		}
	}
	document.getElementById("WorkSpaceList").addEventListener("scroll", scrollEvent);
	
}

function showWorkSpaceDetails(type,index) {
//	tau.changePage("#patientDetailsPage");
//	document.getElementById("patientDetailsPage").querySelector(".Details_Page_Position").innerHTML=PatientsListArray[type][index];
}

function updateWorkSpaceList(startLetter){
	var container = document.getElementById("WorkSpaceList");
	var top = "27.5vw";
	container.innerHTML = "";
	var selectedWorkSpaceList = PatientsListArray[PatientsList_SelectedType];
	for(let i=0;i<selectedWorkSpaceList.length;i++){

		if(selectedWorkSpaceList[i].charAt(0)!=startLetter) continue;
		var person = document.createElement("div");
		var personName = document.createElement("p");
		person.classList.add("workSpaceList_Background");
		person.style.top = top;
		person.addEventListener("click",function(){
			showPatientDetails(PatientsList_SelectedType,i);
		});
		
		personName.classList.add("workSpaceList_PersonName");
		personName.innerHTML = selectedWorkSpaceList[i];
		if(top == "27vw") personName.style.top = (parseInt(top)-5)+"vw";
		else personName.style.top = (parseInt(top)-4.5)+"vw";
		container.appendChild(personName);
		container.appendChild(person);
		top=(parseInt(top)+17.5)+"vw";
	}
}

var WorkSpaceList_PreviousLetterElement = document.getElementById("patientsListPage").querySelector("#PreviousLetter");
var WorkSpaceList_CurrentLetterElement = document.getElementById("patientsListPage").querySelector("#CurrentLetter");
var WorkSpaceList_NextLetterElement = document.getElementById("patientsListPage").querySelector("#NextLetter");

function updateWorkSpaceLetterSelector() {
	if(WorkSpaceList_currentLetterCode < 'A'.charCodeAt(0)) {
		WorkSpaceList_currentLetterCode = 'A'.charCodeAt(0);
		return;
	}
	if(WorkSpaceList_currentLetterCode > 'Z'.charCodeAt(0)) {
		WorkSpaceList_currentLetterCode = 'Z'.charCodeAt(0);
		return;
	}
	var previousLetter = WorkSpaceList_currentLetterCode-1 < ( 'A'.charCodeAt(0) ) ? 32/*White space*/ : WorkSpaceList_currentLetterCode-1;
	var NextLetter = WorkSpaceList_currentLetterCode+1 > ( 'Z'.charCodeAt(0) ) ? 32/*White space*/ : WorkSpaceList_currentLetterCode+1;
	WorkSpaceList_PreviousLetterElement.innerHTML=String.fromCharCode(previousLetter);
	WorkSpaceList_CurrentLetterElement.innerHTML=String.fromCharCode(WorkSpaceList_currentLetterCode);
	WorkSpaceList_NextLetterElement.innerHTML=String.fromCharCode(NextLetter);
	updateWorkSpaceList(String.fromCharCode(WorkSpaceList_currentLetterCode));
}

function iniWorkSpaceList(type) {
	if(type=="All") {
		PatientsList_SelectedType = 0;
		document.getElementById("WorkSpaceList_Page_Title").innerHTML="All"
	}else if(type=="Starred") {
		PatientsList_SelectedType = 1;
		document.getElementById("WorkSpaceList_Page_Title").innerHTML="Starred"
	}
	updateWorkSpaceList(String.fromCharCode(WorkSpaceList_currentLetterCode));
}

function selectWorkSpaceType(type) {
		tau.changePage("patientsListPage");
		iniWorkSpaceList(type);
}

window.onload=init();



