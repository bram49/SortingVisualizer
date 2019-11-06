import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort';
import {getQuickSortAnimations} from '../sortingAlgorithms/quickSort';



// Animation speed
const ANIMATION_SPEED_MS = 10;

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const PIVOT_COLOR = 'green';

export default class SortingVisualizer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i=1; i<200; i++){
            array.push(getRandomInt(5,100))
        }
        this.setState({array});
    }


    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const [barOneIdx, barTwoIdx, animate]= animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          //if animation is swap
          if (animate === 'swap') {
            setTimeout(() => {
              const newHeight = barTwoIdx;
              barOneStyle.height = `${newHeight}%`;
            }, i * ANIMATION_SPEED_MS);
          }
          //if animation is comparing
          else {
            const color = animate === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    quickSort() {
        const javaScriptArray = this.state.array.slice().sort((a,b) => a - b);

        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const [barOneIdx, barTwoIdx, animate]= animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          //if animation is pivot
          if(animate === 'swap'){
            setTimeout(() => {
              const newHeight = barTwoStyle.height;
              barTwoStyle.height = barOneStyle.height;
              barOneStyle.height = newHeight;
                }, i * ANIMATION_SPEED_MS);
            }else if(animate === 'compare'){
                setTimeout(() => {
                  barOneStyle.backgroundColor = SECONDARY_COLOR;
                  barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

            }else if(animate === 'uncompare'){
                setTimeout(() => {
                  barOneStyle.backgroundColor = PRIMARY_COLOR;
                  barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
              
            }else if(animate === 'pivot'){
                setTimeout(() => {
                  barOneStyle.backgroundColor = PIVOT_COLOR;
                }, i * ANIMATION_SPEED_MS);
            
            }
        }
    }

    heapSort() {}

    bubbleSort() {} 

    render(){
        const {array} = this.state;

        return (
            <div className="array-container">
            {array.map((value,idx) => (
                <div 
                className='array-bar' 
                key={idx}
                style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}%`
                    }}>
                </div>
            ))}
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>

            </div>
        )
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arraysAreEqual(array1, array2){
    if (array1.length !== array2.length) return false;
    for(let i = 1; i<array1.length; i++){
        if (array1[i] !== array2[i]){
            return false;
        }
    }
    return true;
}