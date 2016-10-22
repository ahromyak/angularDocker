cjs.controller('homeController', function ($scope) {
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;

    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function (authResult) {
        // Do a check if authentication has been successful.
        if (authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;

            //     ...
            // Do some work [1].
            //     ...
        } else if (authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;

            // Report error.
        }
    };

    // When callback is received, we need to process authentication.
    $scope.signInCallback = function (authResult) {console.log(authResult);
        $scope.$apply(function () {
            $scope.processAuth(authResult);
        });
    };

    $scope.userInfoCallback = function(userInfo) {
        $scope.$apply(function() {
            $scope.processUserInfo(userInfo);
        });
    };

    // userInfo is a JSON object.
    $scope.processUserInfo = function(userInfo) {console.log('hello');
        // You can check user info for domain.
        if (userInfo['domain'] == 'mycompanydomain.com') {
            // Hello colleague!
        }

        // Or use his email address to send e-mails to his primary e-mail address.
        sendEMail(userInfo['emails'][0]['value']);
    }


        // Render the sign in button.
    $scope.renderSignInButton = function () {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '[162151956695-43hfg93bbm91to2elra9n2qb2i80u1o0.apps.googleusercontent.com]', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        );
        gapi.client.request(
            {
                'path':'/plus/v1/people/me',
                'method':'GET',
                'callback': $scope.userInfoCallback
            }
        );
    }

    // Start function in this example only renders the sign in button.
    $scope.start = function () {
        $scope.renderSignInButton();
    };

    // Call start function on load.
    $scope.start();
});