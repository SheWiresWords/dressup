class DressUpGame {
  constructor() {
    this.categories = {
      bot: { current: 1, max: 9 },
      shirt: { current: 1, max: 6 },
      hair: { current: 1, max: 15 },
      acc: { current: 0, max: 5 },
      glasses: { current: 0, max: 4 }
    };
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.updateAllCounters();
    this.initializeDefaultLayers();
  }
  
  setupEventListeners() {
    //arrow button clickers
    document.querySelectorAll('.arrow-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        const direction = e.target.dataset.direction;
        this.changeItem(category, direction);
      });
    });
    
    //Reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
      this.resetAll();
    });
  }
  
  changeItem(category, direction) {
    const categoryData = this.categories[category];
    
    //bottom and shirt doesn't have 0 option, always cycle with 1
    if(category === 'bot' || category === 'shirt'){
      if(direction === 'next'){
        categoryData.current = categoryData.current === categoryData.max ? 1 : categoryData.current + 1;
      } 
      else{
        categoryData.current = categoryData.current === 1 ? categoryData.max : categoryData.current - 1;
      }
    } 
    else{
      //other cats start w/ 0
      if(direction === 'next'){
        categoryData.current = (categoryData.current + 1) % (categoryData.max + 1);
      } 
      else{
        categoryData.current = categoryData.current === 0 ? categoryData.max : categoryData.current - 1;
      }
    }
    
    this.updateLayer(category);
    this.updateCounter(category);
  }
  
  updateLayer(category){
    const img = document.getElementById(category);
    const current = this.categories[category].current;
    
    if(current === 0){
      img.style.display = 'none';
      img.src = '';
    } 
    else{
      img.style.display = 'block';
      img.src = `images/${category}${current}.png`;
    }
  }
  
  updateCounter(category){
    const counter = document.getElementById(`${category}-counter`);
    const current = this.categories[category].current;
    const max = this.categories[category].max;
    counter.textContent = `${current}/${max}`;
  }
  
  updateAllCounters(){
    Object.keys(this.categories).forEach(category => {
      this.updateCounter(category);
    });
  }
  
  initializeDefaultLayers(){
    //nonzero layers initiatlize
    Object.keys(this.categories).forEach(category =>{
      if(this.categories[category].current > 0){
        this.updateLayer(category);
      }
    });
  }
  
  resetAll(){
    Object.keys(this.categories).forEach(category =>{
      //remember to keep at 1
      if(category === 'bot'|| category === 'shirt' || category === 'hair'){
        this.categories[category].current = 1;
      } 
      else{
        this.categories[category].current = 0;
      }
      this.updateLayer(category);
      this.updateCounter(category);
    });  
  }    
}   

//start game
document.addEventListener('DOMContentLoaded', () =>{
  new DressUpGame();
});
    
