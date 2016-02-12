var MetalScrapBlock = function() {
  this.color = "rgb(149, 149, 149)";
  this.destroy = function() {
    Status.increment(MetalScrap);
    switch(Math.floor(Math.random()*20)) {
      case 0:
        Message.send("Found Tool Box in Metal Scrap!");
        Status.increment(ToolBox);
        break;
    }
    switch(Math.floor(Math.random()*30)) {
      case 0:
        Message.send("Found Power Cell in Metal Scrap!");
        Status.increment(PowerCell);
        break;
    }
  }
}

var OldEquipmentBlock = function() {
  this.color = "#b07272";
  this.destroy = function() {
    Status.increment(OldEquipment);
    switch(Math.floor(Math.random()*20)) {
      case 0:
        Message.send("Found Valuable Data in Old Equipment!");
        Status.increment(ValuableData);
        break;
    }
  }
}

var ReusableMaterialBlock = function() {
  this.color = "#5d8c58";
  this.destroy = function() {
    Status.increment(ReusableMaterial);
  }
}

var PowerCellBlock = function() {
  this.color = "#e0ff46";
  this.destroy = function() {
    Status.increment(PowerCell);
  }
}
