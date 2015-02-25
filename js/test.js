var ad = (function() {
        "use strict";
	return {
		init:   function() {

			    },

		getData:   function() {
                                var request = new XMLHttpRequest();
                                request.onreadystatechange = function() {
                                    if (this.readyState == 4 ) {
                                       if(this.status == 200){
                                           var adsData = JSON.parse(this.responseText);
                                           document.getElementsByClassName('main_img')[0].src = adsData.ads[0].data.image_url;
                                           console.log(this.responseText);
                                       }
                                       else {
                                           console.log(this.responseText);
                                       }
                                    }
                                };

                                request.open("GET", "json/api.json", true);
                                request.send();
			    }
	};
}());
