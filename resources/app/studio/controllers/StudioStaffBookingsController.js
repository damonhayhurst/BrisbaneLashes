var studio = angular.module('studio');
studio.controller('StudioStaffBookingsController', ['$scope', '$stateParams', '$state', 'Appointment', 'uiCalendarConfig', 'Customer', '$compile', '$http', function($scope, $stateParams, $state, Appointment, uiCalendarConfig, Customer, $compile, $http) {
    
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
    
    $scope.eventSources = [];
    
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
        var form = $("<form></form>");
        form.append("<label>Change event name</label>");
        form.append("<div class='input-group'><input class='form-control' type=text value='" + calEvent.title + "' /><span class='input-group-btn'><button type='submit' class='btn btn-success waves-effect waves-light'><i class='fa fa-check'></i> Save</button></span></div>");
        $modal.modal({
            backdrop: 'static'
        });
        $modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
        uiCalendarConfig.calendars.bookingCalendar.fullCalendar('removeEvents', function (ev) {
            return (ev._id == calEvent._id);
        });
        $modal.modal('hide');
        });
        $modal.find('form').on('submit', function () {
            calEvent.title = form.find("input[type=text]").val();
            uiCalendarConfig.calendars.bookingCalendar.fullCalendar('updateEvent', calEvent);
            $modal.modal('hide');
            return false;
        });
    }
    
    
    $scope.select = function (start, end, allDay) {
        $scope.event = {};
        var $this = this;
        $modal.modal({
                backdrop: 'static'
            });
            var form = $("<form ng-model=event></form>");
            form.append("<div class='row'></div>");
            $scope.category = null;
            var categoryHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group'><label class='control-label'>Category</label><select class='form-control' name='category' ng-model='event.category' value='appointment'><option value='appointment'>Appointment</option><option value='holiday'>Holiday</option><option value='unavailable'>Unavailable</option></div></div></select></div></div>"));
            categoryHtml = categoryHtml($scope);
            var customerHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group' ng-show=\"event.category == 'appointment'\"><label class='control-label'>Customer</label><select class='form-control select2' name='customer' ng-model='event.clientId'><option class='choose-customer' ng-repeat='customer in customers' value='{{customer.id}}'>{{customer.first_name}} {{customer.last_name}}</option></select></div></div>"));
            customerHtml = customerHtml($scope);
            var notesHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group'><label class='control-label'>Notes</label><input class='form-control' type='text' name='notes' ng-model='event.notes'/></div></div>"));
            notesHtml = notesHtml($scope);
            var priceHtml = $compile(angular.element("<div class='col-md-6'><div class='form-group'><label class='control-label'>Price</label><input class='form-control' type='text' name='price' ng-model='event.price'/></div></div>"));
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
                if (title === "appointment") {
                    for (var i = 0; i < $scope.customers.length; i++) {
                        if ($scope.customers[i].id === parseInt($scope.event.clientId)) {
                            title = $scope.customers[i].first_name + " " + $scope.customers[i].last_name;
                        }
                    }
                }
                if ($scope.event.category !== null && $scope.event.category.length != 0) {
                    var event = {
                        title: title,
                        start: start,
                        end: end,
                        allDay: false,
                        className: classColour,
                        price: $scope.event.price,
                        notes: $scope.event.notes,
                        clientId: $scope.event.clientId
                    };
                    $http.post('api/events', event).then(function successCallback(response) {
                        event.id = response.data.id;
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
            eventClick: $scope.onEventClick
        }
    };
    
}]);