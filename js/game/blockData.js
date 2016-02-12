var MetalScrapBlock = function() {
  this.color = "rgb(149, 149, 149)";
  this.destroy = function() {
    Status.increment("Metal scrap");
  }
}

var OldEquipmentBlock = function() {
  this.color = "#b07272";
  this.destroy = function() {
    Status.increment("Old equipment");
  }
}

var ReusableMaterialBlock = function() {
  this.color = "#5d8c58";
  this.destroy = function() {
    Status.increment("Reusable material");
  }
}

var PowerCellBlock = function() {
  this.color = "#e0ff46";
  this.destroy = function() {
    Status.increment("Power Cell");
  }
}
