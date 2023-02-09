/*
 * Creates star rating functionality
 * @param el DOM Element to which Star will appended
 * @param count Number of stars required for rating
 * @param callback Returns selected star count to callback
 */

function Star(el, count, callback) {
  let activeRating = 0;
  const element = document.querySelector(el);
  const fragment = document.createDocumentFragment();
  for(let i = 1; i <= count; i++){
    const star = document.createElement('i');
    star.dataset.ratingVal = i;
    star.classList.add('fa', 'fa-star-o');
    fragment.appendChild(star);
  }
  element.appendChild(fragment);

  element.addEventListener("mouseover", onMouseOver);
  element.addEventListener("click", onClick);
  element.addEventListener("mouseleave", onMouseLeave);

  function onMouseOver(e){
    const { ratingVal } = e.target.dataset;
    if(!ratingVal) return;
    fill(ratingVal);
  }

  function fill(ratingVal) {
    for(let i = 0; i < count; i++){
      const classList = element.children[i].classList;
      if(i < ratingVal){
        classList.add('fa-star');
      }else {
        classList.remove('fa-star');     
      }
    }
  }

  function onClick(e){
    const { ratingVal } = e.target.dataset;
    activeRating = ratingVal;
    callback(ratingVal);
  }

  function onMouseLeave(){
    fill(activeRating);
  }

}

function getStar(val) {
  document.getElementById('count').innerText = `Rating: ${val}`
}

Star('#root', 5 , getStar)