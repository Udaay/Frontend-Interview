// don't change the state instead return the new state

const obh = { name: "UDAY" };

function clone(obj) {
  return { ...obj };
}

function updateName(obj) {
  const newobj = clone(obj);
  newobj.name = "Ram";
  return newobj;
}

//Structural Sharing in which only changed things
