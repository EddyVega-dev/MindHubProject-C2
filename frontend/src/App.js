import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import News from './pages/News';
import Register from './components/Register';
import LogIn from './components/LogIn';
import Categories from './pages/Categories';
import { connect } from 'react-redux';
import usersActions from './redux/actions/usersActions'



class App extends React.Component {
  render() {
    console.log(this.props.token)
    if (localStorage.getItem('token')) {
      this.props.forcedLogIn(localStorage.getItem('token'))
    }

    if (this.props.newToken || localStorage.getItem('token')) {
      var myRoutes = (<Switch>
        <Route exact path="/" component={Home} />
        <Route path="/news" component={News} />
        <Route path="/games" component={Categories} />
        <Redirect to="/" />
      </Switch>)
    } else {
      var myRoutes = (< Switch >
        <Route exact path="/" component={Home} />
        <Route path="/news" component={News} />
        <Route path="/games" component={Categories} />
        <Route path="/signup" component={Register} />
        <Route path="/login" component={LogIn} />
        <Redirect to="/login" />
      </Switch >
      )
    }
    return (
      <BrowserRouter>
        <Switch>
          {myRoutes}
        </Switch>
      </BrowserRouter>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.usersReducer.token
  }
}
const mapDispatchToProps = {
  forcedLogIn: usersActions.forcedLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
