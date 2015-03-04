var ad = (function() {
        "use strict";

        function _close() {
            var close = document.getElementById('wrap');
            close.parentNode.removeChild(close);
        }

        function _events(adsData) {
            var ad = document.getElementsByClassName('main_img')[0];
            ad.src = adsData.ads[0].data.image_url;
            document.getElementsByClassName('ad')[0].onclick = function() {
                 document.location.href = adsData.ads[0].data.click_url;
            };
            ad.onload = function () {
                var successLoad = new XMLHttpRequest();
                successLoad.open("GET", adsData.session.beacons.inbox_open, true);
                successLoad.send();
            };
            document.getElementsByClassName('like')[0].parentNode.onclick = function() {
                var like = new XMLHttpRequest();
                like.open("GET", adsData.ads[0].beacons.ad_like, true);
                like.send();
                localStorage.like = !localStorage.like ? 1 : (parseInt(localStorage.like) + 1);
            };
            document.getElementsByClassName('dislike')[0].parentNode.onclick = function() {
                localStorage.dislike = !localStorage.dislike ? 1 : (parseInt(localStorage.dislike) + 1);
            };
            document.getElementsByClassName('stop')[0].parentNode.onclick = function() {
                var stop = new XMLHttpRequest();
                stop.open("GET", adsData.ads[0].beacons.ad_hide, true);
                stop.send();
                localStorage.stop = !localStorage.stop ? 1 : (parseInt(localStorage.stop) + 1);
                _close();
            };
            document.getElementsByClassName('share')[0].parentNode.onclick = function() {
                var share = new XMLHttpRequest();
                share.open("GET", adsData.ads[0].beacons.ad_share, true);
                share.send();
                localStorage.share = !localStorage.share ? 1 : (parseInt(localStorage.share) + 1);
            };
            document.getElementsByClassName('buttons_list')[0].onclick = function(event) {
                if (event.target.tagName == 'A') {
                    event.target.parentNode.className += " button_click";
                } else {
                    event.target.className += " button_click";
                }
            };
            document.getElementsByClassName('close')[0].onclick =  _close;
        }

        function _getData() {
            var requestAd = new XMLHttpRequest();
            requestAd.onload = function() {
                if (this.readyState == 4 ) {
                   if(this.status == 200){
                       var data = JSON.parse(this.responseText);
                       _events(data);
                   }
                   else {
                       console.log(this.responseText);
                   }
                }
            };
            requestAd.open("GET", "json/api.json", true);
            requestAd.send();
        }

        return {
		init:   function() {
                                _getData();
			    }
	};
}());

ad.init();