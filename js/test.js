var ad = (function() {
        "use strict";

        function _close() {
            var close = document.getElementById('wrap');
            close.parentNode.removeChild(close);
        }

        return {
		init:   function() {

			    },

		getData:   function() {
                                //document.getElementById('wrap').style.width = window.screen.availWidth + 'px';
                                //document.getElementById('wrap').style.height = window.screen.availHeight + 'px';
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
                                               successLoad.send();
                                           };
                                           document.getElementsByClassName('like')[0].onclick = function() {
                                               var like = new XMLHttpRequest();
                                               like.open("GET", adsData.ads[0].beacons.ad_like, true);
                                               like.send();
                                           };
                                           document.getElementsByClassName('stop')[0].onclick = function() {
                                               var stop = new XMLHttpRequest();
                                               stop.open("GET", adsData.ads[0].beacons.ad_hide, true);
                                               stop.send();
                                               _close();
                                           };
                                           document.getElementsByClassName('share')[0].onclick = function() {
                                               var share = new XMLHttpRequest();
                                               share.open("GET", adsData.ads[0].beacons.ad_share, true);
                                               share.send();
                                           };
                                           document.getElementsByClassName('buttons_list')[0].addEventListener('click', function (event) {
                                               if (event.target.tagName == 'A') {
                                                   event.target.parentNode.className += " button_click";
                                               } else {
                                                   event.target.className += " button_click";
                                               }
                                           });
                                           document.getElementsByClassName('close')[0].addEventListener('click', _close);
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
