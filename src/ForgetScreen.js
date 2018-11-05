import React from 'react'
import { StyleSheet, Text, Dimensions, ImageBackground, Alert } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Container, Content, Item, Label, Input, Icon, Card, CardItem, Body } from 'native-base'

import {
  resetPasswordEmailChanged,
  sendResetPasswordEmail
} from './actions/authenticationActions'

class RegisterScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  sendEmailForgetPassword () {
    const { email } = this.props
    if (email.contains('@') && email.contains('.com')) {
      this.props.sendPasswordResetEmail({ email })
    } else {
      Alert.alert(
        'Email is not valid',
        'Please write a valid email address',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      )
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
                      value={this.props.resetPasswordEmailChanged}
                      style={{ color: '#807A7A' }}
                      onChangeText={text => this.props.emailChanged(text)} />
                  </Item>
                  <Button danger rounded block style={{ margin: 15 }}
                    disabled={this.props.resetPasswordEmail === ''}
                    onPress={() => { this.sendEmailForgetPassword() }}>
                    <Text style={{ color: 'white' }}> Email Gönder </Text>
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
    marginTop: Dimensions.get('window').height / 3
  }
})
const mapStatetoProps = ({ AuthResponse }) => {
  const { resetPasswordEmail } = AuthResponse
  return {
    resetPasswordEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPasswordEmailChanged: bindActionCreators(resetPasswordEmailChanged, dispatch),
    sendResetPasswordEmail: bindActionCreators(sendResetPasswordEmail, dispatch)
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(RegisterScreen)
