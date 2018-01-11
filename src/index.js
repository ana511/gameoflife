import config from './config';
import Controls from './Controls';
import Grid from './Grid';

document.querySelector(".start").addEventListener('click', function(){
  Controls.startAnimation();
});

document.querySelector(".pause").addEventListener('click', function(){
  Controls.stopAnimation();
});

function init(){
  for(let x = 0; x < config.CELLS_PER_ROW; x++){
    let row = [];
    for(let y = 0; y < (config.CELLS_PER_ROW); y++){
      if(x === 0 || x === (config.CELLS_PER_ROW - 1) || y === 0 || y === (config.CELLS_PER_ROW - 1)){
        row.push(0);
      }
      else{
        row.push(Math.round(Math.random()));
      }
    }
    config.gridData.push(row);
  }

  Grid.render();
}

init();

Controls.startAnimation();