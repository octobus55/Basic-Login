import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ImageBackground, Text, StyleSheet, Dimensions } from 'react-native'
import { Button, Container, Content, Item, Label, Input, Icon, Card, CardItem, Body, Spinner } from 'native-base'

import {
  emailChanged,
  passwordChanged,
  signInWithEmailAndPassword,
  signInWithGoogleAsync,
  signInWithFacebookAsync
} from './actions/authenticationActions'
import { Actions } from 'react-native-router-flux'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.logInWithEmailAndPassword = this.logInWithEmailAndPassword.bind(this)
    this.logInWithGoogleAsync = this.logInWithGoogleAsync.bind(this)
    this.logInWithFacebookAsync = this.logInWithFacebookAsync.bind(this)
  }
  logInWithEmailAndPassword () {
    const { email, password } = this.props
    if (email && password) {
      this.props.signInWithEmailAndPassword({ email, password })
    }
  }
  logInWithGoogleAsync () {
    this.props.signInWithGoogleAsync()
  }
  logInWithFacebookAsync () {
    this.props.signInWithFacebookAsync()
  }
  renderButton () {
    if (!this.props.loading) {
      return (
        <Button danger rounded block style={{ margin: 15 }}
          onPress={() => { this.logInWithEmailAndPassword() }}>
          <Text style={{ color: 'white' }}> Giriş </Text>
        </Button>
      )
    }
    return <Spinner color='red' style={{ marginLeft: Dimensions.get('window').width / 2 - 15 }} />
  }
  render () {
    return (
      <Container style={styles.container}>
        <ImageBackground style={styles.backGroundImage} source={require('../sketchappImages/loginBg.jpg')}>
          <Content>
            <Card transparent style={styles.card}>
              <CardItem style={{ backgroundColor: 'transparent' }}>
                <Body style={{ backgroundColor: 'transparent' }}>
                  <Item floatingLabel>
                    <Icon style={styles.color} name='person' />
                    <Label style={{ marginTop: 7 }}>E-mail</Label>
                    <Input
                      value={this.props.email}
                      style={styles.color}
                      onChangeText={text => this.props.emailChanged(text)} />
                  </Item>
                  <Item floatingLabel style={{ marginTop: 15 }}>
                    <Icon style={styles.color} name='lock' />
                    <Label style={{ marginTop: 7, color: '#807A7A' }}>Şifre</Label>
                    <Input value={this.props.password}
                      secureTextEntry
                      style={styles.color}
                      onChangeText={text => this.props.passwordChanged(text)} />
                  </Item>
                  {this.renderButton()}
                </Body>
              </CardItem>
              <CardItem style={{ backgroundColor: 'transparent' }}>
                <Button light rounded transparent style={{ marginLeft: Dimensions.get('window').width / 8 }}
                  onPress= {() => { Actions.register() }}>
                  <Text style={styles.color}>Kayıt Ol</Text>
                </Button>
                <Button light rounded transparent style={{ marginLeft: Dimensions.get('window').width / 8 * 2 }}
                  onPress = {() => { Actions.forgetP() }}>
                  <Text style={styles.color}>Şifremi Unuttum</Text>
                </Button>
              </CardItem>
              <CardItem style={{ backgroundColor: 'transparent' }}>
                <Item disabled>
                  <Input style={{ textAlign: 'center' }} disabled placeholder='Veya' />
                </Item>
              </CardItem>
              <CardItem footer style={styles.footer}>
                <Button light rounded transparent onPress={() => { this.logInWithFacebookAsync() }}>
                  <Icon name='logo-facebook' />
                </Button>
                <Button light rounded transparent
                  style={{ marginLeft: Dimensions.get('window').width / 5 }}
                  onPress={() => { this.logInWithGoogleAsync() }}>
                  <Icon name='logo-googleplus' />
                </Button>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container >
    )
  }
}
const styles = StyleSheet.create({
  backGroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    marginTop: Dimensions.get('window').height / 5 - 65
  },
  footer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  color: {
    color: '#807A7A'
  }
})
const mapStatetoProps = ({ AuthResponse }) => {
  const { email, password, loggedIn, loading } = AuthResponse
  return {
    email,
    password,
    loggedIn,
    loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    emailChanged: bindActionCreators(emailChanged, dispatch),
    passwordChanged: bindActionCreators(passwordChanged, dispatch),
    signInWithEmailAndPassword: bindActionCreators(signInWithEmailAndPassword, dispatch),
    signInWithGoogleAsync: bindActionCreators(signInWithGoogleAsync, dispatch),
    signInWithFacebookAsync: bindActionCreators(signInWithFacebookAsync, dispatch)
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(LoginScreen)
