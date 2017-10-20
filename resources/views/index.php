<!doctype html> 
<html lang="en">
    <head> <meta charset="UTF-8"> 
        <title>Submit a Studio</title>

        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css"> <!-- load bootstrap via cdn -->
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"> <!-- load fontawesome -->
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.8/angular.min.js"></script> <!-- load angular -->

        <script src="js/app.js"></script> <!-- load our application -->
        <script src="js/controllers/studioController.js"></script> <!-- load our controller -->
        <script src="js/services/studioService.js"></script> <!-- load our service -->

    </head>
    
    <body class="container" ng-app="brisbaneLashes" ng-controller="studioController">
        <div class="col-md-8 col-md-offset-2">
            <div class="page-header">
                <h2>Submit a Studio</h2>
            </div>

            <form ng-submit="submit()">
                <div class="form-group">
                    <input type="text" class="form-control input-lg" name="name" ng-model="studioData.name" placeholder="Name">
                </div>

                <div class="form-group">
                    <input type="text" class="form-control input-lg" name="abn" ng-model="studioData.abn" placeholder="ABN">
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control input-lg" name="addr_1" ng-model="studioData.addr_1" placeholder="Address Line One">
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control input-lg" name="addr_2" ng-model="studioData.addr_2" placeholder="Address Line Two">
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control input-lg" name="suburb" ng-model="studioData.suburb" placeholder="Suburb">
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control input-lg" name="state" ng-model="studioData.state" placeholder="State">
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control input-lg" name="pcode" ng-model="studioData.pcode" placeholder="Postcode">
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control input-lg" name="phone" ng-model="studioData.phone" placeholder="Phone">
                </div>
                
                <div class="form-group">
                    <input type="text" class="form-control input-lg" name="email" ng-model="studioData.email" placeholder="Email">
                </div>

                <div class="form-group text-right">   
                    <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                </div>
            </form>
        </div>
    </body>
</html>