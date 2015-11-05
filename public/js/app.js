function filename(str) {
	var prefix = '/sounds/en_female_';
	var suffix = '.mp3';
	return [prefix, str, suffix].join('');
}

$('.play-game').on('click', function() { 
	
	var cardNodes = document.querySelectorAll('.card input:checked');
	var cards = Array.prototype.slice.call(cardNodes, 0);
	var peepsList = cards.map(function(el) { return $(el).val(); });

	var peepsOrder = ['werewolf','minion','mason','seer','robber','troublemaker','drunk','insomniac'];

	var peeps = peepsOrder.filter(function(e){
			return peepsList.indexOf(e) !== -1;
	});

	var peepsAudio = peeps.map(function(e){
		 return [[e + '_wake', 10000], [e + '_close', 2000]];
	});

	var peepsNoForReals = [].concat.apply([], peepsAudio);

	queueAudio(peepsNoForReals);

});

function playNext(audios, i) {
    return function(e) {
    	setTimeout(function() {
    		audios[(i + 1)][0].play();
    	}, audios[i][1])
    };
}

function queueAudio(files) {
	
	var audios = files.map(function(name) {
		return [new Audio(filename(name[0])), name[1]];
	});

	for (var i = 0; i < audios.length; i++) {
		if ((i + 1) < audios.length) {
			audios[i][0].addEventListener('ended', playNext(audios, i));
		}
	};

	audios[0][0].play();

}

// var doppelganger = {
// 	[['doppelganger_close', 500],['doppelganger_close', 500], ['doppleganger_' + variable]]
// }
