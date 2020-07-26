fetch('http://localhost:3000/api/mygallery')
  .then(function(response){
    return response.json();
  })
  .then(function(mygallery){

  const imgList = mygallery;
  let imgTemplate = ''; 


const gallery = document.querySelector('.array-gallery'); 
 
imgList.forEach(function(item){
  console.log(item);
  imgTemplate += 
  `<figure><a href="${item.id}">
  <img src="${item.fileName}" alt="${item.title}" title="${item.title}">
  </a>
  <figcaption>${item.title}</figcaption>
        </figure>`;
});

 gallery.innerHTML = imgTemplate ;
});