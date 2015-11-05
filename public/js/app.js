//to do
// add set timer
// display current card;
// add a cancel button to modal

function filename(str) {
	var prefix = '/sounds/en_female_';
	var suffix = '.mp3';
	return [prefix, str, suffix].join('');
}

$('.play-game').on('click', function() { 
	$('.modal').show();
	var cardNodes = document.querySelectorAll('.card input:checked');
	var cards = Array.prototype.slice.call(cardNodes, 0);
	var peepsList = cards.map(function(el) { return $(el).val(); });

	var peepsOrder = ['werewolf','minion','mason','seer','robber','troublemaker','drunk','insomniac'];

	// if peeps has doppelganger and insomniac/minion/werewolf include doppleganger insomniac/minion/werewolf files

	//if doppleganger and !minion

	var peeps = peepsOrder.filter(function(e){
			return peepsList.indexOf(e) !== -1;
	});

	var doppeler = [];

	

	var peepsAudio = peeps.map(function(e){
		 return [[e + '_wake', 5000], [e + '_close', 2000]];
	});

	if (peepsList.indexOf('doppelganger') !== -1){
		doppeler.push(['doppelganger' + '_wake', 5000]);
		if (peepsList.indexOf('minion') !== -1){
			doppeler.push(['doppelganger' + '_minion', 5000],['doppelganger' + '_ww_thumb', 5000]);
		}
		doppeler.push(['doppelganger' + '_close', 5000]);
		if (peepsList.indexOf('insomniac') !== -1){
			peepsAudio.push([['doppelganger' + '_insomniac', 5000],['doppelganger' + '_close', 5000]]);
		}

	}

	peepsAudio.unshift(doppeler);
	peepsAudio.unshift([['everyone' + '_close', 5000]]);
	peepsAudio.push([['everyone' + '_wiggle', 5000],['everyone' + '_wake', 5000]]);

	var peepsNoForReals = [].concat.apply([], peepsAudio);
	console.log(peepsNoForReals);

	queueAudio(peepsNoForReals);

});

function playNext(audios, i) {
    return function(e) {
    	setTimeout(function() {
    		audios[(i + 1)][0].play();
    	}, audios[i][1])
    };
}

function queueAudio(files, backgroundNoise) {
	var backgroundAudio = new Audio('/sounds/background_crickets.mp3');
	
	var audios = files.map(function(name) {
		return [new Audio(filename(name[0])), name[1]];
	});

	for (var i = 0; i < audios.length; i++) {
		if ((i + 1) < audios.length) {
			audios[i][0].addEventListener('ended', playNext(audios, i));
		} else {
			audios[i][0].addEventListener('ended', function(){
				backgroundAudio.pause();
				backgroundAudio.currentTime = 0;
				$('.modal').hide();
			});
		}
	}

	audios[0][0].play();
	backgroundAudio.play();
	backgroundAudio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	});

}

// var doppelganger = {
// 	[['doppelganger_close', 500],['doppelganger_close', 500], ['doppleganger_' + variable]]
// }
