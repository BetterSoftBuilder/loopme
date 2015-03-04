var goat = 0;
(function goat_teleport(sec) {
        console.clear();
        goat += Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	console.log('Goats teleported: ' + goat);
	if(sec>0) {
            sec--;
            setTimeout(function(){goat_teleport(sec);}, 1000);
	} else {
            console.log('All goats successfully teleported');
	}
})(30);