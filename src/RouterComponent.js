import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Scene, Router, Stack } from 'react-native-router-flux'
import firebase from './config/config'
import { initiateStayingLoggedIn } from './actions/authenticationActions'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import HomeScreen from './HomeScreen'
import ForgetScreen from './ForgetScreen'

class RouterComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true,
      authenticated: false
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.initiateStayingLoggedIn(user.providerData[0])
        this.setState({ loading: false, authenticated: true })
      } else {
        this.setState({ loading: false, authenticated: false })
      }
    })
  }

  render () {
    return (
      <Router>
        <Stack key="root">
          <Stack key = 'Auth' navigationBarStyle={{ backgroundColor: '#1A1A1A', elevation: 0 }}>
            <Scene key="register" component={RegisterScreen}/>
            <Scene key="login" component={LoginScreen} initial={!this.state.authenticated}/>
            <Scene key="forgetP" component={ForgetScreen}/>
          </Stack>
          <Stack key= 'home' initial={this.state.authenticated} hideNavBar>
            <Scene key="welcome" component={HomeScreen}/>
          </Stack>
        </Stack>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initiateStayingLoggedIn: bindActionCreators(initiateStayingLoggedIn, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(RouterComponent)
