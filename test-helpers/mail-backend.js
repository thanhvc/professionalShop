//constructor
function MailBackend(port){
  this.port = port;
  this.stack = [];
  this.mailServer = null;


}

MailBackend.prototype.expect_receive = function(data){
  this.stack.push(data)
};

MailBackend.prototype.start = function(){
  var handler;
  this.mailServer = require('smtp-tester').init(2025,{"disableDNSValidation":true});
  console.log(this);
  handler = function(addr,id,email) {
    //expect(this.stack.length).not.toEqual(0);
    console.log(addr);
    console.log(email);
  };

  this.mailServer.bind(handler);
  console.log("mailserver initiated at " + this.port);

};

MailBackend.prototype.stop = function(){
  if (this.mailServer != null)
  {
    expect(this.stack.length).toEqual(0);
    this.mailServer.stop()
  }
};
  exports.MailBackend = MailBackend;
