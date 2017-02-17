angular.module('starter.services', [])

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork, $ionicPopup) {

    return {
        isOnline: function() {
            if (ionic.Platform.isWebView()) {
                return $cordovaNetwork.isOnline();
            } else {
                return navigator.onLine;
            }
        },
        isOffline: function() {
            if (ionic.Platform.isWebView()) {
                return !$cordovaNetwork.isOnline();
            } else {
                return !navigator.onLine;
            }
        },
        startWatching: function() {
            if (ionic.Platform.isWebView()) {

                $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                    console.log('on');
                });

                $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
                    console.log('off');
                });

            } else {

                window.addEventListener("online", function(e) {
                    alert("went online");
                }, false);

                window.addEventListener("offline", function(e) {
                    alert("went offline");
                }, false);
            }
        }
    }
})

.factory('wpFactory', function($http, $q) {

    var url = 'http://www.cidadefm10.com.br/site/wp-json/wp/v2/';

    function getPosts(number) {
        return ($http.get(url + 'posts?per_page=' + number)
            .then(handleSuccess, handleError));
    }

    function getPostsForId(id) {
        return ($http.get(url + 'posts/' + id, {
                ignoreLoadingBar: true
            })
            .then(handleSuccess, handleError));
    }

    function getMediaDataForId(id) {
        return ($http.get(url + 'media/' + id, {
                ignoreLoadingBar: true
            })
            .then(handleSuccess, handleError));
    }

    function handleSuccess(response) {
        return response.data;
    }

    function handleError(response) {
        if (!angular.isObject(response.data) || !response.data.message) {
            return ($q.reject("An unknown error occurred."));
        }
        return ($q.reject(response.data.message));
    }

    return ({
        getPosts: getPosts,
        getMediaDataForId: getMediaDataForId,
        getPostsForId: getPostsForId
    });
})


.factory('LoadingService', function($ionicLoading) {

    function show() {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios-small"></ion-spinner>'
        }).then(function() {

        });
    }

    function hide() {
        $ionicLoading.hide().then(function() {});
    }

    return ({
        show: show,
        hide: hide
    });

});