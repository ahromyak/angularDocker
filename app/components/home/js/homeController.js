cjs.controller('homeController', function ($scope, $timeout, gapiFactory) {
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;

    $scope.processAuth = function (authResult) {
        // Do a check if authentication has been successful.
        if (authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;

        } else if (authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
        }
    };
    // When callback is received, we need to process authentication.
    $scope.signInCallback = function (authResult) {
        var promiseEmails;
        $scope.$apply(function () {
            $scope.processAuth(authResult);
        });
        //Retreive emails
        promiseEmails = gapiFactory.loadEmails();
        promiseEmails.then(function(data){
                $scope.mailList = data;
        });
    };
    // Render the sign in button.
    $scope.renderSignInButton = function () {
        gapiFactory.signIn($scope.signInCallback);
    };
    // Start function renders the sign in button.
    $scope.start = function () {
        $scope.renderSignInButton();
    };

    $scope.signOut = function(){
        gapi.auth.signOut();
    };

    $timeout( function(){ $scope.start(); }, 1000);

    //Modal dialog window settings
    $scope.modalShown = false;
    // Toggle modal window
    $scope.toggleModal = function (itemData) {
        $scope.itemData = itemData;
        $scope.modalShown = !$scope.modalShown;
    };
});