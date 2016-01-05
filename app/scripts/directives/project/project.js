/**
 * Created by antoinemoreaux on 12/12/2015.
 */

'use strict';

/**
 * Created by antoinemoreaux on 07/07/15.
 */

var url = 'http://localhost:9000/images/';

angular.module('portfolioApp').directive('project', ['$compile', function ($compile) {
  'use strict';

  function createCollaborators(test, attr) {
    var result = attr.collaborators[test][0];
    for (var i = 1; i < attr.collaborators[test].length; i++) {
      result += ' - ' + attr.collaborators[test][i];
    }
    return result;
  }

  function createTechnologies(attr) {
    var tech = '<div class="line"></div>' +
      '<div class="techno" style="width:' + attr.technologies.length * 5 * 2 + 'vw">' +
      '<img src="' + url + attr.technologies[0] + '.png">';
    for (var i = 1; i < attr.technologies.length; i++) {
      tech += '<img src="' + url + attr.technologies[i] + '.png">'
    }

    return tech + '</div>';
  }

  function createImageProject(attr) {

    var bloc = '<div class="img-side" style="background-color: ' + attr.color + '">';

    if (attr.video) {
      bloc += '<video class="video" autoplay loop="true" muted="true" src="' + url + attr.video + '"></video>';
    }

    bloc += '<img src="' + url + attr.imageCard + '">';

    return bloc + '</div>'
  }


  function createDataProject(attr) {

    return '<div class="text-side" style="' + attr.color + '">' +
      '<h3>' + attr.title + '</h3>' +
      '<p class="description">' + attr.description + '</p>' +
      '<div class="line"></div>' +
      '<ul>' +
      '<li>Project manager : ' + createCollaborators("manager", attr) + '</li>' +
      '<li>Designers : ' + createCollaborators("designer", attr) + '</li>' +
      '<li>Developers : ' + createCollaborators("developer", attr) + '</li>' +
      '</ul>' +
      '</div>'
  }


  return {
    restrict: 'E',

    //scope: {
    //  project: '='
    //},

    link: function ($scope, $element, $attrs) {

      var dataTemplate = angular.element('<div style="background-color:' + $scope[$attrs.project].color + '" class="project row">' + createDataProject($scope[$attrs.project]) + '</div>');
      var imageTemplate = angular.element('<div class="project row">' + createImageProject($scope[$attrs.project]) + '</div>');
      var technoTemplate = angular.element('<div style="background-color:' + $scope[$attrs.project].color + '" class="row">' + createTechnologies($scope[$attrs.project]) + '</div>');

      if ($scope[$attrs.project].side === 'right') {
        $element.append(dataTemplate).append(imageTemplate);
      } else {
        $element.append(imageTemplate).append(dataTemplate);
      }

      $element.append(technoTemplate);
      $compile(dataTemplate)($scope);
      $compile(imageTemplate)($scope);
      $compile(technoTemplate)($scope);

    }
  };
}]);