cjs.controller('homeController', function ($scope, $timeout, gapiFactory) {
    var emailCount = 20;
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
        promiseEmails = gapiFactory.loadEmails(emailCount);
        promiseEmails.then(function (data) {
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

    $scope.signOut = function () {
        gapi.auth.signOut();
    };

    $timeout(function () {
        $scope.start();
    }, 1000);

    //Modal dialog window settings
    $scope.modalShown = false;
    // Toggle modal window
    $scope.toggleModal = function (itemData) {
        var promiseSingleEmail;
        promiseSingleEmail = gapiFactory.loadSingleEmail(itemData);
        promiseSingleEmail.then(function (data) {
            $scope.itemData = data.snippet;
        });
        $scope.modalShown = !$scope.modalShown;
    };

    //Should be rewritten to send arrayFrom and arrayTo to google Api to send correct array
    $scope.$on('loadMoreEmails', function () {
        var promiseEmails;
        emailCount += 20;
        promiseEmails = gapiFactory.loadEmails(emailCount);
        promiseEmails.then(function (data) {
            $scope.mailList=data;
        });

    });
});