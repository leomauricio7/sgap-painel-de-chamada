app.controller('ConfigController', function($scope, $http, $mdDialog) {
    $scope.cancel = () => {
        $mdDialog.cancel();
    };
    $scope.panel = localStorage.getItem('configPanel') ? JSON.parse(localStorage.getItem('configPanel')) : {};
    $scope.save = () => {
        $scope.panel.urlPlaylist = `https://www.youtube.com/embed/videoseries?list=${$scope.panel.idPlaylist }&loop=1&autoplay=1&mute=0`;
        localStorage.setItem('configPanel', JSON.stringify($scope.panel));
        $mdDialog.hide();
    };
});