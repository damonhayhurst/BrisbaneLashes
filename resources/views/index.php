<!doctype html> 
<html lang="en">
    <head> <meta charset="UTF-8"> 
        <title>Brisbane Lashes</title>

        <!-- <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"> --> <!-- load fontawesome--><link src="bower_resources/font-awesome/css/font-awesome.min.css" rel="stylesheet"></link>
        <base href="/" />
    <script src="dark/assets/js/modernizr.min.js"></script>
    <link href="dark/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="dark/assets/css/core.css" rel="stylesheet" type="text/css" />
    <link href="dark/assets/css/components.css" rel="stylesheet" type="text/css" />
    <link href="dark/assets/css/icons.css" rel="stylesheet" type="text/css" />
    <link href="dark/assets/css/pages.css" rel="stylesheet" type="text/css" />
    <link href="dark/assets/css/responsive.css" rel="stylesheet" type="text/css" />
    <link href="dark/assets/plugins/fullcalendar/dist/fullcalendar.css" rel="stylesheet" />
    <link href="dark/assets/plugins/select2/select2.css" rel="stylesheet" type="text/css" />
    </head>
    
    <body ng-app="brisbaneLashes">
        <div ui-view></div>
    </body>

    <!-- jQuery  -->
    <script src="dark/assets/js/jquery.min.js"></script>
    <script src="dark/assets/js/bootstrap.min.js"></script>
    <script src="dark/assets/js/detect.js"></script>
    <script src="dark/assets/js/fastclick.js"></script>
    <script src="dark/assets/js/jquery.slimscroll.js"></script>
    <script src="dark/assets/js/jquery.blockUI.js"></script>
    <script src="dark/assets/js/waves.js"></script>
    <script src="dark/assets/js/wow.min.js"></script>
    <script src="dark/assets/js/jquery.nicescroll.js"></script>
    <script src="dark/assets/js/jquery.scrollTo.min.js"></script>

    <script src="dark/assets/js/jquery.core.js"></script>
    <script src="dark/assets/js/jquery.app.js"></script>

    <script src="dark/assets/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
    <script src="dark/assets/plugins/select2/select2.min.js" type="text/javascript"></script>

    <!--form validation init-->
    <script src="dark/assets/plugins/tinymce/tinymce.min.js"></script>
    
    <script src="bower_resources/angular/angular.min.js"></script>
    <script src="bower_resources/angular-resource/angular-resource.min.js"></script>
    <script src="bower_resources/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="bower_resources/satellizer/dist/satellizer.min.js"></script>

    <script>
    var resizefunc = [];
    </script>
    
    <!-- jquery, moment, and angular have to get included before fullcalendar -->
    <script type="text/javascript" src="bower_resources/moment/min/moment.min.js"></script>
    <script type="text/javascript" src="bower_resources/angular-ui-calendar/src/calendar.js"></script>
    <script type="text/javascript" src="bower_resources/fullcalendar/dist/fullcalendar.min.js"></script>
    <script type="text/javascript" src="bower_resources/fullcalendar/dist/gcal.js"></script>

    <script src="app/app.js"></script> <!-- load our application -->
    <script src="app/services.js"></script> <!-- load our service -->
    <script src="app/controllers.js"></script> <!-- load our controller -->
    <script src="app/directives.js"></script>

    <script src="https://js.stripe.com/v3/"></script>

<!--
    <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
    <script type="text/javascript">
        Stripe.setPublishableKey('pk_test_oi0sKPJYLGjdvOXOM8tE8cMa');
    </script>
-->

</html>