// Ionic Starter App
 
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova'])
 
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  }); 
});
 
app.controller('FileTransferController', function($scope, $cordovaFileTransfer,$ionicLoading) {
         
  $scope.testFileDownload = function () {
 
      // File for download
      var url = "http://www.space-loop.com/wp-content/uploads/2016/06/vtest.mp4?_=1";
       
      // File name only
      var filename = url.split("/").pop();
       
      // Save location
      var targetPath = cordova.file.externalRootDirectory + filename;
 
      $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
          console.log('Success');
      }, function (error) {
          console.log('Error');
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });
  }
  $scope.download = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
          fs.root.getDirectory(
              "ExampleProject",
              {
                  create: true
              },
              function(dirEntry) {
                  dirEntry.getFile(
                      "test.mp4", 
                      {
                          create: true, 
                          exclusive: false
                      }, 
                      function gotFileEntry(fe) {
                          var p = fe.toURL();
                          fe.remove();
                          ft = new FileTransfer();
                          ft.download(
                              encodeURI("http://www.space-loop.com/wp-content/uploads/2016/06/vtest.mp4?_=1"),
                              p,
                              function(entry) {
                                  $ionicLoading.hide();
                                  $scope.arquivo = entry.toURL();
                              },
                              function(error) {
                                  $ionicLoading.hide();
                                  alert("Download Error Source -> " + error.source);
                              },
                              false,
                              null
                          );
                      }, 
                      function() {
                          $ionicLoading.hide();
                          console.log("Get file failed");
                      }
                  );
              }
          );
      },
      function() {
          $ionicLoading.hide();
          console.log("Request for filesystem failed");
      });
  }
  $scope.load = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        fs.root.getDirectory(
            "ExampleProject",
            {
                create: false
            },
            function(dirEntry) {
                dirEntry.getFile(
                    "test.mp4", 
                    {
                        create: false, 
                        exclusive: false
                    }, 
                    function gotFileEntry(fe) {
                        $ionicLoading.hide();
                        $scope.arquivo = fe.toURL();
                    }, 
                    function(error) {
                        $ionicLoading.hide();
                        console.log("Error getting file");
                    }
                );
            }
        );
    },
    function() {
        $ionicLoading.hide();
        console.log("Error requesting filesystem");
    });
  }
  $scope.testFileUpload = function () {
     // Destination URL 
     var url = "http://example.gajotres.net/upload/upload.php";
      
     //File for Upload
     var targetPath = cordova.file.externalRootDirectory + "logo_radni.png";
      
     // File name only
     var filename = targetPath.split("/").pop();
      
     var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
          params : {'directory':'upload', 'fileName':filename}
      };
           
      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
          console.log("SUCCESS: " + JSON.stringify(result.response));
      }, function (err) {
          console.log("ERROR: " + JSON.stringify(err));
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });
  }
});