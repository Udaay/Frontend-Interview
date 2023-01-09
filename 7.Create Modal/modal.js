const modalButton = document.getElementById('modal-btn');
const rootEle = document.getElementById('root');
const modalBg = document.createElement('div');
const container = document.createElement('div');

const crossBtn = document.createElement('button');
crossBtn.innerText= "close";
container.appendChild(crossBtn);

modalBg.className = "modalBackdrop"
container.className = 'dialogContainer';

modalBg.append(container);
document.body.append(modalBg);


const handleClose = () => {
  rootEle.classList.toggle('add-blur');
  modalBg.classList.toggle('show-dialog');
  modalBg.removeEventListener('click', handleClose);
  crossBtn.removeEventListener('click', handleClose);
}

const createModal = () => {
  modalBg.classList.toggle('show-dialog');
  rootEle.classList.toggle('add-blur');
  modalBg.addEventListener('click', handleClose);
  crossBtn.addEventListener('click', handleClose);

}

modalButton.addEventListener('click', createModal);



container.addEventListener('click', (e) => {
  e.stopPropagation();
})