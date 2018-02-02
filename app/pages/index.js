import React from 'react'
import firebase from 'firebase'
import clientCredentials from '../credentials/client'

import Chat from '../components/Chat'

export default class Index extends React.Component
{
  constructor (props)
  {
    super(props)

    this.state = {
      user: this.props.user,
    }
  }

  componentDidMount ()
  {
    firebase.initializeApp(clientCredentials)

    firebase.auth().onAuthStateChanged(user => {
      if (user)
      {
        this.setState({ user: user })
      }
      else
      {
        this.setState({ user: null })
        firebase.database().ref('messages').off()
      }
    })
  }

  handleLogin ()
  {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  handleLogout ()
  {
    firebase.auth().signOut()
  }

  render ()
  {
    const {user} = this.state

    return (
<main>
  {
    !user && <button onClick={this.handleLogin}>Login</button>
  }
  {
    user && <Chat />
  }
</main>
    )
  }
}
