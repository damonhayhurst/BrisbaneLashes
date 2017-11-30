var admin = angular.module('masterAdmin');
admin.controller('MasterAddStudioController', ['$scope', '$http', 'Studio', 'SatellizerConfig', '$state', function($scope, $http, Studio, SatellizerConfig, $state) {
    
    SatellizerConfig.loginUrl = 'api/auth/master';
    $scope.studioData = {}
    $scope.studios = Studio.query();
    
    var stripe = Stripe('pk_test_7wtYtdXpamfKucG99nnchcrM');
                
    // Create an instance of Elements
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element
    $scope.card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>
    $scope.card.mount('#card-element');
    
    $scope.get = function(id) {
        Studio.get(id, (function(data) {
                $scope.studio = data;
        }));
    };
    
    $scope.submit = function() {
        $scope.studioData.stripeToken = $scope.createStripeToken();
        Studio.save($scope.studioData).$promise.then(
            function successCallback() {
                $state.go('admin.listStudios');
            });
    };
    
    $scope.createStripeToken = function() {
        stripe.createToken($scope.card).then(function(result) {
            if (result.error) {
              // Inform the user if there was an error
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              // Send the token to your server
              return result.token;
            }
        });
    }
}]);