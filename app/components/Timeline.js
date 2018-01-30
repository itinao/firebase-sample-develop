import Balloon from './Balloon'

export default (props) =>
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

    <div className="chat-timeline">
      <Balloon name='a' message='b' userType="my" imgPath="hoge" />
      <Balloon name='a' message='b' userType="my" imgPath="hoge" />
      <Balloon name='a' message='b' userType="other" imgPath="hoge" />
      <Balloon name='a' message='b' userType="my" imgPath="hoge" />
      <Balloon name='a' message='b' userType="other" imgPath="hoge" />
    </div>
  </div>
