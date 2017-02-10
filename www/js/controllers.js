angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('templates/sobre.html', {
        scope: $scope
    }).then(function(modalSobre) {
        $scope.modalSobre = modalSobre;
    });

    $scope.closeSobre = function() {
        $scope.modalSobre.hide();
    };

    $scope.sobre = function() {
        $scope.modalSobre.show();
    };

    $ionicModal.fromTemplateUrl('templates/equipe.html', {
        scope: $scope
    }).then(function(modalEquipe) {
        $scope.modalEquipe = modalEquipe;
    });

    $scope.closeEquipe = function() {
        $scope.modalEquipe.hide();
    };

    $scope.equipe = function() {
        $scope.modalEquipe.show();
    };

})

.controller('RadioCtrl', function($scope, $rootScope, $cordovaMedia, $ionicPopup, ConnectivityMonitor, AudioSvc) {

    $scope.isPlaying = false;
    var src = 'http://audio.wbhm.org:8000/live.mp3';

    if ($scope.isPlaying) {
        $scope.status = 'Reproduzindo ...';
    } else {
        $scope.status = 'Pausado ...';
    }

    $scope.radioPlay = function() {
        if (ConnectivityMonitor.isOnline() && !$scope.isPlaying) {
            $scope.isPlaying = true;
            $scope.status = 'Reproduzindo ...';
            AudioSvc.playAudio(src);
        } else if ($scope.isPlaying) {
            $scope.isPlaying = false;
            $scope.status = 'Pausado...'
            AudioSvc.releaseAudio();
        } else {
            $scope.isPlaying = false;
            $scope.status = 'Pausado...';
            $ionicPopup.alert({
                title: "Internet Offline",
                content: "Verifique se seu aparelho está conectado na Internet!"
            });
            AudioSvc.releaseAudio();
        }
    }

})

.controller('HomeCtrl', function($scope) {

    $scope.navTitle = '<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';

})

.controller('NoticiasCtrl', function($scope, $http, $ionicFilterBar, wpFactory, LoadingService) {

    $scope.navTitle = '<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';

    $scope.showFilterBar = function() {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.posts,
            update: function(filteredItems, filterText) {
                $scope.posts = filteredItems;
                if (filterText) {
                    console.log(filterText);
                }
            }
        });
    };

    $scope.posts = [];
    $scope.images = {};

    $scope.getItems = function() {
        LoadingService.show();
        wpFactory.getPosts(5).then(function(succ) {
            $scope.posts = succ;
            angular.forEach(succ, function(value, index) {
                $scope.setUrlForImage(index, value.featured_media);
            });
            LoadingService.hide();
        }, function error(err) {
            console.log('Errror: ', err);
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    $scope.setUrlForImage = function(index, id) {
        wpFactory.getMediaDataForId(id).then(function(succ) {
            $scope.images[index] = succ.source_url;
        });
    };

    $scope.getItems();

})

.controller('NoticiasDtCtrl', function($scope, $http, $stateParams, wpFactory) {

    $scope.getItems = function() {
        wpFactory.getPostsForId($stateParams.id).then(function(succ) {
            $scope.posts = succ;
            $scope.setUrlForImage(succ.featured_media);
        }, function error(err) {
            console.log('Errror: ', err);
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    $scope.setUrlForImage = function(id) {
        wpFactory.getMediaDataForId(id).then(function(succ) {
            $scope.image = succ.source_url;
        });
    };

    $scope.getItems();


})

.controller('ProgramacaoCtrl', function($scope, $http) {

    $scope.navTitle = '<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';

    $scope.getItems = function() {
        $http.get("https://raw.githubusercontent.com/rafabarzotto/app-radiocidade-configs/master/json/progs.json")
            .then(function(response) {
                $scope.progs = response.data.progs;
            }, function(error) {}).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.getItems();

})

.controller('EquipeCtrl', function($scope, $http) {

    $scope.navTitle = '<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';

    $scope.getItems = function() {
        $http.get("https://raw.githubusercontent.com/rafabarzotto/app-radiocidade-configs/master/json/equipes.json")
            .then(function(response) {
                $scope.equipes = response.data.equipes;
            }, function(error) {}).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.getItems();

})

.controller('SobreCtrl', function($scope, $http) {
    $scope.openFb = function() {
        window.open('http://facebook.com.br/rafabarzotto', "_system");
    };

    $scope.openMail = function(mail) {
        window.open('mailto:' + mail, '_system');
    };

    $scope.openLinkedin = function() {
        window.open('http://br.linkedin.com/in/rafael-barzotto-917396103', "_system");
    };

    $scope.openGit = function() {
        window.open('http://github.com/rafabarzotto', "_system");
    };



})

.controller('ContatoCtrl', function($scope, $ionicLoading, $http, $ionicPopup) {

    $scope.navTitle = '<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';

    $scope.openSite = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Abrir Site?',
            template: 'Abrir o site da Radio Cidade?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                window.open('http://www.cidadefm10.com.br', '_system', 'location=yes');
            } else {}
        });
    };

    $scope.openFb = function() {
        window.open('http://facebook.com.br/radiocidademontecarlo', "_system");
    };

    $scope.dialPhone = function(number) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Realizar Ligação?',
            template: 'Tem certeza que deseja realizar a ligação?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                window.open('tel:' + number, '_system');
            } else {}
        });
    }

    $scope.dialCell = function(number) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Realizar Ligação?',
            template: 'Tem certeza que deseja realizar a ligação?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                window.open('tel:' + number, '_system');
            } else {}
        });
    }

});
