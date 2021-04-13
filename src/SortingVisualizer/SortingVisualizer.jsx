import React from 'react';
import './SortingVisualizer.css';
import { Description } from './discription.jsx';
import { getBubbleSortAnimation } from '../SortingAlgorithms/SortingAlgorithms.jsx';
import { getMergeSortAnimation } from '../SortingAlgorithms/SortingAlgorithms.jsx';
import { getQuickSortAnimation } from '../SortingAlgorithms/SortingAlgorithms.jsx';

/* TODO:
* interrupt - stop, step, continue
*/

/*
** Array Setting
*/
const DEFAULT_LENGTH = 30;
const LIMIT_LENGTH = 150;
const ARRAY_SCALE = 12;
const RAND_MIN = 5;
const RAND_MAX = 400;
const DEFAULT_SPEED = 15;

/*
** Collor Setting
*/
// const PRIMARY_COLOR = "#3537F2";
const CONFIRM_COLOR = '#27AE60';
const SECONDARY_COLOR = "#FFBF00";
const ORIGINAL_COLOR = "#6495ED";

/*
** Merge Sort Parameter
*/
const SHOW_BOUNDARY = 0;
const MERGING = 1;

/* 
** Quick Sort Parameter
*/
const PIVOT = 0;
const PARTITION = 1;
const MIDDLE = 2

