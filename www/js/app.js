// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'jett.ionic.filter.bar', 'ion-affix'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      StatusBar.styleLightContent();
    }

    if (window.Connection) {
      if (navigator.connection.type == Connection.NONE) {
        $ionicPopup.alert({
          title: "Internet Offline",
          content: "Verifique se seu aparelho está conectado na Internet!"
        });
      }
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicFilterBarConfigProvider) {

  $ionicFilterBarConfigProvider.theme('light');
  $ionicFilterBarConfigProvider.clear('ion-close');
  $ionicFilterBarConfigProvider.search('ion-search');
  $ionicFilterBarConfigProvider.backdrop(true);
  $ionicFilterBarConfigProvider.transition('vertical');
  $ionicFilterBarConfigProvider.placeholder('Buscar...');

  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.text('');
  $ionicConfigProvider.navBar.alignTitle('');
  //$ionicConfigProvider.tabs.position('bottom');

  $stateProvider

    .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    cache: false,
    views: {
      'tab-home': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.noticias', {
    url: "/noticias",
    cache: true,
    views: {
      'tab-noticias': {
        templateUrl: "templates/noticias.html",
        controller: 'NoticiasCtrl'
      }
    }
  })

    .state('app.noticias-detail', {
    url: "/noticias/:id",
    cache: true,
    views: {
      'tab-noticias': {
        templateUrl: "templates/noticias-detail.html",
        controller: 'NoticiasDtCtrl'
      }
    }
  })

  .state('app.programacao', {
    url: "/programacao",
    cache: true,
    views: {
      'tab-programacao': {
        templateUrl: "templates/programacao.html",
        controller: 'ProgramacaoCtrl'
      }
    }
  })

  .state('app.equipe', {
    url: "/equipe",
    cache: true,
    views: {
      'tab-equipe': {
        templateUrl: "templates/equipe.html",
        controller: 'EquipeCtrl'
      }
    }
  })

  .state('app.contato', {
    url: "/contato",
    cache: true,
    views: {
      'tab-contato': {
        templateUrl: "templates/contato.html",
        controller: 'ContatoCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});