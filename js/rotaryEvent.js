function rotateCW() {
		if(document.getElementById("patientsListPage").classList.contains("ui-page-active")) {
			patientsList_currentLetterCode++;
			updateWorkSpaceLetterSelector();
		}
	}
	
	function rotateCCW() {
		if(document.getElementById("patientsListPage").classList.contains("ui-page-active")) {
			patientsList_currentLetterCode--;
			updateWorkSpaceLetterSelector();
		}
	}
	
	(function() {
	    function bindEvents() {
	        document.addEventListener('rotarydetent', function(ev) {
	            var direction = ev.detail.direction;
	            if(direction==='CCW') {
	            	rotateCCW();
	            }else {
	            	rotateCW();
	            }
	           
	        });
	    }

	    /**
	     * Initiates the application.
	     * @private
	     */
	    function initt() {
	        bindEvents();
	    }

	    window.onload = initt();

	}());
	
