import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 110;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [], //Main Array stored in state
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {     //This func will work when we click Generate new Array
        const array = [];
        for(let i=0;i<310;i++){
            array.push(randomIntFromInterval(5,730)); //We create new arrays(including duplicates)
        }
        this.setState({array});
    }
   //Trick logic comes to play
   mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar'); //get all arrays in mersort by class name
      const isColorChange = i % 3 !== 2; //checks if indes of 2 array are change(not same)
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; //if sorted changing colors
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => { //changing heights of BARS by overiding
          const [barOneIdx, newHeight] = animations[i]; 
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

    quickSort() {}

    heapSort() {}
    
    bubbleSort() {}

    testSortingAlgorithms() {
        for(let i=0; i<100; i++){
          const array = [];
          const length = randomIntFromInterval(1,1000);
        for(let i=0; i < length;i++) {
            array.push(randomIntFromInterval(-1000, 1000));
         }
         const javaScriptSortedArray = array.slice().sort((a,b) => a-b);
         const mergeSortedArray = getMergeSortAnimations(array.slice());
         console.log(arraysAreEqual(javaScriptSortedArray,mergeSortedArray));
        }
    }



    render() {
        const {array} = this.state;

        return (
            <div className='array-container'>
            {array.map((value, idx) => (
                <div 
                className="array-bar" //this creates css of Bars
                key={idx}
                style={{height: `${value}px`}}></div>
            ))}
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button> 
            <button onClick={() => this.testSortingAlgorithms()}>testSortingAlgorithms</button> 
            </div>
        );
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function arraysAreEqual(arrayOne,arrayTwo) {
    if(arrayOne.length !== arrayTwo.length) return false;
    for(let i=0;i<arrayOne.length;i++){ //Insort just comparing both sorted arrays
       if(arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}