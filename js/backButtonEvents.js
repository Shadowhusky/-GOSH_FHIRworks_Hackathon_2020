function backButtonPressEvent()
{
	window.addEventListener('tizenhwkey', function(ev) {
	    if (ev.keyName == 'back') {
	    	if(document.getElementById("patientsListPage").classList.contains("ui-page-active")) {
	    		tau.changePage("#menuPage");
	    	}else if(document.getElementById("patientDetailsPage").classList.contains("ui-page-active")) {
	    		tau.changePage("#patientsListPage");
	    	}
	    }
	});
}

backButtonPressEvent();