//constructor
function MailBackend(port){
  this.port = port;
  this.stack = [];
  this.ms = require('smtp-tester');
  this.mailServer = null;


}

MailBackend.prototype.expect_receive = function(data){
  this.stack.push(data)
}

MailBackend.prototype.start = function(){
  var handler;
  this.mailServer = this.ms.init(this.port);
  console.log(this)
  console.log("mailserver initiated at " + this.port)
  handler = function(addr,id,email) {
    expect(this.stack.length).not.toEqual(0);
  };

  this.mailServer.bind(handler);
  }

MailBackend.prototype.stop = function(){
  if (this.mailServer != null)
  {
    expect(this.stack.length).toEqual(0);
    this.mailServer.stop()
  }
}
  exports.MailBackend = MailBackend
