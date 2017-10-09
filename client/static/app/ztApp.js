var app = angular.module("ztApp", []);


app.filter('formatUrl', function() {
    return function(x) {
        var txt = "hello";
        x = x.replace('https://www.protect-zt.com/','');
        var reg = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
        var matches = x.match(reg);
        var hostname = (new URL(matches[0])).hostname;
        console.log(matches[0]);
        console.log(hostname);
        return hostname;
    };
});
app.filter('formatUrlLink', function() {
    return function(x) {
        var txt = "hello";
        x = x.replace('https://www.protect-zt.com/','');
        var reg = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
        var matches = x.match(reg);
        // var hostname = (new URL(matches[0])).hostname;
        console.log(matches[0]);
        // console.log(hostname);
        return matches[0];
    };
});
app.controller('ztSearch', function($scope, $http) {
    $scope.error = '';
    $scope.listeSearch = [];
    $scope.searchDetail = function(link){
    	if (link.length == 0) {
            $scope.error = 'problème de lien...'
        } else {
           
            $http.post('/detail', {
                detail: link
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(successCallback, errorCallback);

            function successCallback(response) {
                //success code
                console.log(response);
                $scope.detailSearch = response.data;
            }

            function errorCallback(error) {
                //error code
                console.log(error);
            }
        }
    }
    $scope.doSearch = function(searchstring) {
        if (searchstring.length < 4) {
            $scope.error = 'vous devez entrer plus de caractères pour utiliser la function recherche (min 4)'
        } else {
            
            $http.post('/search', {
                recherche: searchstring
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(successCallback, errorCallback);

            function successCallback(response) {
                //success code
                console.log(response);
                $scope.listeSearch = response.data;
            }

            function errorCallback(error) {
                //error code
                console.log(error);
            }
        }

    }
});