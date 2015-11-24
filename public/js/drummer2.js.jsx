var Drummer2 = React.createClass({

  getInitialState: function(){
    return {searchString: ''};
  },

  componentDidMount: function (){
  },

  handleChange: function(e) {
    this.state.searchString = e.target.value;
    this.setState({searchString:e.target.value});
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
    this.currentLength = this.state.searchString.length;
    this.state.searchString.split('').forEach(function(letter, i) {
      setTimeout(function () {
        that.playAudio(letter,i);}, current);
      current += that.props.tempo;
    }.bind(this));
    if(this.state.searchString.length < 1) {
      this.ready = true;
    }
  },

  playAudio: function (letter,i) {
    this.currentIndex = i;
    AUDIOMAP[letter].pause();
    AUDIOMAP[letter].currentTime = 0;
    AUDIOMAP[letter].play();
    var that = this;
    if(i >= this.currentLength - 1) {
      setTimeout(function () {
        that.startQueue();}, that.props.tempo);
    }
  },

  render: function () {
    return (
      <div>
        <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here"></input>
      </div>
    )
  }

});

React.render(
    <Drummer2 tempo={500}/>,
    document.getElementById('my-component')
);
