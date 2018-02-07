import request from 'superagent'

export default class Request
{
  constructor (props)
  {
    // TODO
    this.ServerKey = 'AAAA_3Auw0g:APA91bHzQROy-970ct8SXdw4XHQcwm0K78feXfTrYky8oCUUqlgmxnh4-iVqNyniXhx3mQsBcV3vLcUXQd9-x26AuYfrCrm-Ih1JaXjcC4zuT-8EcWKQgHeH2qshLO0GjrJ5Xt_Y9uMo'
  }

  Send (notification, data, to, callback)
  {
    request
      .post('https://fcm.googleapis.com/fcm/send')
      .send({
        notification: notification,
        data: data,
        to: to,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', 'key=' + this.ServerKey)
      .end(callback)
  }
}
