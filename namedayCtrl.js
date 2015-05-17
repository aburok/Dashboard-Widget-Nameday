angular.module('widget')
    .controller('weatherEditCtrl', ['$scope', '$collection', function($scope, $collection) {

        var cityCollection = $collection.getInstance(),
            colors = {
                day : '#2a6c62',
                night : '#11264a'
            };

        cityCollection.addAll([
            {city: 'Kraków', 'url': 'http://api.openweathermap.org/data/2.5/weather?id=3094802&units=metric'},
            {city: 'Oslo', 'url': 'http://api.openweathermap.org/data/2.5/weather?id=3143244&units=metric'},
            {city: 'Stockholm', 'url': 'http://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric'},
        ]);

        $scope.city = $scope.widget.options.dataBind.source;

        $scope.cities = cityCollection.all();

        $scope.$watch(function() {
            return $scope.widget.data.weather[0].icon;
        }, function(newData) {
            if(newData.match(/^\d{2}d$/)) {
                $scope.widget.options.color = colors.day;
            } else {
                $scope.widget.options.color = colors.night;
            }
        });

        $scope.save = function() {
            $scope.widget.options.dataBind.source = $scope.city;
            $scope.widget.getData().then(function() {
                $scope.widget.flip();
            });
        };
    }]);
