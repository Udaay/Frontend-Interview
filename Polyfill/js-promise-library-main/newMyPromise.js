const STATE = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending",
}

class MyPromise {
  #thenCbs = [];
  #catchCbs = [];
  #state = STATE.PENDING;
  #value
  #onSuccessBind = this.#onSuccess.bind(this);
  #onFailBind = this.#onFail.bind(this);

  constructor(cb){
    try{
      cb(this.#onSuccessBind, this.#onFailBind);
    } catch(e) {
      this.#onFail(e);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach(callback => {
        callback(this.#value)
      })

      this.#thenCbs = []
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach(callback => {
        callback(this.#value)
      })

      this.#catchCbs = []
    }
  }

  #onSuccess(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind)
        return
      }

      this.#value = value
      this.#state = STATE.FULFILLED
      this.#runCallbacks()
    })
  }
  
  #onFail(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind)
        return
      }

      if (this.#catchCbs.length === 0) {
        throw new UncaughtPromiseError(value)
      }

      this.#value = value
      this.#state = STATE.REJECTED
      this.#runCallbacks()
    })
  }

  then(thenCallback, catchCallback){
    return new MyPromise((resolve, reject) => {

      this.#thenCbs.push((result)=>{ // Check runCallbacks method , this is from we get 'result' which comes from resolve('hiii'), then hiii will be result.
        if(thenCallback == null){
          resolve(result);
          return;
        } 

        try{
          resolve(thenCallback(result));
        } catch(error) {
          reject(error)
        }
      });

      this.#catchCbs.push((result)=>{
        if (catchCallback == null){
          reject(result);
          return;
        } 

        try{
          resolve(catchCallback(result));
        } catch(error) {
          reject(error)
        }
      });

      this.#runCallbacks();
    });
  }

  catch(callback){
    return this.then(undefined, callback);
  }

  finally(callback){
    return this.then((result)=>{
      callback();
      return result;
    }, (result)=>{
      callback();
      return result;
    });
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value))
  }
  
  static reject(value){
    return new MyPromise((resolve, reject) => reject(value))
  }

  static all(promises) {
    const results = []
    let completedPromises = 0
    const {length} = promises;
    return new MyPromise((resolve, reject) => {
      if(length === 0) resolve([]);

      for (let i = 0; i < length; i++) {
        const promise = promises[i]
        if(promise instanceof MyPromise) {
          promise
            .then(value => {
              completedPromises++
              results[i] = value
              if (completedPromises === length) {
                resolve(results)
              }
            })
            .catch(reject)
        } else {
          completedPromises++
          results[i] = promise;
        }
      }
    })
  }

  static allSettled(promises) {
    const results = []
    let completedPromises = 0
    const { length } = promises;
    return new MyPromise((resolve) => {
      if (length === 0) resolve([]);

      for (let i = 0; i < length; i++) {
        const promise = promises[i]
        if (promise instanceof MyPromise) {
          promise
            .then(value => results[i] = {status: STATE.FULFILLED, value} )
            .catch(reason => results[i] = { status: STATE.REJECTED, reason } )
            .finally(() => {
              completedPromises++;
              if(completedPromises===length) resolve(results); 
            })
        } else {
          results[i] = { status: STATE.FULFILLED, value: promise }
          completedPromises++
        }
      }
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) =>{
      promises.forEach(promise => {
        promise.then(resolve).catch(reject)
      });
    });
  }

  static any(promises) {
    let rejectPromise = 0;
    const errors = [];

    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise
          .then(resolve)
          .catch(error => {
            rejectPromise++;
            if (rejectPromise === promises.length) {
              errors[i] = error;
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          })
      }
    })
  }


}

class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error)

    this.stack = `(in promise) ${error.stack}`
  }
}



module.exports = MyPromise