/**
 * Created by deepwest83 on 10/23/2016.
 */

cjs.factory('gapiFactory', function ($q) {
    var request;

    function _loadEmails() {
        var deferred = $q.defer();
        gapi.client.load('gmail', 'v1', function () {
            request = gapi.client.gmail.users.threads.list({
                'userId': 'me'
            });
            request.execute(function (resp) {
                deferred.resolve(resp.threads);console.log(resp.threads);
            });
        });
        return deferred.promise;
    }

    function _signIn(signInCallback) {
        gapi.signin.render('signInButton',
            {
                'callback': signInCallback, // Function handling the callback.
                'clientid': '162151956695-3voa7h9ij4e2mqasv69g6sp6uouqsc29.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly',
                'cookiepolicy': 'single_host_origin'
            }
        );
    };

    return {
        signIn: _signIn,
        loadEmails: _loadEmails
    }
});