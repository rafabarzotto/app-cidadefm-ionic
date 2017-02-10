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


.service('AudioSvc', [function($ionicPopup) {

    var AudioSvc = {
        my_media: null,
        mediaTimer: null,
        playAudio: function(src, cb) {
            var self = this;

            // stop playing, if playing
            self.stopAudio();

            self.my_media = new Media(src, onSuccess, onError);
            self.my_media.play();

            // if (self.mediaTimer == null) {
            //     self.mediaTimer = setInterval(function() {
            //         self.my_media.getCurrentPosition(
            //             function(position) {
            //                 cb(position, self.my_media.getDuration());
            //             },
            //             function(e) {
            //                 console.log("Error getting pos=" + e);
            //             }
            //         );
            //     }, 1000);
            // }

            function onSuccess() {
                console.log("playAudio():Audio Success");
            }

            // onError Callback
            //
            function onError(error) {
                console.log("playAudio():Audio Error");
            }

        },

        resumeAudio: function() {
            var self = this;
            if (self.my_media) {
                self.my_media.play();
            }
        },
        pauseAudio: function() {
            var self = this;
            if (self.my_media) {
                self.my_media.pause();
            }
        },
        stopAudio: function() {
            var self = this;
            if (self.my_media) {
                self.my_media.stop();
            }
            if (self.mediaTimer) {
                clearInterval(self.mediaTimer);
                self.mediaTimer = null;
            }
        },
        releaseAudio: function(){
            var self = this;
            if(self.my_media){
                self.my_media.release();
            }
        }

    };

    return AudioSvc;
}])

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