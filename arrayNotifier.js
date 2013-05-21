var ArrayNotifier = {
	
	_storage: {},
	
	callback: null,
	
	get: function(key) {
		return _storage[key];
	},
	
	set: function(key, val) {
		_storage[key] = val;
		
		if( ArrayNotifier.callback ) {ArrayNotifier.callback(val);}
	}
}

document.addEventListener("deviceready", onDeviceReady, false);

var onDeviceReady = function() {
	
	ArrayNotifier.callback = function(key,val) {
		alert(key + ' is now set to ' + val);
	};

	var updateVolume = function() {
		window.plugins.ringer.check( function(vol) {
			ArrayNotifier.set('volume', vol);
		});
	};
	
	//initial check
	updateVolume();
	
	//Continuing checks for when the vol changes.
	document.addEventListener("volumedownbutton", updateVolume, false);
	document.addEventListener("volumeupbutton", updateVolume, false);
	
}


//Somewhere in your code...
ArrayNotifier.get('volume');
	
