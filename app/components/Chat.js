import React from 'react'

import Timeline from './Timeline'
import ChatForm from './ChatForm'

export default class Chat extends React.Component
{
  constructor (props)
  {
    super(props)
  }

  render()
  {
    return (
<div>
  <Timeline />
  <ChatForm />
</div>
    )
  }
}
