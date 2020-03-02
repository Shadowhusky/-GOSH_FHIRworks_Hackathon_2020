function backButtonPressEvent()
{
	window.addEventListener('tizenhwkey', function(ev) {
	    if (ev.keyName == 'back') {
	    	if(document.getElementById("workplaceListPage").classList.contains("ui-page-active")) {
	    		tau.changePage("#workplaceType");
	    	}else if(document.getElementById("workSpaceDetails").classList.contains("ui-page-active")) {
	    		tau.changePage("#workplaceListPage");
	    	}
	    }
	});
}

backButtonPressEvent();