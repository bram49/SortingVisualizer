export function getQuickSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    quickSort(auxiliaryArray,0,auxiliaryArray.length-1, animations)
    return animations
}

function quickSort(A, low, high, animations){
    if(low<high){
        //partition pivot, pivot is in right place
        const pivot_location = partition(A,low,high, animations);
        quickSort(A, low, pivot_location -1, animations);
        quickSort(A, pivot_location+1, high, animations);
    }
}

function partition(A,low,high, animations){
    const pivot = A[high];
    let i = low-1; //index of smaller element
    
    for(let j=low; j<high; j++){
        animations.push([j,high,'pivot'])
        animations.push([j,high,'uncompare'])
        if(A[j]<pivot){
            i++; //increment index of smaller element
            //swap
            animations.push([i,j,'swap'])
            let buffer = A[i];
            A[i] = A[j];
            A[j] = buffer;
        }
    }

    //swap pivot
    animations.push([i+1,high,'swap'])
    animations.push([high, i+1, 'pivot'])
    animations.push([high, i+1, 'uncompare'])
    A[high] = A[i+1]
    A[i+1] = pivot

    return i+1;
}