/*
** Algorithm type
*/
const NONE = 0;
const BUBBLE = 1;
const MERGE = 2;
const QUICK = 3;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            array: [],
            copy_array: [],
            length: DEFAULT_LENGTH,
            speed: DEFAULT_SPEED,
            time_complexity: 0,
            timeoutId: -1,
            algo_type: NONE,
        };
        
        this.handleLength = this.handleLength.bind(this);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.generateNewArray();
    }

    componentWillUnmount() {
        this.setState = () => false;
    }

    mergeSort(){
        this.resetArray();
        const timestamp = Date.now();
        const animations = getMergeSortAnimation(this.state.array.slice(0));
        let timeoutId;

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [idx, val, startIdx, endIdx, status] = animations[i];

            timeoutId = setTimeout(() => {
                if (status === SHOW_BOUNDARY) {
                    const start_style = arrayBars[startIdx].style;
                    const end_style = arrayBars[endIdx].style;

                    [start_style, end_style].map((style) => {
                        return style.backgroundColor = SECONDARY_COLOR;
                    })
                    
                }
                else if (status === MERGING) {
                    const idx_style = arrayBars[idx].style;

                    idx_style.backgroundColor = CONFIRM_COLOR;
                    idx_style.height = `${val/ARRAY_SCALE}vw`;
                }
            }, i * this.state.speed);
        }
        this.setState({timeoutId: timeoutId, algo_type: MERGE});
        
        setTimeout(() => {
            this.setState({time_complexity: (Date.now() - timestamp) / 1000})
        }, animations.length * this.state.speed);
    }

    bubbleSort(){
        this.resetArray();
        const animations = getBubbleSortAnimation(this.state.array.slice(0));
        const timestamp = Date.now();
        let timeoutId;

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, oneVal, twoVal, finish] = animations[i];

            timeoutId = setTimeout(() => {
                if (finish === 1) {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.backgroundColor = CONFIRM_COLOR;
                }
                else {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    
                    barOneStyle.backgroundColor = ORIGINAL_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    
                    if (oneVal > twoVal) {
                        barOneStyle.height = `${twoVal/ARRAY_SCALE}vw`;
                        barTwoStyle.height = `${oneVal/ARRAY_SCALE}vw`;
                    }
                }
            }, i * this.state.speed);
        }
        this.setState({timeoutId: timeoutId, algo_type: BUBBLE});
        setTimeout(() => {
            this.setState({time_complexity: (Date.now() - timestamp) / 1000})
        }, animations.length * this.state.speed);
    }

    quickSort(){
        this.resetArray();
        const animations = getQuickSortAnimation(this.state.array.slice(0));
        const timestamp = Date.now();
        let timeoutId;
        
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [srcIdx, srcVal, desIdx, desVal, status] = animations[i];

            timeoutId = setTimeout(() => {
                if (status === PIVOT) {
                    arrayBars[srcIdx].style.backgroundColor = SECONDARY_COLOR;
                }
                else if (status === PARTITION) {
                    // Elements swap when doing partition.
                    arrayBars[srcIdx].style.height = `${desVal/ARRAY_SCALE}vw`;
                    arrayBars[desIdx].style.height = `${srcVal/ARRAY_SCALE}vw`;
                }
                else if (status === MIDDLE) {
                    arrayBars[srcIdx].style.backgroundColor = ORIGINAL_COLOR;
                    arrayBars[srcIdx].style.height = `${desVal/ARRAY_SCALE}vw`;
                    arrayBars[desIdx].style.backgroundColor = CONFIRM_COLOR;
                    arrayBars[desIdx].style.height = `${srcVal/ARRAY_SCALE}vw`;
                }
            }, i * this.state.speed);
        }
        this.setState({timeoutId: timeoutId, algo_type: QUICK});
        setTimeout(() => {
            this.setState({time_complexity: (Date.now() - timestamp) / 1000})
        }, animations.length * this.state.speed);
    }

    generateNewArray() {
        this.resetStatus();
        const array = []

        for (let i = 0; i < this.state.length; i++) {
            array.push(randomNum(RAND_MIN, RAND_MAX));
        }
        this.setState({array: array, copy_array: [...array], time_complexity: 0, algo_type: NONE,});
    }

    resetArray() {
        this.resetStatus();
        const arrayBars = document.getElementsByClassName('array-bar');
        
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.height = `${this.state.copy_array[i]/ARRAY_SCALE}vw`;
        }
        this.setState({array: [...this.state.copy_array], time_complexity: 0, algo_type: NONE,});
    }

    resetStatus() {
        // Clear running animations
        if (this.state.timeoutId !== -1) {
            const timeoutId = this.state.timeoutId;
            for (let i = timeoutId; i >= 0; i--) {
                clearTimeout(timeoutId - i);
            }
        }

        // reset color
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = ORIGINAL_COLOR;
        }
    }

    handleLength(event) {
        let length = event.target.value;
        length = length > LIMIT_LENGTH ? LIMIT_LENGTH : length;
        this.setState({length: length});
    }

    handleSpeed(event) {
        let speed = event.target.value;
        this.setState({speed: speed});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.generateNewArray();
    }

    render() {
        const {array} = this.state
        const styles = {
            input_style: {
                width: "20%",
                border: "solid 0.2vw #ffc13b",
                fontSize: "1.3vw",
                height: "1.7vw",
                marginRight: "0.3vw",
                marginLeft: "0vw",
            }
        }

        return (
            <div className="container">
                <div className="nav-bar">
                    <div className="logo text">Sorting Visualizer</div>
                    <div className="generate-array-container">
                        <button className="flex-comp btn text" onClick={() => this.generateNewArray()}>New Array</button>
                        <button className="flex-comp btn text" onClick={() => this.resetArray()}>Reset Array</button>
                    </div>
                    <div className="div-container">
                        <div className="dropdown">
                            <button className="btn text">Algorithms &#x25BE;</button>
                            <div className="dropdown-content">
                                <button className="btn-dropdown text-dropdown" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                                <button className="btn-dropdown text-dropdown" onClick={() => this.mergeSort()}>Merge Sort</button>
                                <button className="btn-dropdown text-dropdown" onClick={() => this.quickSort()}>Quick Sort</button>
                            </div>
                        </div>
                    </div>
                    <div className="div-container">
                        <div className="dropdown">
                            <button className="btn text">Setting &#x25BE;</button>
                            <div className="dropdown-content">
                                <form className="setting-form" onSubmit={this.handleSubmit}>
                                    <input style={styles.input_style} type="text" value={this.state.length} onChange={this.handleLength}/>
                                    <input className="btn-dropdown text-dropdown" type="submit" value="Set Length"/>
                                </form>
                                <form className="setting-form" onSubmit={this.handleSubmit}>
                                    <input style={styles.input_style} type="text" value={this.state.speed} onChange={this.handleSpeed}/>
                                    <input className="btn-dropdown text-dropdown" type="submit" value="Set Speed"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                height: `${value/ARRAY_SCALE}vw`,
                                backgroundColor: ORIGINAL_COLOR,
                            }}>
                        </div>
                    ))}
                </div>
                <div className="result-container text">
                    <div className="discription-container">
                        <Description 
                            algo_type={this.state.algo_type}
                        />
                    </div>
                    <div className="runtime-container">
                        <h2>Run Time: {this.state.time_complexity}s</h2>
                    </div>
                </div>
            </div>
        );
    }
  
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}