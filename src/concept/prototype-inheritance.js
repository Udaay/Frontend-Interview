let dragon = {
  name: "Tannya",
  fire: true,
  fight() { return 5 },
  sing() {
    if(this.fire){
      return `I am ${this.name} , the fire`
    }
  }
}

let lizard = {
  name: "KiKI",
  fight() { return 1 },
}


// const lizardSing = dragon.sing.bind(lizard);
//in case we have a big object and want to borrow more methods and property to lizard , so that when we can use Prototype inHeritance.

lizard.__proto__ = dragon;
lizard.sing()