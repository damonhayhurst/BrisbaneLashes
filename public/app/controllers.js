var shared = angular.module('shared');
studio.controller('PageTitleController', [function($scope, $state) {
}]);
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
var admin = angular.module('masterAdmin');
admin.controller('MasterLoginController', ['$scope', '$auth', '$state', 'SatellizerConfig', function($scope, $auth, $state, SatellizerConfig){
    $scope.loginData = {};
    SatellizerConfig.loginUrl = 'api/auth/master'
    $scope.loginSubmit = function(){
        $auth.login($scope.loginData).then(function(data) {
            $state.go('admin.listStudios', {});
        },
                                          function(error) {
            $state.go('403');
        });
    };
}]);
var admin = angular.module('masterAdmin');
admin.controller('MasterStudiosController', ['$scope', '$http', 'Studio', 'SatellizerConfig', '$state', function($scope, $http, Studio, SatellizerConfig, $state) {
    SatellizerConfig.loginUrl = 'api/auth/master';
    $scope.studioData = {}
    $scope.studios = Studio.query();
    
    
    $scope.delete = function(id) {
        Studio.destroy(id)
            .success(function(data) {
                
            });
    };
    
    $scope.viewPublic = function(id) {
        $state.go('studio', {id: id});
    }
    
    
}]);
var master = angular.module('masterAdmin');
master.controller('MasterViewController', ['$scope', '$state', function($scope, $state) {
    
    $scope.addStudio = function() {
        $state.go('admin.addStudio');
    };
    
    $scope.listStudios = function() {
        $state.go('admin.listStudios');
    };
}]);
var admin = angular.module('masterAdmin');
admin.controller('StudioPaymentController', ['$scope', function($scope) {
    
    
    
    
}]);
var studio = angular.module('studio');
studio.controller('StudioMainController', ['$scope', '$state', '$stateParams', '$http',  'SatellizerConfig', 'studio', function($scope, $state, $stateParams, $http, SatellizerConfig, studio) {
    
    $scope.studioData = studio.data;

}]);
var studio = angular.module('studio');
studio.controller('StudioProfileController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    $scope.uiConfig = {
        calendar:{
            editable: true
        }
    };
}]);
var staff = angular.module('studioStaff');
staff.controller('StudioAdminCustomizeEmailTemplatesController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    
}]);
var staff = angular.module('studioStaff');
staff.controller('StudioAdminCustomizeThemeController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    
}]);
var staff = angular.module('studioStaff');
staff.controller('StudioAdminEditController', ['$scope', '$state', '$http', '$stateParams', function($scope, $state, $http, $stateParams) {
    
    $scope.studioData = {}
    
    $http.get('api/public/studios/' + $stateParams.id).then(
        function(response) {
            $scope.studioData = response.data;
        }
    );
    
    $scope.update = function(){
        $http.put('api/studios/' + $stateParams.id, $scope.studioData).then(
            function successCallback(response) {
                $scope.studioData = response.data;
                $state.go('studio', {id: $stateParams.id});
            }
        );
    };

}]);
var staff = angular.module('studioStaff');
staff.controller('StudioAdminManageStaffController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    
}]);
var staff = angular.module('studioStaff');
staff.controller('StudioStaffBookingsController', ['$scope', '$stateParams', '$state', 'Appointment', 'uiCalendarConfig', 'Customer', '$compile', '$http', '$auth', '$timeout', function($scope, $stateParams, $state, Appointment, uiCalendarConfig, Customer, $compile, $http, $auth, $timeout) {
    
    // Select2
    $(".select2").select2();
    
    $scope.appointmentData = {};
    Customer.query().$promise.then(function successCallback(data) {
            $scope.customers = data;
    });
    
    $scope.submit = function() {
        Appointment.save($scope.bookingData).$promise.then(
            function successCallback(data) {
                console.log(data);
            });
    };
    
    $scope.eventSources = [
        {
            events: function(start, end, timezone, callback) {
                $http.get('api/events', {
                    params: {
                        start: start.format("YYYY-MM-DD"),
                        end: end.format("YYYY-MM-DD")
                    }
                }).then(function successCallback(result) {
                    var events = [];
                    
                    angular.forEach(result.data, function(item, index) {
                        var title;
                        console.log(item.category);
                        console.log(item.category === 'appointment');
                        if (item.category === 'appointment') {
                            for (var i = 0; i < $scope.customers.length; i++) {
                                console.log($scope.customers[i].id);
                                if ($scope.customers[i].id === parseInt(item.client_id)) {
                                    title = $scope.customers[i].first_name + " " + $scope.customers[i].last_name;
                                }
                            }
                        } else {
                            title = item.category;
                        }
                        var classColour = $scope.classColourChoose(item.category);
                        events.push({
                            id: item.id,
                            title: title,
                            start: item.start,
                            end: item.end,
                            className: classColour,
                            clientId: item.client_id,
                            price: item.price,
                            notes: item.notes,
                            category: item.category,
                            allDay: false
                        });
                    })
                    callback(events);
                });
            }
        }
    ];
    
    
    var $body = $("body");
    var $modal = $('#event-modal');
    var $event = ('#external-events div.external-event');
    var $calendar = $('#calendar');
    var $saveCategoryBtn = $('.save-category');
    var $categoryForm = $('#add-category form');
    var $extEvents = $('#external-events');
    
    $scope.onDrop = function(eventObj, date) {
        var $this = this;
        // retrieve the dropped element's stored Event Object
        var originalEventObject = eventObj.data('eventObject');
        var $categoryClass = eventObj.attr('data-class');
        // we need to copy it, so that multiple events don't have a reference to the same object
        var copiedEventObject = $.extend({}, originalEventObject);
        // assign it the date that was reported
        copiedEventObject.start = date;
        if ($categoryClass)
            copiedEventObject['className'] = [$categoryClass];
        // render the event on the calendar
        uiCalendarConfig.calendars.bookingCalendar.fullCalendar('renderEvent', copiedEventObject, true);
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            eventObj.remove();
        }
    };

    
    $scope.onEventClick = function (calEvent, jsEvent, view) {
        var $this = this;
        $http.get('api/events/' + calEvent.id).then(function successCallback(success) {
            $scope.retrievedEvent = success.data
        }, function errorCallback(error) {
            console.log(error)
        });
    }
    
    $scope.$watch('retrievedEvent', function() {
        var header = $modal.find('.modal-header').empty();
        header.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
        header.append('<h4 class="modal-title"><strong>' + $scope.retrievedEvent.category + '</strong></h4>');
        var show = $("<div></div>");
        show.append("<label>Start: </label>" + $scope.retrievedEvent.start);
        show.append("<label>End: </label>" + $scope.retrievedEvent.end);
        if ($scope.retrievedEvent.client_id != null) {
            var customer;
            angular.forEach($scope.customers, function(item, index) {
                if (parseInt(item.id) == parseInt($scope.retrievedEvent.client_id)) {
                    customer = item;
                }
            });
            show.append("<label>Customer: </label>" + customer.first_name + " " + customer.last_name);
            show.append("<label>Price: </label>" + $scope.retrievedEvent.price);
            show.append("<label>Notes: </label>" + $scope.retrievedEvent.notes);
        }
        $modal.modal({
            backdrop: 'static'
        });
        $modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(show).end().find('.delete-event').unbind('click').click(function () {
            uiCalendarConfig.calendars.bookingCalendar.fullCalendar('removeEvents', function (ev) {
                return (ev._id == $scope.retrievedEvent.id);
            })
            $http.delete('api/events/' + $scope.retrievedEvent.id).then(function successCallback() {
                console.log(':)');
            });
            $modal.modal('hide');
        });
        $modal.find('form').on('submit', function () {
            calEvent.title = form.find("input[type=text]").val();
            uiCalendarConfig.calendars.bookingCalendar.fullCalendar('updateEvent', calEvent);
            $modal.modal('hide');
            return false;
        });
    });
    
    $scope.select = function (start, end, allDay) {
        $scope.event = {};
        var $this = this;
        $modal.modal({
            backdrop: 'static'
        });
        var header = $modal.find('.modal-header');
        header.append('<h4 class="modal-title"><strong>Add Event</strong></h4>');
        var form = $("<form ng-model=event></form>");
        form.append("<div class='row'></div>");
        $scope.category = null;
        var categoryHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group'><label class='control-label'>Category</label><select class='form-control' name='category' ng-model='event.category' value='appointment'><option value='appointment'>Appointment</option><option value='holiday'>Holiday</option><option value='unavailable'>Unavailable</option></div></div></select></div></div>"));
        categoryHtml = categoryHtml($scope);
        var customerHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group' ng-show=\"event.category == 'appointment'\"><label class='control-label'>Customer</label><select class='form-control select2' name='customer' ng-model='event.clientId'><option class='choose-customer' ng-repeat='customer in customers' value='{{customer.id}}'>{{customer.first_name}} {{customer.last_name}}</option></select></div></div>"));
        customerHtml = customerHtml($scope);
        var notesHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group' ng-show=\"event.category == 'appointment'\"><label class='control-label'>Notes</label><input class='form-control' type='text' name='notes' ng-model='event.notes'/></div></div>"));
        notesHtml = notesHtml($scope);
        var priceHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group' ng-show=\"event.category == 'appointment'\"><label class='control-label'>Price</label><input class='form-control' type='text' name='price' ng-model='event.price'/></div></div>"));
        priceHtml = priceHtml($scope);
        form.find(".row")
            .append(categoryHtml)
            .append(customerHtml)
            .append(notesHtml)
            .append(priceHtml);
        $modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
            form.submit();
        });
        $scope.$digest;
        $modal.find('form').on('submit', function () {
            var beginning = form.find("input[name='beginning']").val();
            var ending = form.find("input[name='ending']").val();
            var classColour = $scope.classColourChoose($scope.event.category);
            var title = $scope.event.category;
            if ($scope.event.category !== null && $scope.event.category.length != 0) {
                var event = {
                    title: title,
                    start: start,
                    end: end,
                    className: classColour,
                    price: $scope.event.price,
                    notes: $scope.event.notes,
                    clientId: $scope.event.clientId,
                    category: $scope.event.category,
                    allDay: false
                };
                $http.post('api/events', event).then(function successCallback(response) {
                    event.id = response.data.id;
                    if (event.title === "appointment") {
                        for (var i = 0; i < $scope.customers.length; i++) {
                            if ($scope.customers[i].id === parseInt(event.clientId)) {
                                event.title = $scope.customers[i].first_name + " " + $scope.customers[i].last_name;
                            }
                        }
                    }
                    uiCalendarConfig.calendars.bookingCalendar.fullCalendar('renderEvent', event, true);
                    $modal.modal('hide');
                });
            }
            else{
                alert('You have to give a title to your event');
            }
            return false;

        });
        uiCalendarConfig.calendars.bookingCalendar.fullCalendar('unselect');
    };
    
    $scope.classColourChoose = function(eventCategory) {
        var colour;
        switch(eventCategory) {
            case 'appointment':
                colour = 'bg-primary';
                break;
            case 'holiday':
                colour = 'bg-warning';
                break;
            case 'unavailable':
                colour = 'bg-danger';
                break;
            default:
                colour = 'bg-primary';
                break;
        }
        return colour;
    }
                
    
    $scope.enableDrag = function() {
        $(this.$event).each(function () {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };
            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });
    };
    
    /*  Initialize the calendar  */
    $scope.enableDrag();
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var form = '';
    var today = new Date($.now());
        
    
    $scope.calendarObj = {
        calendar:{
            slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
            minTime: '08:00:00',
            maxTime: '19:00:00',
            defaultView: 'agendaWeek',  
            handleWindowResize: true,   
            height: $(window).height() + 100,   
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            eventLimit: true, // allow "more" link when too many events
            selectable: true,
            drop: $scope.onDrop,
            select: $scope.select,
            eventClick: $scope.onEventClick,
            eventRender: $scope.eventRender,
            eventOverlap: false,                            
        }
    };
    
}]);
var staff = angular.module('studioStaff');
staff.controller('StudioStaffDashboardController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    $scope.uiConfig = {
        calendar:{
            editable: true
        }
    };
}]);
var staff = angular.module('studioStaff');
staff.controller('StudioStaffLoginController', ['$scope', '$stateParams', '$http', '$auth', '$state', function($scope, $stateParams, $http, $auth, $state) {
    
    
    
    $scope.loginSubmit = function() {
        $auth.login($scope.loginData).then(function(data) {
            $state.go('studio.studioStaff.dashboard', {});
        },
        function(error) {
            $state.go('403');
        })
    };
    
}]);
var staff = angular.module('studioStaff');
staff.controller('StudioStaffManageCustomersController', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    
}]);
var staff = angular.module('studioStaff');
staff.controller('StudioStaffViewController', ['$scope', '$state', function($scope, $state) {
    
    $scope.dashboard = function() {
        $state.go('studio.studioStaff.dashboard', {});
    };
    
    $scope.bookings = function() {
        $state.go('studio.studioStaff.bookings', {});
    };
    
    $scope.customers = function() {
        $state.go('studio.studioStaff.manageCustomers', {});
    };
    
    $scope.editInfo = function() {
        $state.go('studio.studioStaff.adminEditStudio.info', {});
    };
    
    $scope.editContact = function() {
        $state.go('studio.studioStaff.adminEditStudio.contact', {});
    };
    
    $scope.editPayment = function() {
        $state.go('studio.studioStaff.adminEditStudio.payment', {});
    };
    
    $scope.manageStaff = function() {
        $state.go('studio.studioStaff.adminManageStaff', {});
    };
    
    $scope.customizeTheme = function() {
        $state.go('studio.studioStaff.adminCustomizeTheme', {});
    };
    
    $scope.customizeEmail = function() {
        $state.go('studio.studioStaff.adminCustomizeEmail', {});
    };
    
    $scope.manageProfile = function() {
        $state.go('studio.studioStaff.manageProfile', {});
    };
    
}]);
var customer = angular.module('studioCustomer');
customer.controller('StudioCustomerBookingsController', ['$scope', '$stateParams', '$state', 'Appointment', 'uiCalendarConfig', 'Customer', '$compile', '$http', '$auth', '$timeout', function($scope, $stateParams, $state, Appointment, uiCalendarConfig, Customer, $compile, $http, $auth, $timeout) {
    
    // Select2
    $(".select2").select2();
    
    
    $scope.eventSources = [
    ];
    
    
    var $body = $("body");
    var $modal = $('#event-modal');
    var $event = ('#external-events div.external-event');
    var $calendar = $('#calendar');
    var $saveCategoryBtn = $('.save-category');
    var $categoryForm = $('#add-category form');
    var $extEvents = $('#external-events');
    
    $scope.onDrop = function(eventObj, date) {
        var $this = this;
        // retrieve the dropped element's stored Event Object
        var originalEventObject = eventObj.data('eventObject');
        var $categoryClass = eventObj.attr('data-class');
        // we need to copy it, so that multiple events don't have a reference to the same object
        var copiedEventObject = $.extend({}, originalEventObject);
        // assign it the date that was reported
        copiedEventObject.start = date;
        if ($categoryClass)
            copiedEventObject['className'] = [$categoryClass];
        // render the event on the calendar
        uiCalendarConfig.calendars.bookingCalendar.fullCalendar('renderEvent', copiedEventObject, true);
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            eventObj.remove();
        }
    };

    
    $scope.onEventClick = function (calEvent, jsEvent, view) {
        var $this = this;
        $http.get('api/events/' + calEvent.id).then(function successCallback(success) {
            $scope.retrievedEvent = success.data
        }, function errorCallback(error) {
            console.log(error)
        });
    }
    
    $scope.select = function (start, end, allDay) {
        $scope.request = {};
        var $this = this;
        $modal.modal({
            backdrop: 'static'
        });
        var header = $modal.find('.modal-header');
        header.append('<h4 class="modal-title"><strong>Request Appointment</strong></h4>');
        var form = $("<form ng-model=request></form>");
        form.append("<div class='row'></div>");
        $scope.category = null;
        var startHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group'><label class='control-label'>Start</label>" + start + "</div></div>"))
        var endHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group'><label class='control-label'>End</label>" + end + "</div></div>"))
        var notesHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group'><label class='control-label'>Notes</label><input class='form-control' type='text' name='notes' ng-model='event.notes'/></div></div>"));
        notesHtml = notesHtml($scope);
        form.find(".row")
            .append(startHtml)
            .append(endHtml)
            .append(notesHtml)
        $modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
            form.submit();
        });
        $scope.$digest;
        $modal.find('form').on('submit', function () {
            var beginning = form.find("input[name='beginning']").val();
            var ending = form.find("input[name='ending']").val();
            var classColour = 'bg-primary';
            var title = 'Requested Appointment';
            if ($scope.event.category !== null && $scope.event.category.length != 0) {
                var event = {
                    title: title,
                    start: start,
                    end: end,
                    className: classColour,
                    notes: $scope.request.notes,
                    requesedEmployeeId: $scope.request.employeeId,
                    allDay: false
                };
                $http.post('api/requests/appointments', event).then(function successCallback(response) {
                    uiCalendarConfig.calendars.bookingCalendar.fullCalendar('renderEvent', event, true);
                    $modal.modal('hide');
                });
            }
            else{
                alert('You have to give a title to your event');
            }
            return false;

        });
        uiCalendarConfig.calendars.bookingCalendar.fullCalendar('unselect');
    };
    
    $scope.classColourChoose = function(eventCategory) {
        var colour;
        switch(eventCategory) {
            case 'appointment':
                colour = 'bg-primary';
                break;
            case 'holiday':
                colour = 'bg-warning';
                break;
            case 'unavailable':
                colour = 'bg-danger';
                break;
            default:
                colour = 'bg-primary';
                break;
        }
        return colour;
    }
                
    
    $scope.enableDrag = function() {
        $(this.$event).each(function () {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };
            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });
    };
    
    /*  Initialize the calendar  */
    $scope.enableDrag();
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var form = '';
    var today = new Date($.now());
        
    
    $scope.calendarObj = {
        calendar:{
            slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
            minTime: '08:00:00',
            maxTime: '19:00:00',
            defaultView: 'agendaWeek',  
            handleWindowResize: true,   
            height: $(window).height() + 100,   
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            eventLimit: true, // allow "more" link when too many events
            selectable: true,
            drop: $scope.onDrop,
            select: $scope.select,
            eventClick: $scope.onEventClick,
            eventRender: $scope.eventRender,
            eventOverlap: false,                            
        }
    };
    
}]);
var customer = angular.module('studioCustomer');
customer.controller('StudioCustomerLoginController', ['$scope', '$stateParams', '$http', '$auth', '$state', function($scope, $stateParams, $http, $auth, $state) {
    
    $scope.loginSubmit = function() {
        $scope.loginData.studioId = $stateParams.id;
        $auth.login($scope.loginData).then(function(data) {
            $state.go('studio.customer.bookings', {});
        },
        function(error) {
            $state.go('403');
        })
    };
    
}]);
var customer = angular.module('studioCustomer');
customer.controller('StudioCustomerViewController', ['$scope', '$state', function($scope, $state) {
    
    $scope.bookings = function() {
        $state.go('studio.customer.bookings', {});
    };
    
    $scope.editPayment = function() {
        $state.go('studio.customer.payment', {});
    };
    
}]);