/**
 * Created by deepwest83 on 10/23/2016.
 */
cjs.directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            itemData: '='
        },
        replace: true,
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function() {
                scope.show = false;
            };
        },
        templateUrl: 'app/components/home/html/modal.html'
    };
});
