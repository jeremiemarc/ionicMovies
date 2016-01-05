'use strict';

var ionicMovies = angular.module('ionicMovies', ['ionic']);

ionicMovies.controller('MovieController', function($scope, $http, $ionicLoading, Movies)
{
    $scope.moviesearch = {
        query : '',
        found : false,
        entries: []
    };

    $scope.startLoading = function($ionicLoading) {
        $ionicLoading.show({
            template:'<ion-spinner icon="dots" class="spinner-dark"></ion-spinner>'
        });
    };
    $scope.endLoading = function($ionicLoading){
        $ionicLoading.hide();
    };
    $scope.searchMovie = function()
    {
        if(angular.isDefined($scope.moviesearch.query) && $scope.moviesearch.query.length > 1) {

         $scope.startLoading($ionicLoading);

         Movies.get($scope.moviesearch.query)
         .success(function(data) {
           console.log(data);
           if(data.Response !== 'False')
           {  

              var movieDetails = {};
              movieDetails.title = data.Title;
              movieDetails.year = data.Year;
              movieDetails.runtime = data.Runtime;
              movieDetails.genre = data.Genre;
              movieDetails.imdbRating = data.imdbRating;
              movieDetails.director = data.Director;
              movieDetails.actors = data.Actors;
              movieDetails.language = data.Language;
              movieDetails.country = data.Country;
              movieDetails.awards = data.Awards;
              movieDetails.writer = data.Writer;
              movieDetails.plot = data.Plot;


              movieDetails.poster = data.Poster !== 'N/A' ? data.Poster : 'img/logo_w.png';
              movieDetails.votes = data.imdbVotes;  
              movieDetails.response = data.Response;

              
              $scope.moviesearch.entries.unshift(movieDetails);

              console.log($scope.moviesearch.entries.length);

              $scope.moviesearch.found = $scope.moviesearch.entries.length > 1;

          }
        $scope.endLoading($ionicLoading);
    });
}
};
});

ionicMovies.factory('Movies', function($http) {
    return {
        get: function(title) {
            return $http({
                url: 'http://www.omdbapi.com?t='+title+'&y=&plot=full&r=json',
                method: 'GET'
            }); 
        }, 

        getMock: function(){

            return $http({
                url: 'data/titanic.json',
                method: 'GET'
            }); 

        }
    };
});

ionicMovies.directive('movieEntry', [
    function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                details: '='
            },
            templateUrl: 'partials/movieEntry.html'
        };
    }
]);