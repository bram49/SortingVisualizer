export function getBubbleSortAnimations(array) {
    const animations = [];

    //after one iteration, last element of array is correctly sorted, so lower limit
    for (let limit = array.length; limit>0; limit--){
        for(let j=0; j<limit-1; j++){
            animations.push([j,j+1,'compare'])
            if(array[j] > array[j+1]){
                animations.push([j,j+1,'swap']);
                let buffer = array[j];
                array[j] = array[j+1];
                array[j+1] = buffer;
            }
            animations.push([j,j+1,'uncompare'])
        }
    }
    return animations;
  }

