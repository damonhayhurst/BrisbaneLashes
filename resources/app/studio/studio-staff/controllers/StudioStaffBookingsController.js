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