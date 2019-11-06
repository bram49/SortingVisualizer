export function getQuickSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    quickSort(auxiliaryArray,0,auxiliaryArray.length, animations)
    return animations
}

function quickSort(A, low, high, animations){
    if(low<high){
        const pivot_location = partition(A,low,high, animations);
        quickSort(A, low, pivot_location, animations);
        quickSort(A, pivot_location+1, high, animations);
    }
}

function partition(A,low,high, animations){
    animations.push([low, low, 'pivot'])
    const pivot = A[low];
    let leftwall = low;
    
    for(let i=low+1; i<high; i++){
        animations.push([i,leftwall,'compare'])
        animations.push([i,leftwall,'uncompare'])
        if(A[i]<pivot){
            //swap
            animations.push([i,leftwall,'swap'])
            const buffer = A[i];
            A[i] = A[leftwall];
            A[leftwall] = buffer;
            //increment leftwall
            leftwall++;
        }
    }

    //swap pivot
    animations.push([low,leftwall,'swap'])
    animations.push([low,leftwall,'uncompare'])
    A[low] = A[leftwall]
    A[leftwall] = pivot

    return leftwall;
}