var DateServerConfig = function(serverVagrantId) {
    this.serverVagrantId = serverVagrantId;
}

DateServerConfig.prototype.setServerDate = function(new_date) {
    var cmd = "vagrant ssh " + this.serverVagrantId + " -c 'sudo date -s \"" + new_date + "\"'";
    console.log(cmd);

    var exec = require('child_process').exec, child;
    child = exec(cmd,
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
}
  
exports.DateServerConfig = DateServerConfig;
