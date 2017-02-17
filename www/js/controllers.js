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

.controller('RadioCtrl', function($scope, $rootScope, $ionicPopup, ConnectivityMonitor) {


    $scope.isPlaying = false;
    var src = 'http://198.143.132.154:11798/;';

    $scope.playWebAudio = function() {
        try {
            $scope.audio = new Audio(src);
            $scope.audio.play();
        } catch (err) {

        }
    }

    $scope.pauseWebAudio = function() {
        try {
            $scope.audio.pause();
        } catch (err) {

        }
    }

    if ($scope.isPlaying) {
        $scope.status = 'Reproduzindo ...';
    } else {
        $scope.status = 'Pausado ...';
    }

    $scope.radioPlay = function() {
        if (ConnectivityMonitor.isOnline() && !$scope.isPlaying) {
            $scope.isPlaying = true;
            $scope.status = 'Reproduzindo ...';
            $scope.playWebAudio();
        } else if ($scope.isPlaying) {
            $scope.isPlaying = false;
            $scope.status = 'Pausado...'
            $scope.pauseWebAudio();
        } else {
            $scope.isPlaying = false;
            $scope.status = 'Pausado...';
            $ionicPopup.alert({
                title: "Internet Offline",
                content: "Verifique se seu aparelho está conectado na Internet!"
            });
            $scope.pauseWebAudio();
        }
    }

})

.controller('HomeCtrl', function($scope) {

    $scope.navTitle = '<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';

})

.controller('NoticiasCtrl', function($scope, $http, wpFactory, LoadingService, $timeout) {

    $scope.navTitle = '<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';
    $scope.newsAPI = 'http://www.cidadefm10.com.br/site/wp-json/wp/v2/posts';

    $scope.posts = [];
    $scope.images = {};

    LoadingService.show();
    $scope.getItems = function() {
        wpFactory.getPosts(10).then(function(succ) {
            $scope.posts = succ;
            angular.forEach(succ, function(value, index) {
                $scope.setUrlForImage(index, value.featured_media);
            });
            LoadingService.hide();
        }, function error(err) {
            console.log('Errror: ', err);
            LoadingService.hide();
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
        $http.get("http://cidadefm10.com.br/app/progs.php")
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
        $http.get("http://www.cidadefm10.com.br/app/equipe.php")
            .then(function(response) {
                $scope.equipes = response.data.equipe;
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