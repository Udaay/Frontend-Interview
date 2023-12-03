// no side effects : Function should not modify anything outside of function local scope /it should not modify outside
// same input gives same output [Refrential Transparency]

const user = {
  name: "Kevin",
  active: true,
  cart: [],
  purchases: [],
};

// Implement a cart feature
// 1. Add items to Cart
// 2. Add 18% GST to item in cart
// 3. Buy item: cart -> purchases
// 4. Empty Cart

const item = {
  id: 12,
  name: "mobile",
  price: 10000,
};

//My solution

const mypurchasedItem = (user, item) => {
  const newUser = {};
  newUser = {
    ...user,
    cart: [{ ...item, price: item.price * 1.18 }],
  };
  newUser.purchases = newUser.cart;
  newUser.cart = [];
  return newUser;
};

// Solution with compose

const compose =
  (...fns) =>
  (...args) =>
    fns.reduce((acc, curr) => acc(curr(...args)));

const emptyCart = (user) => {
  const newuser = { ...user };
  const a = [];
  a.con;
  Object.assign;
  user.cart = [];
  return newuser;
};

const addItemsTocart = (user) => {
  const newuser = { ...user };
  return newuser;
};

const applyGST = (user) => {
  const newuser = { ...user };
  return newuser;
};

const buyItem = (user) => {
  const newuser = { ...user };
  return newuser;
};

const purchaseItem = compose(emptyCart, buyItem, applyGST, addItemsTocart);
purchaseItem(item);

/* 

can Everthing can be Pure ?

we can't have interaction with only pure function ,
we need to have side effects to perform dom manupulation, make http calls and other side effect 
but we have to oraginze code in such a way to minimize the impure function and make predictible

1.one Task: Should do only one tAsk
2.return statemenet: always return something
3. Pure
4. No shared State with other function
5. Immutable State: always return new copy no laternation in input
6. Composable: 
7. Predictable: what our functions do


*/
