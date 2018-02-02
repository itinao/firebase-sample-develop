import React from 'react'
import firebase from 'firebase'

export default class ChatForm extends React.Component
{
  constructor (props)
  {
    super(props)

    this.state = {
      value: ""
    }

    this.handleKeypress = this.handleKeypress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
