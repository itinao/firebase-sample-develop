import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import Balloon from './Balloon'

export default class Timeline extends React.Component
{
  constructor (props)
  {
    super(props)

    this.state = {
      messages: {}
    }

    this.messagesRef = firebase.database().ref('messages')
  }

  componentWillMount ()
  {
    /*
    this.messagesRef.once('value', snap => {
      const messages = snap.val()
      if (messages) {
        this.setState({messages})
      }
    })
    */

    this.messagesRef.on('child_added', snap => {
      const newMessage = snap.val()

      const messages = this.state.messages
      messages[newMessage.id] =  newMessage

      this.setState({messages})
    })
  }

  shouldComponentUpdate (nextProps, nextState)
  {
    // TODO: setTimeoutやだ
    setTimeout(() => {
      const target = this.refs.timeline
      const height = target.scrollHeight - target.offsetHeight;

      if (height <= target.scrollTop)
      {
        return
      }
      else
      {
        target.scrollTop = height;
      }
    }, 0);

    return true
  }

  render()
  {

    return (
<div>
  <style jsx>{`
/* timeline */
$tl-background-color: #88A4D4;

.chat-timeline {
  position: fixed;
  top: 0;
  bottom: 40px;
  left: 0;
  right: 0;
  
  min-width: 480px;
  padding: 30px;
  
  background-color: $tl-background-color;
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  > .conversation-balloon {
    margin-bottom: 30px;
  }
}
  `}</style>

  <div ref="timeline" className="chat-timeline">
    {Object.keys(this.state.messages).map((key) => {
      const data = this.state.messages[key];
      return <Balloon ref={data.id} key={data.id} uid={data.uid} name={data.name} text={data.text} />;
    })}
  </div>
</div>
    )
  }
}
