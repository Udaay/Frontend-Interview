const images = [
  {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  },
  {
    "albumId": 1,
    "id": 2,
    "title": "reprehenderit est deserunt velit ipsam",
    "url": "https://via.placeholder.com/600/771796",
    "thumbnailUrl": "https://via.placeholder.com/150/771796"
  },
  {
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "https://via.placeholder.com/600/24f355",
    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
  },
  {
    "albumId": 1,
    "id": 4,
    "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    "url": "https://via.placeholder.com/600/d32776",
    "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  },
  {
    "albumId": 1,
    "id": 5,
    "title": "natus nisi omnis corporis facere molestiae rerum in",
    "url": "https://via.placeholder.com/600/f66b97",
    "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
  },
  {
    "albumId": 1,
    "id": 6,
    "title": "accusamus ea aliquid et amet sequi nemo",
    "url": "https://via.placeholder.com/600/56a8c2",
    "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
  },
]

let activeImageIndex = 0;
const totalImage = images.length;
const rootEle = document.getElementById('root');
const container = document.createElement('div');
container.className = 'container';

const sliderImage = document.createElement('img')
const prevButton = document.createElement('img');
const nextButton = document.createElement('img');

const span = document.createElement('span');
span.innerText = activeImageIndex;

prevButton.className = "btn-img"
nextButton.className = "btn-img"
prevButton.src = "./left-arrow.png";
nextButton.src = "./right-arrow.png";

const setSliderImage = ()=> {
  sliderImage.src = images[activeImageIndex].url;
  span.innerText = activeImageIndex;
}

container.append(prevButton);
container.append(sliderImage);
container.append(nextButton);

rootEle.append(container);
rootEle.append(span);

setSliderImage();

nextButton.addEventListener('click', () => handleButton(1))
prevButton.addEventListener('click', () => handleButton(-1))

const handleButton = (option)=> {
  let newIndex = activeImageIndex + option;
  if(newIndex >= totalImage || newIndex < 0) return;
  activeImageIndex = newIndex;
  setSliderImage();
}

setInterval(()=>{
  let ind = 1;
  if(activeImageIndex === totalImage - 1){
    ind = -(totalImage - 1);
  }
  activeImageIndex += ind;
  setSliderImage();
}, 1500)





