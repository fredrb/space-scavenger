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
    SmartCollector,
    CourierDrone,
    AutomatedBulldozer,
    SmartGarbageCollector
  ]

  $scope.parseTimer = function(timer) {
    return Math.round((timer/1000)*100)/100 + " sec.";
  }

  $scope.aquired = [];

  $scope.buildDroid = function(droid) {
    var timer = game.buildDroid(droid);
    if (timer != null)
      $scope.enableDroid(timer);
  }

  $scope.hasResourcesToBuild = function(droid) {
    return game.hasResourcesToBuild(droid);
  }

  $scope.enableDroid = function(timer) {
    for (var robot in $scope.aquired) {
      if ($scope.aquired[robot].droid.name === timer.droid.name) {
        $scope.aquired[robot].droid.quantity += 1;
        return;
      }
    }

    timer.droid.quantity = 1;
    $scope.aquired.push(timer);
  }
});

scavengerApp.controller('StatusController', function($scope) {
  $scope.items = [
    MetalScrap,
    OldEquipment,
    ReusableMaterial,
    Battery,
    PreciousItem,
    ToolBox,
    ValuableData,
    PowerCell
  ]

  $scope.increment = function(item, val) {
    $scope.items.forEach(function(v) {
      if (v === item)
        v.amount += val || 1;
        return;
    });
  }

  $scope.decrement = function(item, val) {
    $scope.items.forEach(function(v) {
      if (v === item)
        v.amount -= val || 1;
        return;
    });
  }
});

scavengerApp.controller('TradeController', function($scope) {
  $scope.items = TradePropositions;

  $scope.acceptTrade = function(trade) {
    game.acceptTrade(trade);
  }

  $scope.hasResourcesToTrade = function(trade) {
    return game.hasResourcesToTrade(trade);
  }
});

var Status = {
  increment : function(item, val) {
    var scope = angular.element(document.getElementById("statusWrap")).scope();
    scope.$apply(function() {
      scope.increment(item, val);
    });
  },

  decrement : function(item, val) {
    var scope = angular.element(document.getElementById("statusWrap")).scope();
    scope.$apply(function() {
      scope.decrement(item, val);
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
