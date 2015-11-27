var Drummer2 = React.createClass({
  getInitialState: function(){
    return {letterString: '', bpm: Math.floor(60000/TEMPO)};
  },

  componentDidMount: function (){
    initAudio('electro');
    this.changeButtonColors('electro');
  },

  handleChange: function(e) {
    this.state.letterString = e.target.value;
    this.setState({letterString:e.target.value});
    if(this.ready) {
      this.startQueue();
    }
  },

  ready: true,

  currentLength: 0,

  startQueue: function () {
    var that = this;
    this.ready = false;
    var current = 0;
    this.currentLength = this.state.letterString.length;
    this.state.letterString.split('').forEach(function(letter, i) {
      setTimeout(function () {
        that.playAudio(letter,i);}, current);
      current += TEMPO;
    }.bind(this));
    if(this.state.letterString.length < 1) {
      this.ready = true;
    }
  },

  isPlaying: function (audelem) {
    return !audelem.paused;
  },

  rotateAudio: function (audios) {
    if(audios[0] === blankAudio) {
      return blankAudio;
    }
    for (var i = 0; i < audios.length; i++) {
      if(!this.isPlaying(audios[i])) {
        return audios[i];
      }
    }
  },

  playAudio: function (letter,i) {
    if(!AUDIOMAP[letter]) {
      letter = " ";
    }
    letter = letter.toLowerCase();
    this.currentIndex = i;
    this.rotateAudio(AUDIOMAP[letter]).play();
    var that = this;
    if(i >= this.currentLength - 1) {
      setTimeout(function () {
        that.startQueue();}, TEMPO);
    }
  },

  currentGenre: "electro",

  handleClick(genre) {
    if(this.currentGenre != genre) {
      initAudio(genre);
      this.currentGenre = genre;
      this.changeButtonColors(genre);
    }
  },

  changeButtonColors: function (genre) {
    GENRES.forEach(function(g){
      $("." + g).css("background-color", "#DA0000");
    });
    $("." + genre).css("background-color", "#A70000");
  },

  nextTempo: Math.floor(60000/TEMPO),

  bpmChange: function () {
    val = parseInt($("#temposlider").val());
    TEMPO = 250 + (val - 100) * -2 + (val - 100) * -2;
    this.setState({bpm: Math.floor(60000/TEMPO)});
  },

  render: function () {
    var that = this;
    return (
      <div className="container">
        <div className="buttons-container">
          <button className="buttons electro" onClick={function(){that.handleClick("electro")}}>Electro</button>
          <button className="buttons rock" onClick={function(){that.handleClick("rock")}}>Rock</button>
        </div>
          <textarea id="text-box" type="text" value={this.state.letterString} onChange={this.handleChange} placeholder="Type here"></textarea>
        <div className="slider-container">
          <input id="temposlider" type="range" defaultValue="50" onChange={this.bpmChange}></input>
        </div>
        <div id="bpm">{this.state.bpm + " BPM"}</div>
      </div>
    )
  }

});
