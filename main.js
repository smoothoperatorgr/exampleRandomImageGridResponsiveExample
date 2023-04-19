// function to get a random image URL from Lorem Picsum
function getRandomImageURLFromLoremPicsum() {
    const width = Math.floor(Math.random() * 440) + 200; // get a random width between 200 and 599
    const height = Math.floor(Math.random() * 440) + 200; // get a random height between 200 and 599
    return `https://picsum.photos/${width}/${height}`;
  }
  
  // function to get a random image URL from Pexels
  async function getRandomImageURLFromPexels(i, apiKey) {
    
    let keywords = ['landscape', 'city', 'nature', 'mountains', 'sea', 'ocean', 'pattern',
    'night', 'summer', 'winter', 'travel', 'beach', 'abstract', 'universe',
    'snow', 'road', 'river', 'sky', 'blur', 'stars', 'streets', 'sunset',
    'forest', 'rain', 'light', 'abstract', 'macro', 'art', 'design'];
    
      let keyword = keywords[Math.floor(Math.random() * keywords.length)];
      let url = 'https://api.pexels.com/v1/search?query=' + keyword + '&per_page=16&page=';
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey
      }
    });
    const data = await response.json();
    let j = Math.floor(Math.random() * 16);
    return data.photos[j].src.medium;
  }
  

  // function to create a new image grid
  async function createImageGrid(imageSource, apiKey) {
    const container = document.getElementById('image-grid-container');
    container.innerHTML = ''; // clear the container
    let getRandomImageURL;
    let i;
    switch (imageSource) {
      case 'lorem-picsum':
        getRandomImageURL = getRandomImageURLFromLoremPicsum;
        break;
      case 'pexels':
        getRandomImageURL = () => getRandomImageURLFromPexels(i,apiKey);
        break;
      default:
        getRandomImageURL = getRandomImageURLFromLoremPicsum;
        break;
    }
    for (i = 0; i < 16; i++) {
      let imageURL = await getRandomImageURL(i);
      let imageElement = document.createElement('img');
      imageElement.classList.add('fit');
      imageElement.src = imageURL;
      container.appendChild(imageElement);
    }
  }
  
  // create a new image grid when the button is clicked
  const button = document.getElementById('go-button');
  button.addEventListener('click', () => {
    const imageSource = document.getElementById('image-source').value;
    const apiKey = '<your-pexel-api-key>';
    switch (imageSource) {
      case 'lorem-picsum':
        createImageGrid(imageSource);
        break;
      case 'pexels':
        createImageGrid(imageSource, apiKey);
        break;
      default:
        createImageGrid(imageSource);
        break;
    }
});

const buttonFull = document.getElementById('full');
const buttonFit = document.getElementById('fit');
buttonFit.addEventListener('click', () => {
  console.log('fit on');
  let img = document.getElementsByTagName('img');
  for (let i = 0; i < img.length; i++) {
    img[i].classList.remove('full');
    img[i].classList.add('fit');
  }
  
});
  
buttonFull.addEventListener('click', () => {
  console.log('full on');
  let img = document.getElementsByTagName('img');
  for (let i = 0; i < img.length; i++) {
    img[i].classList.remove('fit');
    img[i].classList.add('full');
  }
});