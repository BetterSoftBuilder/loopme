var ad = (function() {
        "use strict";
	return {
		init:   function() {

			    },

		getData:   function() {
                                var requestAd = new XMLHttpRequest();
                                requestAd.onload = function() {
                                    if (this.readyState == 4 ) {
                                       if(this.status == 200){
                                           var adsData = JSON.parse(this.responseText);
                                           var ad = document.getElementsByClassName('main_img')[0];
                                           ad.src = adsData.ads[0].data.image_url;
                                           ad.onload = function () {
                                               var successLoad = new XMLHttpRequest();
                                               successLoad.onload = function() {console.log('ad was loaded');};
                                               successLoad.open("GET", adsData.session.beacons.inbox_open, true);
                                               successLoad.send();
                                           };
                                       }
                                       else {
                                           console.log(this.responseText);
                                       }
                                    }
                                };
                                requestAd.open("GET", "json/api.json", true);
                                requestAd.send();
			    }
	};
}());
