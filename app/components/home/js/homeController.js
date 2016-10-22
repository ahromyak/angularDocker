cjs.controller('homeController', function ($scope, $timeout) {
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;

    function listThreads(userId, callback) {
        var request = gapi.client.gmail.users.threads.list({
            'userId': userId
        });
        request.execute(callback);
    };

    $scope.processAuth = function (authResult) {
        // Do a check if authentication has been successful.
        if (authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;

        } else if (authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
            // Report error.
        }
    };
    // When callback is received, we need to process authentication.
    $scope.signInCallback = function (authResult) {
        $scope.$apply(function () {
            $scope.processAuth(authResult);
        });
        gapi.client.load('gmail', 'v1', function() {
            listThreads('me', function(resp) {
                $scope.$apply(function () {
                    $scope.mailList = resp.threads;
                });
            });
        });
    };
    // Render the sign in button.
    $scope.renderSignInButton = function () {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '162151956695-3voa7h9ij4e2mqasv69g6sp6uouqsc29.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly',
                'cookiepolicy': 'single_host_origin'
            }
        );
    };
    // Start function in this example only renders the sign in button.
    $scope.start = function () {
        $scope.renderSignInButton();
    };

    $scope.signOut = function(){
        gapi.auth.signOut();
    };

    $timeout( function(){ $scope.start(); }, 1000);
});