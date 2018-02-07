import React from 'react'
import firebase from 'firebase'

import Request from '../Utils/Request'

export default class ChatForm extends React.Component
{
  constructor (props)
  {
    super(props)

    this.state = {
      value: "",
      token: "",
    }

    this.req = new Request()
    this.messaging = firebase.messaging()

    this.handleKeypress = this.handleKeypress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.addSWListener()
  }

  addSWListener()
  {
    if (!navigator.serviceWorker)
    {
      console.warn("sw undef")
      return
    }

    // Tokenを得る
    navigator.serviceWorker.register('./static/firebase-messaging-sw.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);

      this.messaging.useServiceWorker(registration)

      this.messaging.requestPermission().then(() => {
        console.log('Notification permission granted.');

        this.messaging.getToken().then((currentToken) => {

          // 取得したトークンをサーバへ送る。サーバ側でユーザIDとトークンを連携させDBなどのストレージに保持する。
          this.messaging.onMessage((payload) => {
            console.log("Message received. ", payload)
          })
          console.log(currentToken)

          this.setState({token: currentToken})

        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err)
        })
      }).catch((err) => {
        console.log('Unable to get permission to notify.', err)
      })
    }).catch((err) => {
      console.log('ServiceWorker registration failed: ', err)
    })
  }

  handleKeypress (event)
  {
    if (event.which === 13)
    {
      this.handleSubmit(event)
    }
  }

  handleChange (event)
  {
    this.setState({value: event.target.value})
  }

  handleSubmit (event)
  {
    event.preventDefault()

    if (this.state.value === "")
    {
      return
    }

    const date = new Date().getTime()
    const user = firebase.auth().currentUser;
    firebase.database().ref(`messages/${date}`).set({
      id: date,
      uid: user.uid,
      name: user.displayName,
      text: this.state.value
    })

    if (this.state.token !== "")
    {
      this.req.Send(
        {
          title: "Portugal vs. Denmark",
          body: "5 to 1",
          icon: "/image/ic_alarm_black_48dp_2x.png",
          click_action: "http://localhost",
        },
        {
          score: "3x1",
        },
        this.state.token,
        (err, res) => {
          console.log(err)
          console.log(res)
        }
      )
    }

    this.setState({value: ''})
  }

  render()
  {
    const {value} = this.state

    return (
<div>
  <style jsx>{`
/* form */
.chat-form {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: white;
}

.form-container {
  position: relative;
  height: 40px;
  > .message {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 80px;
    width: 100%;
    
    font-size: 1.3rem;
    padding: 0 20px;
  }
  > .submit {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    
    width: 80px;
    text-align: center;
    background-color: #4F83E1;
    color: white;
    font-size: 1.6rem;
  }
}
  `}</style>

  <div className="chat-form">
    <div className="form-container">
      <input
        type="text"
        className="message"
        onChange={this.handleChange}
        onKeyPress={this.handleKeypress}
        placeholder={'add message'}
        value={value}
      />
      <button
        className="submit"
        onClick={this.handleSubmit}
        >送信</button>
    </div>
  </div>
</div>
    )
  }
}
