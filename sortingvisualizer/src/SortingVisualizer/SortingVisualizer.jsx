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

    playAnimation(animations){
      for (let i = 0; i < animations.length; i++) {
        const [barOne, barTwo, animate]= animations[i];
        const arrayBars = document.getElementsByClassName('array-bar');
        const barOneStyle = arrayBars[barOne].style;
        const barTwoStyle = arrayBars[barTwo].style;
        //if animation is swap
        if (animate === 'swap') {
          this.swap(barOneStyle, barTwoStyle, i);
        }
        //if animation is comparing
        else if(animate === 'compare'){
          this.compare(barOneStyle, barTwoStyle, i);
        }
        //if animation is uncomparing
        else if(animate === 'uncompare'){
          this.uncompare(barOneStyle, barTwoStyle, i);
        }
        //if animation is pivot
        else if(animate === 'pivot'){
          this.pivot(barOneStyle, barTwoStyle, i);
        }
      }
    }

    swap(barOneStyle, barTwoStyle, time){
      //swap bars
      setTimeout(() => {
        const newHeight = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = newHeight;
      }, time * ANIMATION_SPEED_MS);
    }

    compare(barOneStyle, barTwoStyle, time){
      //color comparing bars
      setTimeout(() => {
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
      }, time * ANIMATION_SPEED_MS);
    }

    uncompare(barOneStyle, barTwoStyle, time){
      //color comparing bars
      setTimeout(() => {
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
      }, time * ANIMATION_SPEED_MS);
    }

    pivot(barOneStyle, barTwoStyle, time){
      //color comparing bars
      setTimeout(() => {
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = PIVOT_COLOR;
      }, time * ANIMATION_SPEED_MS);
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        this.playAnimation(animations);
      }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        this.playAnimation(animations);
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

