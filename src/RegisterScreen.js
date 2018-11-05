import React from 'react'
import { StyleSheet, Text, Dimensions, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Container, Content, Item, Label, Input, Icon, Card, CardItem, Body } from 'native-base'

import {
  emailChanged,
  passwordChanged,
  passwordConfirmChanged,
  signUpUser
} from './actions/authenticationActions'

class RegisterScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  signUpWithEmailAndPassword () {
    const { email, password } = this.props
    if (email && password) {
      this.props.signUpUser({ email, password })
    }
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
                    <Icon style={{ color: '#807A7A' }} name='person' />
                    <Label style={{ marginTop: 7 }}>E-mail</Label>
                    <Input
                      value={this.props.email}
                      style={{ color: '#807A7A' }}
                      onChangeText={text => this.props.emailChanged(text)} />
                  </Item>
                  <Item floatingLabel style={{ marginTop: 15 }}>
                    <Icon style={{ color: '#807A7A' }} name='lock' />
                    <Label style={{ marginTop: 7, color: '#807A7A' }}>Şifre</Label>
                    <Input value={this.props.password}
                      secureTextEntry
                      style={{ color: '#807A7A' }}
                      onChangeText={text => this.props.passwordChanged(text)} />
                  </Item>
                  <Item floatingLabel style={{ marginTop: 15 }}>
                    <Icon style={{ color: '#807A7A' }} name='lock' />
                    <Label style={{ marginTop: 7, color: '#807A7A' }}>Şifre Tekrar</Label>
                    <Input value={this.props.passwordConfirm}
                      secureTextEntry
                      style={{ color: '#807A7A' }}
                      onChangeText={text => this.props.passwordConfirmChanged(text)} />
                  </Item>
                  <Button danger rounded block style={{ margin: 15 }}
                    disabled={this.props.password !== this.props.passwordConfirm || this.props.password === ''}
                    onPress={() => { this.signUpWithEmailAndPassword() }}>
                    <Text style={{ color: 'white' }}> Kayıt Ol </Text>
                  </Button>
                </Body>
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
    marginTop: Dimensions.get('window').height / 5
  },
  footer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  }
})
const mapStatetoProps = ({ AuthResponse }) => {
  const { email, password, loggedIn, passwordConfirm } = AuthResponse
  return {
    email,
    password,
    passwordConfirm,
    loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    emailChanged: bindActionCreators(emailChanged, dispatch),
    passwordChanged: bindActionCreators(passwordChanged, dispatch),
    passwordConfirmChanged: bindActionCreators(passwordConfirmChanged, dispatch),
    signUpUser: bindActionCreators(signUpUser, dispatch)
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(RegisterScreen)
