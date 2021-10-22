export default class Keyboard {
    private keys: any = [];
    
    constructor() {
      window.addEventListener('keydown', this.onkeydown.bind(this));
      window.addEventListener('keyup', this.onkeyup.bind(this));
    }
    
    onkeydown(e: any) {
      console.log(e.key);
      this.keys[e.key] = true;
    }
  
    onkeyup(e: any) {
      this.keys[e.key] = false;
    }
  
    keyPressed(k: string): boolean {
      if (this.keys[k]) {
        return this.keys[k];
      }
      return false;
    }
}

