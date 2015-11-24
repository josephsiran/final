var Drummer = React.createClass({

  getInitialState: function(){
    return {searchString: '', queue: []};
  },

  componentDidMount: function (){
    setInterval(this.playQueue, 500);
  },

  handleChange: function(e) {
    this.setState({searchString:e.target.value});
    this.state.searchString = e.target.value;
    this.state.queue = this.state.searchString.split('');
    this.startQueue();
  },

  playAudio: function (audio){
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  },

  current: function () {
    return this.state.queue[0];
  },

  playQueue: function () {
    if(this.current()) {
      this.playAudio(wobblebuzz);
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
    <Drummer/>,
    document.getElementById('my-component')
);
