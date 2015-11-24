var Drummer2 = React.createClass({

  getInitialState: function(){
    return {searchString: ''};
  },

  componentDidMount: function (){
    setInterval(this.startQueue,this.props.tempo * this.state.searchString.length);
  },

  handleChange: function(e) {
    this.setState({searchString:e.target.value});
  },

  startQueue: function () {
    var that = this;
    this.state.searchString.split('').forEach(function(letter) {
      setInterval(function () {
        that.playAudio(letter);}, that.props.tempo);
    }.bind(this));
  },

  playAudio: function (letter) {

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
