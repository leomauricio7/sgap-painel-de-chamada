app.controller('LayoutController', function($scope, $http, $window, $route, $mdDialog) {
    $scope.fullscreen = true;
    $scope.dados = localStorage.getItem('configPanel') ? JSON.parse(localStorage.getItem('configPanel')) : {};
    if ($scope.dados && !$scope.dados.idPlaylist) {
        $scope.dados.urlPlaylist = `https://www.youtube.com/embed/videoseries?list=PL_rQTI99G4P_TnfAlTxCy_3JqlNCdam6j&loop=1&autoplay=1&mute=0`;
    }
    console.log($scope.dados)
    const carregaNoticias = () => {
        $http({
            method: 'GET',
            url: 'https://newsapi.org/v2/top-headlines',
            params: {
                country: 'pt',
                apiKey: '154e699da3cd4adba9bfb3c5e967d92d'
            }
        }).then(response => {
            console.log('sucesso ao carregar as noticias', response.data)
            $scope.noticias = response.data.articles;
            $scope.noticia = '';
            response.data.articles.map(elm => {
                if (elm.title != undefined) {
                    $scope.noticia += elm.title + ' : ' + elm.description+'. ';
                }
            })
        }).catch(err => {
            console.log('error ao carregar notícias', err)
        });
    };
    $scope.toogleFullscreen = function(elem) {
        if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
            $scope.fullscreen = false;
            if (document.body.requestFullScreen) {
                document.body.requestFullScreen();
            } else if (document.body.mozRequestFullScreen) {
                document.body.mozRequestFullScreen();
            } else if (document.body.webkitRequestFullScreen) {
                document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (document.body.msRequestFullscreen) {
                document.body.msRequestFullscreen();
            }
        } else {
            $scope.fullscreen = true;
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };
    $scope.config = (ev) => {
        $mdDialog.show({
                controller: 'ConfigController',
                templateUrl: '/views/config.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function(answer) {
                $window.location.reload();
                // $route.reload();
                console.log('hide dialog')
            }, function() {
                console.log('cancel dialog')
            });
    };

    const carregaSenhas = () => {
        console.log('carregando senhas passadas')
        if (localStorage.getItem('senhas')) {
            console.log(JSON.parse(localStorage.getItem('senhas')));
            $scope.senhas = JSON.parse(localStorage.getItem('senhas'));
            $scope.senha = $scope.senhas[$scope.senhas.length - 1];
            $scope.senhasEmitidas = $scope.senhas;
            for (let i = $scope.senhas.length - 1; i >= 5; i--) {
                $scope.senhasEmitidas.push($scope.senhas[i - 1]);
            }
            console.log($scope.senhasEmitidas)
        }
    };

    const rapeat = () => {
        carregaSenhas();
        // $scope.intval = $interval(carregaSenhas(), 500);
    };

    $scope.$on('$routeChangeSuccess', function() {
        carregaNoticias();
        rapeat();
        if (!localStorage.getItem('configPanel')) {
            $scope.config();
        }
    });

});