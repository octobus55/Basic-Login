import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, Text, ImageBackground, Dimensions, View } from 'react-native'
import { Button, Container, Content, CardItem, Icon, Left, Thumbnail, Body } from 'native-base'

import { signOut } from './actions/authenticationActions'
import { getImage } from './actions/userActions'

class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }
  componentDidMount () {
    this.props.getImage(this.props.loginType)
  }
  logOut () {
    console.log('logout')
    this.props.signOut()
  }
  render () {
    return (
      <Container style={styles.container}>
        <ImageBackground style={styles.backGroundImage} source={require('../sketchappImages/bg.png')}>
          <Content>
            <CardItem style={{ backgroundColor: 'transparent', marginTop: Dimensions.get('window').height / 10 }}>
              <Left>
                <Thumbnail square source={{ uri: this.props.avatarURL }}/>
                <Body>
                  <Text>{this.props.displayName}</Text>
                  {
                    this.props.loginType === 'google' &&
                    <Text note>{this.props.userEmail}</Text>
                  }
                </Body>
              </Left>
            </CardItem>
            <View transparent style={styles.card}>
              <CardItem header button onPress={() => console.log('This is Card Header')} style={styles.button}>
                <Icon name='home' style={styles.icon}/>
                <Text style={styles.textColor}>AnaSayfa</Text>
              </CardItem>
              <CardItem header button onPress={() => console.log('This is Card Header')} style={styles.button}>
                <Icon name='comment-text-outline' type='MaterialCommunityIcons' style={styles.icon}/>
                <Text style={styles.textColor}>TakipEkranı</Text>
              </CardItem>
              <CardItem header button onPress={() => console.log('This is Card Header')} style={styles.button}>
                <Icon name='graph' type='Octicons' style={styles.icon}/>
                <Text style={styles.textColor}>Raporlar</Text>
              </CardItem>
            </View>
            <View transparent style={styles.card2}>
              <CardItem header button onPress={() => console.log('This is Card Header')} style={styles.button}>
                <Icon name='heart' type='Feather' style={styles.icon}/>
                <Text style={styles.textColor}>Bugün Aşçı Benim</Text>
              </CardItem>
              <CardItem header button onPress={() => console.log('This is Card Header')} style={styles.button}>
                <Icon name='graph' type='Octicons' style={styles.icon}/>
                <Text style={styles.textColor}>Videolar</Text>
              </CardItem>
              <CardItem header button onPress={() => console.log('This is Card Header')} style={styles.button}>
                <Icon name='person' style={styles.icon}/>
                <Text style={styles.textColor}>Profilim</Text>
              </CardItem>
            </View>
            <Button block rounded danger onPress={() => { this.logOut() }} style={{ marginTop: 15 }}>
              <Text style={{ color: 'white' }}>LogOut</Text>
            </Button>
          </Content>
        </ImageBackground>
      </Container>
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
    justifyContent: 'center',
    flexDirection: 'row'
  },
  card: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  card2: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    borderWidth: 3,
    borderColor: '#807A7A',
    height: ((Dimensions.get('window').height - 50) / 6) + 20,
    width: (Dimensions.get('window').width - 50) / 3,
    borderRadius: 15,
    backgroundColor: 'transparent',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  textColor: {
    color: '#807A7A',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 5
  },
  icon: {
    color: '#807A7A',
    fontWeight: 'bold',
    fontSize: 20
  }
})
const mapStatetoProps = ({ AuthResponse, UserResponse }) => {
  const { loginType, displayName, userEmail } = AuthResponse
  const { avatarURL } = UserResponse
  return {
    loginType,
    avatarURL,
    displayName,
    userEmail
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: bindActionCreators(signOut, dispatch),
    getImage: bindActionCreators(getImage, dispatch)
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen)
