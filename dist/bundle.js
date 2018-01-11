/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const config = {
  CELLS_PER_ROW : 60, //number of cells PER ROW
  CELL_SIZE : Math.round((window.innerHeight - 70) / 60),
  gridData : [],
  frameId : null,
  container : document.querySelector('.grid')
};

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(0);


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

      neighbours += __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData[(x+i+__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW)%__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW][(y+j+__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW)%__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW];
    }
  }

  //the cell itself does not count as one of the neighbors
  neighbours -= __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData[x][y];
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
  if(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData[x][y] === 1 && neighbours < 2) nextCellState = 0;

  //if it is alive and has more than 3 live neighbours, it dies from overpopulation
  else if(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData[x][y] === 1 && neighbours > 3) nextCellState = 0;

  //if it is dead and has exactly 3 live neighbours, it is born
  else if(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData[x][y] === 0 && neighbours === 3) nextCellState = 1;

  //in all other case, its state remains the same
  else nextCellState = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData[x][y];

  return nextCellState;
}

class Grid{
  //Analyze each cell’s neighborhood and calculate a new state
  static computeNextGeneration(){
    let gridData = JSON.parse(JSON.stringify(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData));
    for(let x = 0; x < __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW; x++){
      for(let y = 0; y < (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW); y++){
        let neighbours = countNeighbours(x, y);
        gridData[x][y] = checkRuleSet(x, y, neighbours);
      }
    }

    __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData = gridData;

    this.updateDOM();
  }

  static updateDOM(){
    __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData.forEach((row, i) => {
      row.forEach((cell, j) => {
        let cellDOM = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].container.children[i].children[j];
        let style = `
          width : ${__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELL_SIZE}px;
          height : ${__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELL_SIZE}px;
          background-color : ${cell === 1 ? 'black' : 'transparent'};
        `;

        cellDOM.setAttribute('style', style);
      });
    });
  }

  static render(){
    __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData.forEach((row) => {
      let rowDOM = document.createElement('div');
      rowDOM.classList.add('row');

      row.forEach((cell) => {
        let cellDOM = document.createElement('div');
        cellDOM.classList.add('cell');

        let style = `
          width : ${__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELL_SIZE}px;
          height : ${__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELL_SIZE}px;
          background-color : ${cell === 1 ? 'black' : 'transparent'};
        `;

        cellDOM.setAttribute('style', style);
        rowDOM.appendChild(cellDOM);
      });

      __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].container.appendChild(rowDOM);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Controls__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Grid__ = __webpack_require__(1);




document.querySelector(".start").addEventListener('click', function(){
  __WEBPACK_IMPORTED_MODULE_1__Controls__["a" /* default */].startAnimation();
});

document.querySelector(".pause").addEventListener('click', function(){
  __WEBPACK_IMPORTED_MODULE_1__Controls__["a" /* default */].stopAnimation();
});

function init(){
  for(let x = 0; x < __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW; x++){
    let row = [];
    for(let y = 0; y < (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW); y++){
      if(x === 0 || x === (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW - 1) || y === 0 || y === (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].CELLS_PER_ROW - 1)){
        row.push(0);
      }
      else{
        row.push(Math.round(Math.random()));
      }
    }
    __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].gridData.push(row);
  }

  __WEBPACK_IMPORTED_MODULE_2__Grid__["a" /* default */].render();
}

init();

__WEBPACK_IMPORTED_MODULE_1__Controls__["a" /* default */].startAnimation();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Grid__ = __webpack_require__(1);



class Controls{
  constructor(){

  }
  
  static animation(){
    __WEBPACK_IMPORTED_MODULE_1__Grid__["a" /* default */].computeNextGeneration();
    __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].frameId = window.requestAnimationFrame(this.animation.bind(this));
  }

  static startAnimation(){
    if(!__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].frameId){
      __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].frameId = window.requestAnimationFrame(this.animation.bind(this));
    }
  }

  static stopAnimation(){
    window.cancelAnimationFrame(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].frameId);
    __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].frameId = null;
  }

  static reset(){

  }

  static randomize(){

  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controls;


/***/ })
/******/ ]);