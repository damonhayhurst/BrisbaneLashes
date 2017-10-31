<!doctype html> 
<html lang="en">
    <head> <meta charset="UTF-8"> 
        <title>Brisbane Lashes</title>

        <!-- <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css"> --> <!-- load bootstrap via cdn --> <link href="bower_resources/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"></script>
        <!-- <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"> --> <!-- load fontawesome--><link src="bower_resources/font-awesome/css/font-awesome.min.css" rel="stylesheet"></script>
        
    </head>
    
    <body ng-app="brisbaneLashes">
        <div class="container">
            <div ui-view></div>
        </div>    
    </body>

    <script src="bower_resources/angular/angular.min.js"></script>
    <script src="bower_resources/angular-resource/angular-resource.min.js"></script>
    <script src="bower_resources/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="bower_resources/satellizer/dist/satellizer.min.js"></script>

    <script src="app/app.js"></script> <!-- load our application -->
    <script src="app/services.js"></script> <!-- load our service -->
    <script src="app/controllers.js"></script> <!-- load our controller -->
</html>