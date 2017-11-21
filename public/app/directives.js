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
var studio = angular.module('studio');
studio.directive('leftSideBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/leftSideBar.html',
        controller: 'StudioStaffViewController'
    };
}]);
var studio = angular.module('studio');
studio.directive('pageTitle', [function() {
    return {
        templateUrl: '/app/templates/pageTitle.html',
        scope: {
            title : '@',
            subtitle: '@'
        },
        controller: 'PageTitleController'
    };
}]);
var studio = angular.module('studio');
studio.directive('topBar', [function() {
    return {
        templateUrl: '/app/templates/topBar.html',
        controller: 'StudioStaffViewController'
    };
}]);
var studio = angular.module('studio');
studio.directive('wysiwig', ['$state', function($state) {
    return {
        restrict: 'A',
        template: '<textarea id="elm1" name="area"></textarea>',
        controller: 'StudioAdminCustomizeEmailTemplatesController',
        link: function(scope, el, attr) {
            $(document).ready(function () {
                if($("#elm1").length > 0){
                    tinymce.init({
                        selector: "textarea#elm1",
                        theme: "modern",
                        height:300,
                        plugins: [
                            "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                            "save table contextmenu directionality emoticons template paste textcolor"
                        ],
                        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons", 
                        style_formats: [
                            {title: 'Bold text', inline: 'b'},
                            {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
                            {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
                            {title: 'Example 1', inline: 'span', classes: 'example1'},
                            {title: 'Example 2', inline: 'span', classes: 'example2'},
                            {title: 'Table styles'},
                            {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
                        ]
                    });    
                } 
            })
        },
    };
}])