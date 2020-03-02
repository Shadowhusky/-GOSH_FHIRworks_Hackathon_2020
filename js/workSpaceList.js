var workSpaceListArray = [["Rest room",
						   "Warehouse",
						   "Meeting room",
						   "Conference room",
						   "Medical building",
						   "Chemistry building",
						   "Engineer Building",
						   "Main Campus",
						   "Lab",
						   "B1",
						   "B2",
						   "B3",
						   "B4",
						   "B5",
						   "B6",
						   "B7",
						   "B8",
						   "B9",],
						   ["Coffee(Engineering building)",
						    "Coffee(Main Campus)",
						    "Coffee(IOE)",
						    "Gaming Room(Engineer)",
						    "A1 Leisure",
						    "A2 Leisure",
						    "A3 Leisure",
						    "B1 Leisure",],	//Leisure List
						   [],	//Favourite List
						   ["Engineering building",
						    "IOE",
						    "Student Center First Floor"]];	//WC List

var workSpaceList_SelectedType=0;

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
	tau.changePage("#workSpaceDetails");
	document.getElementById("workSpaceDetails").querySelector(".Details_Page_Position").innerHTML=workSpaceListArray[type][index];
}

function updateWorkSpaceList(startLetter){
	var container = document.getElementById("WorkSpaceList");
	var top = "27.5vw";
	container.innerHTML = "";
	var selectedWorkSpaceList = workSpaceListArray[workSpaceList_SelectedType];
	for(let i=0;i<selectedWorkSpaceList.length;i++){

		if(selectedWorkSpaceList[i].charAt(0)!=startLetter) continue;
		var person = document.createElement("div");
		var personName = document.createElement("p");
		person.classList.add("workSpaceList_Background");
		person.style.top = top;
		person.addEventListener("click",function(){
			showWorkSpaceDetails(workSpaceList_SelectedType,i);
		});
		
		personName.classList.add("workSpaceList_PersonName");
		personName.innerHTML = selectedWorkSpaceList[i];
		personName.addEventListener("click",function(){
			showWorkSpaceDetails(workSpaceList_SelectedType,i);
		});
		if(top == "27vw") personName.style.top = (parseInt(top)-5)+"vw";
		else personName.style.top = (parseInt(top)-4.5)+"vw";
		container.appendChild(personName);
		container.appendChild(person);
		top=(parseInt(top)+17.5)+"vw";
	}
}

var WorkSpaceList_PreviousLetterElement = document.getElementById("workplaceListPage").querySelector("#PreviousLetter");
var WorkSpaceList_CurrentLetterElement = document.getElementById("workplaceListPage").querySelector("#CurrentLetter");
var WorkSpaceList_NextLetterElement = document.getElementById("workplaceListPage").querySelector("#NextLetter");

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
	if(type=="Work") {
		workSpaceList_SelectedType = 0;
		document.getElementById("WorkSpaceList_Page_Title").innerHTML="Work"
	}else if(type=="Rest") {
		workSpaceList_SelectedType = 1;
		document.getElementById("WorkSpaceList_Page_Title").innerHTML="Rest"
	}else if(type=="Fav") {
		workSpaceList_SelectedType = 2;
		document.getElementById("WorkSpaceList_Page_Title").innerHTML="Favs"
	}else if(type=="WC") {
		workSpaceList_SelectedType = 3;
		document.getElementById("WorkSpaceList_Page_Title").innerHTML="WC"
	}
	updateWorkSpaceList(String.fromCharCode(WorkSpaceList_currentLetterCode));
}

function selectWorkSpaceType(type) {
		tau.changePage("#workplaceListPage");
		iniWorkSpaceList(type);
}

window.onload=init();



