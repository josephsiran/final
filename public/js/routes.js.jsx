$(function(){
  var root = document.getElementById('drummer');
  var RouteHandler = ReactRouter.RouteHandler;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var App = React.createClass({
    render: function(){
      return (
          <div>
            {this.props.children}
            <Footer/>
          </div>
      );
    }
  });
  var routes = (
      <Route path="/" component={App}>
        <IndexRoute component={Drummer2}/>
      </Route>
  );
  React.render(<Router>{routes}</Router>, root);
});
