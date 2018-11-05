import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './src/reducers'
import Router from './src/RouterComponent'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  render () {
    const store = createStore(reducers, compose(applyMiddleware(ReduxThunk)))
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
export default App
