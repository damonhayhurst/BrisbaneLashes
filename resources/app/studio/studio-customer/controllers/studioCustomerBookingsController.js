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