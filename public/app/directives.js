var shared = angular.module('shared');
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
var admin = angular.module('masterAdmin');
admin.directive('masterAdminLeftSideBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/masterAdminLeftSideBar.html',
        controller: 'MasterViewController'
    };
}]);
var admin = angular.module('masterAdmin');
admin.directive('masterAdminTopBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/masterAdminTopBar.html',
        controller: 'MasterViewController'
    };
}]);
var admin = angular.module('masterAdmin');
admin.directive('stripeForm', function() {
    return {
            restrict: 'A',
            replace: true,
            templateUrl: 'app/templates/stripeForm.html',
            controller: function($scope) {
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
                var card = elements.create('card', {style: style});

                // Add an instance of the card Element into the `card-element` <div>
                card.mount('#card-element');

                // Handle real-time validation errors from the card Element.
                card.addEventListener('change', function(event) {
                  var displayError = document.getElementById('card-errors');
                  if (event.error) {
                    displayError.textContent = event.error.message;
                  } else {
                    displayError.textContent = '';
                  }
                });

                // Handle form submission
                var form = document.getElementById('payment-form');
                form.addEventListener('submit', function(event) {
                  event.preventDefault();

                  stripe.createToken(card).then(function(result) {
                    if (result.error) {
                      // Inform the user if there was an error
                      var errorElement = document.getElementById('card-errors');
                      errorElement.textContent = result.error.message;
                    } else {
                      // Send the token to your server
                      stripeTokenHandler(result.token);
                    }
                    });
                });
                
                function stripeTokenHandler(token) {
                  // Insert the token ID into the form so it gets submitted to the server
                  var form = document.getElementById('payment-form');
                  var hiddenInput = document.createElement('input');
                  hiddenInput.setAttribute('type', 'hidden');
                  hiddenInput.setAttribute('name', 'stripeToken');
                  hiddenInput.setAttribute('value', token.id);
                  form.appendChild(hiddenInput);

                  // Submit the form
                  form.submit();
                }
                                      
            }
    }
});
var staff = angular.module('studioStaff');
staff.directive('studioStaffLeftSideBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/StudioStaffLeftSideBar.html',
        controller: 'StudioStaffViewController'
    };
}]);
var staff = angular.module('studioStaff');
studio.directive('studioStaffTopBar', [function() {
    return {
        templateUrl: '/app/templates/studioStaffTopBar.html',
        controller: 'StudioStaffViewController'
    };
}]);
var customer = angular.module('studioCustomer');
customer.directive('studioCustomerLeftSideBar', ['$state', function($state) {
    return {
        templateUrl: 'app/templates/studioCustomerLeftSideBar.html',
        controller: 'StudioCustomerViewController'
    };
}]);
var customer = angular.module('studioCustomer');
customer.directive('studioCustomerTopBar', [function() {
    return {
        templateUrl: '/app/templates/studioCustomerTopBar.html',
        controller: 'CustomerViewController'
    };
}]);