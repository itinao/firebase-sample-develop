export default (props) =>
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
        <input type="text" className="message" />
        <button className="submit">送信</button>
      </div>
    </div>
  </div>
