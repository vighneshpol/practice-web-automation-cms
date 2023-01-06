const cp = require('child_process');
const path = require('path');
const fs = require('fs');

const exec_opt = {
    cwd: null,
    env: null,
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM'
};

class TerminusUtil {

    terminusCommand(execCommand){
        // this.runCom('cd ~/terminus');
        this.runCom(execCommand);
    }

    // getSFTPData accepts 3 parameters. site - siteID, env - dev/test/live, fieldName - username/host
    getSFTPData(site, env, fieldName){
        this.runCom('cd ~/terminus');
        let execCommand = `terminus connection:info ${site}.${env} --fields='sftp_${fieldName}'`;
        return this.fetchSFTPData(execCommand, fieldName);
    }

    fetchSFTPData(execCommand, fieldName){
        try{
            const data = cp.execSync(execCommand, exec_opt);
            return data.toLowerCase().replace(/-|\s/gm,'').replace(`sftp${fieldName}`, '');
        }
        catch(err){
            return err;
        }
    }

    runCom(execCommand) {
        const exec_options = {
            cwd: null,
            env: null,
            encoding: 'utf8',
            timeout: 0,
            maxBuffer: 200 * 1024,
            killSignal: 'SIGTERM'
        };

        try {
            const data = cp.execSync(execCommand, exec_options);
            return data.toString();
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new TerminusUtil;