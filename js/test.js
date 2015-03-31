var ad = (function() {
        "use strict";

        function byClass(node) {
            return document.getElementsByClassName(node)[0];
        }

        function close() {
            var close = document.getElementById('wrap');
            close.parentNode.removeChild(close);
        }

        function getData(url, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.addEventListener("load", function() {
              if ((req.status < 400) && callback)
                callback(JSON.parse(this.responseText));
              else
                console.log("Request failed: " + req.statusText);
            });
            req.send(null);
        }

        function socialSend(button, adsData) {
            for (var key in adsData.ads[0].beacons) {
                if (key==button) {
                    var url = adsData.ads[0].beacons[key];
                    break;
                }
            }
            if (url) {
                getData(url);
                (button=='ad_hide') && close();
            }
        }

        function events(adsData) {

            var ads = byClass('main_img');
            ads.src = adsData.ads[0].data.image_url;
            ads.onload = function () {
                getData(adsData.session.beacons.inbox_open);
            };
            byClass('ad').onclick = function() {
                 document.location.href = adsData.ads[0].data.click_url;
            };

            byClass('buttons_list').onclick = function(event) {
                //localStorage.share = !localStorage.share ? 1 : (parseInt(localStorage.share) + 1);
                var button = event.target.getAttribute('data-button');
                event.target.className += " button_click";
                socialSend(button, adsData);
            };
            byClass('close').onclick =  close;
        }

        return {
		init:   function() {
                            getData("json/api.json", events);
                            //something else
			}
	};
}());

ad.init();
