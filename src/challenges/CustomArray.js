class CustomaArray extends Array {
  constructor(...args) {
    super(...args);
    this.listeners = {};
  }

  subscribe(eventName, callback) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(callback);
  }

  publish(eventName, data) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((cb) => {
        cb(data);
      });
    }
  }

  push(...items) {
    items.forEach((item) => {
      super.push(item);
      this.publish("itemAdded", item);
    });
    return this.length;
  }
}

// Simple Approach

const array = [4, 5, 6];
array.push(1); // This will trigger the 'itemAdded' event
array.push(2, 3); // Both of these will also trigger the event

// For simplicity do not alter the push method, instead create a new pushWithEvent method.

Array.prototype.listeners = [];
Array.prototype.subscribe = function (eventName, cb) {
  if (!this.listeners[eventName]) this.listeners[eventName] = [];
  this.listeners[eventName].push(cb);
};

Array.prototype.myPushWithEvent = function (...items) {
  this.push(...items);
  items.forEach((data) => {
    this.listeners["itemAdded"].forEach((cb) => cb());
  });
};
