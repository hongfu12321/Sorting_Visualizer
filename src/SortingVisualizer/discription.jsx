import React from 'react';
import './SortingVisualizer.css'

/*
** Algorithm type
*/
const BUBBLE = 1;
const MERGE = 2;
const QUICK = 3;


export class Description extends React.Component {

    bubble_sort() {
        return (
            <div>
                <h3>Bubble sort</h3>
                <p>
                    1. Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.
                </p>
            </div>
        );
    }

    merge_sort() {
        return (
            <div>
                <h3>Merge sort</h3>
                <p>
                    1. Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).<br/>
                    2. Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.
                </p>
            </div>
        );
    }

    quick_sort() {
        return (
            <div>
                <h3>Quick sort</h3>
                <p>
                    Quick sort follows the below steps: <br/>
                    Step 1 − Make any element as pivot. <br/>
                    Step 2 − Partition the array on the basis of pivot. <br/>
                    Step 3 − Apply quick sort on left partition recursively. <br/>
                    Step 4 − Apply quick sort on right partition recursively. <br/>
                </p>
            </div>
        );
    }

    no_type() {
        return ;
    }

    render() {
        let description;

        switch (this.props.algo_type) {
            case BUBBLE:
                description = this.bubble_sort();
                break;
            case MERGE:
                description = this.merge_sort();
                break;
            case QUICK:
                description = this.quick_sort();
                break;
            default: 
                description = this.no_type();
        }
        return (
            <div>
                {description}
            </div>
        );
    }
}
