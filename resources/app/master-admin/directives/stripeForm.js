var admin = angular.module('masterAdmin');
admin.directive('stripePaymentForm', function() {
    return {
            restrict: 'A',
            replace: true,
            templateUrl: '/app/templates/stripeForm.html',
            controller: 'StudioPaymentController',
            link: function(scope, element, attrs) {

            scope.submitCard = submitCard;

            var elements = stripe.elements();
            var style = {
                          iconStyle: 'solid',
                          style: {
                            base: {
                              iconColor: '#8898AA',
                              color: '#000',
                              lineHeight: '36px',
                              fontWeight: 300,
                              fontFamily: 'Helvetica Neue',
                              fontSize: '19px',

                              '::placeholder': {
                                color: '#8898AA',
                              },
                            },
                            invalid: {
                              iconColor: '#e85746',
                              color: '#e85746',
                            }
                          },
                          classes: {
                            focus: 'is-focused',
                            empty: 'is-empty',
                          },
                        };
            var card = elements.create('card', style);
            card.mount('#card-element');

            // Handle real-time validation errors from the card Element.
            card.on('change', function(event) {
                setOutcome(event);
            });

            // Form Submit Button Click
            function submitCard() {
                var errorElement = document.querySelector('.error');
                errorElement.classList.remove('visible');
                createToken();
            }

            // Send data directly to stripe server to create a token (uses stripe.js)
            function createToken() {
                stripe.createToken(card).then(setOutcome);
            }

            // Common SetOutcome Function
            function setOutcome(result) {
                var errorElement = document.querySelector('.error');
                errorElement.classList.remove('visible');
                if (result.token) {
                  // Use the token to create a charge or a customer
                  stripeTokenHandler(result.token);
                } else if (result.error) {
                  errorElement.textContent = result.error.message;
                  errorElement.classList.add('visible');
                }
            }

            // Response Handler callback to handle the response from Stripe server
            function stripeTokenHandler(token) {
                //stripe webhook
            }
        }
    }
});