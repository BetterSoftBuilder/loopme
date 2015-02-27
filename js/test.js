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
                                           ad.onclick = function() {
                                                document.location.href = adsData.ads[0].data.click_url;
                                            };
                                           ad.onload = function () {
                                               var successLoad = new XMLHttpRequest();
                                               successLoad.onload = function() {console.log('ad');};
                                               successLoad.open("GET", adsData.session.beacons.inbox_open, true);
                                               //successLoad.send();
                                           };
                                           document.getElementsByClassName('like')[0].onclick = function() {
                                               var like = new XMLHttpRequest();
                                               like.open("GET", adsData.ads[0].beacons.ad_like, true);
                                               like.send();
                                           };
                                           document.getElementsByClassName('dislike')[0].onclick = function() {
                                               //document.getElementsByClassName('button').className  = "button_click";
                                           };
                                           document.getElementsByClassName('stop')[0].onclick = function() {
                                               var stop = new XMLHttpRequest();
                                               stop.open("GET", adsData.ads[0].beacons.ad_hide, true);
                                               stop.send();
                                           };
                                           document.getElementsByClassName('share')[0].onclick = function() {
                                               var share = new XMLHttpRequest();
                                               share.open("GET", adsData.ads[0].beacons.ad_share, true);
                                               share.send();
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
