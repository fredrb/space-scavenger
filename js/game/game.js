var Game = function() {
  this.grid = new Grid(6, 6, 50, 50);
  this.grid.initAutoDraw(1000, [MetalScrapBlock]);
  this.grid.initAutoDraw(3000, [MetalScrapBlock, OldEquipmentBlock]);
  this.grid.initAutoDraw(5000, [ReusableMaterialBlock, OldEquipmentBlock]);
  this.grid.initAutoDraw(25000, [PowerCellBlock]);
}

Game.prototype.robotTimer = function(droid) {
  var self = this;
  setTimeout(function() {
    if (self.grid.filledCells.length > 0) {
      self.grid.eraseRandomCell();
      Message.send(droid.name + " collected a material");
    }
    self.robotTimer(droid);
  }, droid.timer);
}
