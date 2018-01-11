import config from './config';

/*
 * All of the Game of Life rules operate by knowing how many neighbors are alive.
 * So if we create a neighbor counter variable and increment it each time we find
 * a neighbor with a state of 1, we’ll have the total of live neighbors
 * */
function countNeighbours(x, y){
  let neighbours = 0;

  for(let i = -1; i <=1; i++){
    for(let j = -1; j <= 1; j++){
      // neighbours += config.gridData[x+i][y+j];
      // neighbors += board[(x+i+columns)%columns][(y+j+rows)%rows];

      neighbours += config.gridData[(x+i+config.CELLS_PER_ROW)%config.CELLS_PER_ROW][(y+j+config.CELLS_PER_ROW)%config.CELLS_PER_ROW];
    }
  }

  //the cell itself does not count as one of the neighbors
  neighbours -= config.gridData[x][y];
  return neighbours;
}

/*
 * Once we know the total number of live neighbors,
 * we can decide what the cell’s new state should be according
 * to the rules: birth, death, or stasis.
 * */
function checkRuleSet(x, y, neighbours){
  let nextCellState;

  //if it is alive and has less than 2 live neighbours, the cell should die from loneliness
  if(config.gridData[x][y] === 1 && neighbours < 2) nextCellState = 0;

  //if it is alive and has more than 3 live neighbours, it dies from overpopulation
  else if(config.gridData[x][y] === 1 && neighbours > 3) nextCellState = 0;

  //if it is dead and has exactly 3 live neighbours, it is born
  else if(config.gridData[x][y] === 0 && neighbours === 3) nextCellState = 1;

  //in all other case, its state remains the same
  else nextCellState = config.gridData[x][y];

  return nextCellState;
}

export default class Grid{
  //Analyze each cell’s neighborhood and calculate a new state
  static computeNextGeneration(){
    let gridData = JSON.parse(JSON.stringify(config.gridData));
    for(let x = 0; x < config.CELLS_PER_ROW; x++){
      for(let y = 0; y < (config.CELLS_PER_ROW); y++){
        let neighbours = countNeighbours(x, y);
        gridData[x][y] = checkRuleSet(x, y, neighbours);
      }
    }

    config.gridData = gridData;

    this.updateDOM();
  }

  static updateDOM(){
    config.gridData.forEach((row, i) => {
      row.forEach((cell, j) => {
        let cellDOM = config.container.children[i].children[j];
        let style = `
          width : ${config.CELL_SIZE}px;
          height : ${config.CELL_SIZE}px;
          background-color : ${cell === 1 ? 'black' : 'transparent'};
        `;

        cellDOM.setAttribute('style', style);
      });
    });
  }

  static render(){
    config.gridData.forEach((row) => {
      let rowDOM = document.createElement('div');
      rowDOM.classList.add('row');

      row.forEach((cell) => {
        let cellDOM = document.createElement('div');
        cellDOM.classList.add('cell');

        let style = `
          width : ${config.CELL_SIZE}px;
          height : ${config.CELL_SIZE}px;
          background-color : ${cell === 1 ? 'black' : 'transparent'};
        `;

        cellDOM.setAttribute('style', style);
        rowDOM.appendChild(cellDOM);
      });

      config.container.appendChild(rowDOM);
    });
  }
}