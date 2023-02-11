export function add(a,b){
  this.a = a;
  this.b = b;

  console.log(this.a, this.b, "Initial value");

  add.prototype.assignA = function(a){
    this.a = a;
    console.log("Assign a", this.a)
  }

  add.prototype.assignB = function(b){
    this.b = b;
    console.log("Assign b", this.b)
  }

  this.logValue = () => {
    console.log(this)
  }

}

