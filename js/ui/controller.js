var scavengerApp = angular.module('scavengerApp', []);

scavengerApp.controller('MessageController', function($scope) {
  $scope.messages = [];
  $scope.send = function(msg) {
    if ($scope.messages.length > 7) {
      $scope.messages.splice(($scope.messages.length - 1), 1);
    }

    $scope.messages.unshift({"text" : msg});
  }

  $scope.$on('message', function(event, msg) {
    $scope.send(msg);
  });
});

scavengerApp.controller('UpgradeController', function($scope) {
  $scope.items = [
    ServiceDroid,
    SurvalianceDrone,
    GarbadgeCollector,
    R2D2
  ]

  $scope.parseTimer = function(timer) {
    return (timer/100) + " sec.";
  }

  $scope.aquired = [];

  $scope.buyUpgrade = function(droid) {
    for(var i in droid.requirements) {
      if (droid.requirements[i].item.amount < droid.requirements[i].quantity) {
        alert("No resources")
        return;
      }
    }

    for(var i in droid.requirements) {
      droid.requirements[i].item.amount -= droid.requirements[i].quantity;
    }

    completeBuy(droid);
  }

  function completeBuy(droid) {
    for (var robot in $scope.aquired) {
      if ($scope.aquired[robot].name === droid.name) {
        $scope.aquired[robot].quantity += 1;
        game.robotTimer(droid);
        return;
      }
    }

    droid.quantity = 1;
    $scope.aquired.push(droid);
    game.robotTimer(droid);
  }
});

scavengerApp.controller('StatusController', function($scope) {
  $scope.items = [
    MetalScrap,
    OldEquipment,
    ReusableMaterial,
    PowerCell
  ]

  $scope.increment = function(name) {
    for(var item in $scope.items) {
      if ($scope.items[item].name === name) {
        $scope.items[item].amount += 1;
        return;
      }
    }
  }
});

var Status = {
  increment : function(item) {
    var scope = angular.element(document.getElementById("statusWrap")).scope();
    scope.$apply(function() {
      scope.increment(item);
    });
  }
};

var Message = {
  send : function(msg) {
    var scope = angular.element(document.getElementById("messageWrap")).scope();
    scope.$apply(function() {
      scope.send(msg);
    });
  }
}
