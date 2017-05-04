angular
  .module('app')
  .constant('app.settings', new Settings())
  .run(run);

  function Settings(){
    return {
      'version': '1.0.0',
      'url_service': 'https://kickapi.herokuapp.com',
      'url_fb': 'https://graph.facebook.com/v2.6'
    };
  }

run.$inject = ['$rootScope', '$ionicPlatform', '$state'];

function run($rootScope, $ionicPlatform, $state) {

    $ionicPlatform.ready(function () {
      // redirect if logged
      const token = localStorage.getItem('kickCredentials');
      if (token) {
        const userStr = localStorage.getItem('kickUserCredentials');
        const user = JSON.parse(userStr);
        if (user.Person.typeperson === 'E') {
          // redirect enterprise dash
          $state.go('enterpriseController.quadras');
        } else {
          // redirect player dash
          // $state.go('playerController.jogos');
        }
      }

      // check authenticate user start change route
      $rootScope.$on('$stateChangeStart', function (event,next,current) {
        var token = localStorage.getItem('kickCredentials') || undefined;
        if (!token) {
          $state.go('login');
        }
      });

      /*
      Receive emitted message and broadcast it.
      */
      $rootScope.$on('handleEmit', function (event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
      });
    });
}
