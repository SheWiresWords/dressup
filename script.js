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


  
}
