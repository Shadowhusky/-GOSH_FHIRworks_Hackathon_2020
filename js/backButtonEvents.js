function backButtonPressEvent()
{
	window.addEventListener('tizenhwkey', function(ev) {
	    if (ev.keyName == 'back') {
	    	if(document.getElementById("nevigationPage").classList.contains("ui-page-active")) {
	    		tau.changePage("#main");
	    	}else if(document.getElementById("peopleListPage").classList.contains("ui-page-active")) {
	    		tau.changePage("#main");
	    	}else if(document.getElementById("personalDetails").classList.contains("ui-page-active")) {
	    		tau.changePage("#peopleListPage");
	    	}else if(document.getElementById("workplaceType").classList.contains("ui-page-active")) {
	    		tau.changePage("#main");
	    	}else if(document.getElementById("workplaceListPage").classList.contains("ui-page-active")) {
	    		tau.changePage("#workplaceType");
	    	}else if(document.getElementById("workSpaceDetails").classList.contains("ui-page-active")) {
	    		tau.changePage("#workplaceListPage");
	    	}
	    }
	});
}

backButtonPressEvent();