import React from 'react'
import PropTypes from 'prop-types';
import firebase from 'firebase'

export default class Balloon extends React.Component
{
  constructor (props)
  {
    super(props)
  }

  render()
  {
    const user = firebase.auth().currentUser;
    const userType = user.uid === this.props.uid ? "my" : "other";

    return (
<div>
  <style jsx>{`
$my-balloon-color: #85FF49;
$other-balloon-color: #FFFFFF;

.conversation-balloon {
  &.my {
    text-align: right;
    > .avatar {
      float: right;
    }
    > .message {
      margin-right: 20px;
      background-color: $my-balloon-color;
      text-align: left;

      &::before {
        right: -20px;
        transform: rotate(-25deg);
        border-left: 18px solid $my-balloon-color;
      }
    }
  }

  &.other {
    text-align: left;
    > .avatar {
      float: left;
    }
    > .message {
      margin-left: 20px;
      background-color: $other-balloon-color;
      
      &::before {
        left: -20px;
        transform: rotate(25deg);
        border-right: 18px solid $other-balloon-color;
      }
    }
  }
  
  >.avatar {
    width: 80px;
    
    // floatは各コンポーネントで定義
    &::after {
      clear: both;
    }
    
    > img {
      display: block;
      margin: 0 auto;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      
      margin-bottom: 5px;
    }
    > .name {
      width: 100%;
      text-align: center;
      color: white;
      font-size: 0.8rem;
      word-wrap: break-word;
    }
  }
  
  > .message {
    display: inline-block;
    max-width: 280px;
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 1.3rem;
    min-height: 30px;
    word-wrap: break-word;
    
    position: relative;
    
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 5px;
      border: 8px solid transparent;
      // left/right, border-right, tranform は各コンポーネントで定義
    }
  }
}
  `}</style>

  <div className={"conversation-balloon " + userType}>
	  <div className="avatar">
      <img src={user.photoURL} />
      <p className="name">{this.props.name}</p>
    </div>
    <p className="message">{this.props.text}</p>
  </div>
</div>
    )
  }
}

Balloon.propTypes = {
  id: PropTypes.number,
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
