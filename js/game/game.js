var Game = function() {
  this.grid = new Grid(9, 10, 50, 50);
  this.grid.initAutoDraw(550, [MetalScrapBlock]);
  this.grid.initAutoDraw(1500, [MetalScrapBlock, OldEquipmentBlock]);
  this.grid.initAutoDraw(4500, [ReusableMaterialBlock, OldEquipmentBlock]);
  this.grid.initAutoDraw(8000, [PowerCellBlock]);

  this.robotTimers = [];
}

var RobotTimer = function(droid) {
  this.droid = droid;
  this.currentDelay = droid.timer;
  this.quantity = 1;
}

RobotTimer.prototype.addRobot = function() {
  this.quantity += 1;
  this.currentDelay = this.droid.timer / this.quantity;
}


Game.prototype.acceptTrade = function(trade) {
  if (this.hasResourcesToTrade(trade)) {
    Status.decrement(trade.required.item, trade.required.quantity);
    Status.increment(trade.reward, 1);
  }
}

Game.prototype.hasResourcesToTrade = function(trade) {
  return (trade.required.item.amount >= trade.required.quantity);
}


Game.prototype.droidTimer = function(timer) {
    var self = this;
    setTimeout(function() {
      if (self.grid.filledCells.length > 0) {
        self.grid.eraseRandomCell();
        Message.send(timer.droid.name + " collected a material");
      }
      self.droidTimer(timer);
    }, timer.currentDelay);

};

Game.prototype.hasResourcesToBuild = function(droid) {
  for(var i in droid.requirements) {
    if (droid.requirements[i].item.amount < droid.requirements[i].quantity) {
      return false;
    }
  }

  return true;
}

Game.prototype.buildDroid = function(droid) {
  if (!this.hasResourcesToBuild(droid)) return null;
  for(var i in droid.requirements) {
    droid.requirements[i].item.amount -= droid.requirements[i].quantity;
  }

  for(var timer in this.robotTimers) {
    if (this.robotTimers[timer].droid.name === droid.name) {
      this.robotTimers[timer].addRobot();
      return this.robotTimers[timer];
    }
  }

  var timer = new RobotTimer(droid);
  this.robotTimers.push(timer);
  this.droidTimer(timer);

  return timer;
}
