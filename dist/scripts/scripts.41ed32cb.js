"use strict";angular.module("webspeakApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/:targetId",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("webspeakApp").controller("MainCtrl",["$scope","$route",function(a,b){var c=Math.random().toString(36).substring(2),d=b.current.params.targetId;a.uniqueId=c,a.targetPeerId=d,navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,navigator.getUserMedia({video:!1,audio:!0},function(b){var e=new Peer(c,{key:"7ktv97s5rx2bj4i"});if(d){console.log("calling");var f=e.call(d,b);f.on("stream",function(b){document.getElementById("theireAudio").src=URL.createObjectURL(b),console.log("set remoteStreamSource to: "+a.remoteStreamSource)})}else e.on("call",function(c){console.log("got a call"),c.answer(b),c.on("stream",function(b){document.getElementById("theireAudio").src=URL.createObjectURL(b),console.log("set remoteStreamSource to: "+a.remoteStreamSource)})})},function(a){console.log("Failed to get local stream",a)})}]);