LETTERS = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];

TEMPO = 300;

blankAudio = new Audio ();

AUDIOMAP = {
  " ": [blankAudio]
};

var createAudio = function(letter) {
  dynamicString = letter + "Audio1 = new Audio ();" + letter +
    "Audio1.src = 'images/audio/" + letter + "_audio.mp3';";
  eval(dynamicString);
  (eval(letter + "Audio1")).addEventListener('loadedmetadata', function () {
    AUDIOMAP[letter] = [eval(letter + "Audio1")];
    var count = (eval(letter + "Audio1")).duration / (TEMPO / 1000) + 2;
    for (var i = 2; i <= count; i++) {
      dynamicString = letter + "Audio" + i + "= new Audio ();" + letter +
        "Audio" + i + ".src = 'images/audio/" + letter + "_audio.mp3';";
      eval(dynamicString);
      AUDIOMAP[letter].push(eval(letter + "Audio" + i));
    }
  });
};

LETTERS.forEach(function(letter) {
  createAudio(letter);
});
