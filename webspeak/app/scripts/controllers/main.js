'use strict';

/**
 * @ngdoc function
 * @name webspeakApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webspeakApp
 */
angular.module('webspeakApp')
  .controller('MainCtrl', ['$scope', '$route', function ($scope, $route) {
    var uniqueId = Math.random().toString(36).substring(2);
    var targetId = $route.current.params.targetId;
    $scope.uniqueId = uniqueId;
    $scope.targetPeerId = targetId;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({video: false, audio: true},
    function(stream) {
        var peer = new Peer(uniqueId, {key: '7ktv97s5rx2bj4i'});
        if(targetId) {
            console.log('calling');
            var call = peer.call(targetId, stream);
            call.on('stream', function(remoteStream){
                document.getElementById('theireAudio').src = URL.createObjectURL(remoteStream);
                console.log('set remoteStreamSource to: ' + $scope.remoteStreamSource);
            });
        } else {
            peer.on('call', function(call) {
                console.log('got a call');
                call.answer(stream);
                call.on('stream', function(remoteStream) {
                    document.getElementById('theireAudio').src = URL.createObjectURL(remoteStream);
                    console.log("set remoteStreamSource to: " + $scope.remoteStreamSource);
                });
            });
        }

    },
    function(err) {
        console.log('Failed to get local stream', err);
    });
  }]);
