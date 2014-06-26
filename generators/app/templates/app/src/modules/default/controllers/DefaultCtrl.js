define(function(){
    return ['$scope', DefaultCtrl];

    function DefaultCtrl($scope) {
        $scope.things = ['scuba', 'trampoline', 'chopsticks'];

        $scope.getNumberOfThings = function() {
            return $scope.things.length;
        };
    }
});