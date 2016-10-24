/**
 * Created by deepwest83 on 10/23/2016.
 */
cjs.directive('whenScrollEnds', function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var visibleHeight = element.height();
            var threshold = 1000;

            element.scroll(function() {
                var scrollableHeight = element.prop('scrollHeight');
                var hiddenContentHeight = scrollableHeight - visibleHeight;
                if (hiddenContentHeight - element.scrollTop() <= threshold) {
                    // Scroll is almost at the bottom. Loading more rows
                    scope.$apply(attrs.whenScrollEnds);
                }
            });
        }
    };
});
