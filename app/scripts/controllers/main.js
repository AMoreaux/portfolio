'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */

angular.module('portfolioApp')
  .controller('MainCtrl', function ($http, $scope, $compile) {

    $http({
      method: 'GET',
      url: '../../assets/projects.json'
    }).then(function successCallback(response) {

      var count = 0;

      for (var proj in response.data) {

        $scope[proj] = response.data[proj];
        $scope[proj].color = (count % 2 === 0) ? '#F7F4F2' : 'white';
        $scope[proj].side = (count % 2 === 0) ? 'right' : 'left';


        angular.element(document.getElementById('projects'))
          .append($compile('<project data-project="' + proj + '"></project>')($scope));

        count++;
      }

    }, function errorCallback(response) {

      console.log('>>>>>>>>>>>>> error', response);
    });

  });
