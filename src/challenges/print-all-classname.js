const printAllClassName = (node) => {
  if(!node) return;

  if(node.classList.length > 0){
    console.log(node.className);
  }
  if(node.children){
    for(let i = 0; i<node.children.length; i++){
      printAllClassName(node.children[i]);
    }
  }

}

printAllClassName(document.body)