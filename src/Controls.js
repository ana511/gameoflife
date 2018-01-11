import config from './config';
import Grid from './Grid';

export default class Controls{
  constructor(){

  }
  
  static animation(){
    Grid.computeNextGeneration();
    config.frameId = window.requestAnimationFrame(this.animation.bind(this));
  }

  static startAnimation(){
    if(!config.frameId){
      config.frameId = window.requestAnimationFrame(this.animation.bind(this));
    }
  }

  static stopAnimation(){
    window.cancelAnimationFrame(config.frameId);
    config.frameId = null;
  }

  static reset(){

  }

  static randomize(){

  }
}