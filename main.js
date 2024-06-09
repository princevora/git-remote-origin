const { exec } = require("child_process");

/**
 * Get git's user's remoteOrigin using local git commands
 * without using external npm or anyother libraries.
 * 
 * It returns a promise on result as a string
 * 
 * @returns { Promise<string> }
 */
function index() {
    return new Promise(async (resolve, reject) => {

        try {
            // First lets check if user has installed the git
            await isGitInstalled();

            // Get the remoteOrigin if no errors occured
            const remoteOrigin = await getRemoteOrigin();

            // Resolve the remoteOrigin
            resolve(remoteOrigin);

        } catch (error) {
            // Reject the error

            reject(error);
        }
    })
}

/**
 * Final functon to return the Remote origin using git command
 * 
 * @returns { Promise<string> }
 */
function getRemoteOrigin() {

    return new Promise((resolve, reject) => {
        const GIT_REMOTE_ORIGIN_COMMAND = "git remote get-url origin";

        // Run the command
        exec(GIT_REMOTE_ORIGIN_COMMAND, (error, stdout, stderr) => {
            // Reject the error
            if (error) {
                reject(stderr);
            }

            /**
             * Replace the first matching of "=" to empty
             */
            const remoteOrigin = stdout.replace("=", "");

            // resolve the remoteOrigin
            resolve(remoteOrigin);
        })
    })
}

/**
 * Check if the git is installed in user's local device and returns promise
 * 
 * @returns { Promise<string | boolean> }
*/
function isGitInstalled() {

    return new Promise((resolve, reject) => {

        /** * CHECK_GIT_VERSION    */
        const CHECK_GIT_VERSION = "git --version";

        exec(CHECK_GIT_VERSION, (error, stdout) => {
            // Reject if the git is not installed (Error occured)
            if (error) {
                reject("You have not installed git");
            }

            // resolve true if the git installed
            else {
                resolve(true);
            }
        })
    })
}

module.exports = index;
