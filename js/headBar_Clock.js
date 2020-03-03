(function(){
	
	function init(){
		updateClock();
		setInterval(function() {
			updateClock();
        }, 1000);
	}
	
	function updateClock(){
		var datetime = tizen.time.getCurrentDateTime(),
        hour = datetime.getHours(),
        minute = datetime.getMinutes();
		var prefix_Second="";
		var prefix_Minute="";
		var prefix_Hour="";
		if(minute<10){
			prefix_Minute="0";
		}if(hour<10){
			prefix_Hour="0";
		}
		var clocks = document.getElementsByClassName("page_CurrentTime");
		for(i in clocks){
			try{
				var clockContainer = clocks[i];
				clockContainer.innerHTML=prefix_Hour+hour+":"+prefix_Minute+minute;
			}catch(e){
				//Not a clock
			}
		}
	}
	
	window.onload=init();
}());


