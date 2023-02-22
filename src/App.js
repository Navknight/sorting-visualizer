import React, { Component } from "react";
import Bar from "./components/Bar";
import "./App.css";
import Play from "@material-ui/icons/PlayCircleOutlineRounded";
import Forward from "@material-ui/icons/SkipNextRounded";
import Backward from "@material-ui/icons/SkipPreviousRounded";
import RotateLeft from "@material-ui/icons/RotateLeft";
import BubbleSort from "./algorithms/BubbleSort";
import QuickSort from "./algorithms/QuickSort";
import MergeSort from "./algorithms/MergeSort";
import HeapSort from "./algorithms/HeapSort";
import SelectionSort from "./algorithms/SelectionSort";

class App extends Component {
    state = {
        array: [],
        arraySteps: [],
        colorKey: [],
        colorSteps: [],
        currentStep: 0,
        count: 10,
        delay: 100,
        algorithm: "Heap Sort",
        timeouts: [],
    };

    ALGORITHMS = {
        "Bubble Sort": BubbleSort,
        "Quick Sort": QuickSort,
        "Merge Sort": MergeSort,
        "Heap Sort": HeapSort,
        "Selection Sort": SelectionSort,
    };

    componentDidMount() {
        this.generateRandomArray();
    }

    generateSteps = () => {
        let array = this.state.array.slice();
        let steps = this.state.arraySteps.slice();
        let colorSteps = this.state.colorSteps.slice();

        this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

        this.setState({
            arraySteps: steps,
            colorSteps: colorSteps,
        });
    };

    clearTimeouts = () => {
        this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
        this.setState({
            timeouts: [],
        });
    };

    clearColorKey = () => {
        let blankKey = new Array(this.state.count).fill(0);

        this.setState({
            colorKey: blankKey,
            colorSteps: [blankKey],
        });
    };

    clearArraySteps = () => {
        let blankArray = this.state.array.slice();
        this.setState({
            arraySteps: [blankArray],
        });
    };

    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    generateRandomArray = () => {
        this.clearTimeouts();
        this.clearColorKey();
        const count = this.state.count;
        const temp = [];

        for (let i = 0; i < count; i++) {
            temp.push(this.generateRandomNumber(50, 200));
        }

        this.setState(
            {
                array: temp,
                arraySteps: [temp],
                currentStep: 0,
            },
            () => {
                this.generateSteps();
            }
        );
    };

    changeArray = (index, value) => {
        let arr = this.state.array;
        arr[index] = value;
        this.setState(
            {
                array: arr,
                arraySteps: [arr],
                currentStep: 0,
            },
            () => {
                this.generateSteps();
            }
        );
    };

    previousStep = () => {
        let currentStep = this.state.currentStep;
        if (currentStep === 0) return;
        currentStep -= 1;
        this.setState({
            currentStep: currentStep,
            array: this.state.arraySteps[currentStep],
            colorKey: this.state.colorSteps[currentStep],
        });
    };

    nextStep = () => {
        let currentStep = this.state.currentStep;
        if (currentStep >= this.state.arraySteps.length - 1) return;
        currentStep += 1;
        this.setState({
            currentStep: currentStep,
            array: this.state.arraySteps[currentStep],
            colorKey: this.state.colorSteps[currentStep],
        });
    };

    start = () => {
        let steps = this.state.arraySteps;
        let colorSteps = this.state.colorSteps;
        this.clearTimeouts();
        let timeouts = [];
        let i = 0;

        while (i < steps.length - this.state.currentStep) {
            let timeout = setTimeout(() => {
                let currentStep = this.state.currentStep;
                this.setState({
                    array: steps[currentStep],
                    colorKey: colorSteps[currentStep],
                    currentStep: currentStep + 1,
                });

                timeouts.push(timeout);
            }, this.state.delay * i);
            i++;
        }

        this.setState({
            timeouts: timeouts,
        });
    };

    algoSelect = (e) => {
        console.log(e.target.id);
        this.setState(
            {
                algorithm: e.target.id,
                arraySteps: [this.state.array],
                colorSteps: [this.state.colorKey],
            },
            () => {
                this.generateSteps();
            }
        );
    };

    render() {
        let bars = this.state.array.map((value, index) => (
            <Bar
                key={index}
                index={index}
                length={value}
                color={this.state.colorKey[index]}
                changeArray={this.changeArray}
            />
        ));

        let playButton;

        if (this.state.arraySteps.length === this.state.currentStep) {
            playButton = (
                <button
                    className="controller"
                    onClick={this.generateRandomArray}
                >
                    <RotateLeft />
                </button>
            );
        } else {
            playButton = (
                <button className="controller" onClick={this.start}>
                    <Play />
                </button>
            );
        }

        return (
            <div className="app">
                <h1 className="name">{this.state.algorithm}</h1>
                <div className="frame">
                    <div className="barsDiv container card">{bars}</div>
                </div>
                <div className="control-pannel">
                    <button className="controller" onClick={this.previousStep}>
                        <Backward />
                    </button>
                    <div className="control-buttons">{playButton}</div>
                    <button className="controller" onClick={this.nextStep}>
                        <Forward />
                    </button>
                </div>
                <div className="pannel">
                    <button
                        className="algo"
                        id="Bubble Sort"
                        onClick={this.algoSelect}
                    >
                        Bubble Sort
                    </button>
                    <button
                        className="algo"
                        id="Heap Sort"
                        onClick={this.algoSelect}
                    >
                        Heap Sort
                    </button>
                    <button
                        className="algo"
                        id="Quick Sort"
                        onClick={this.algoSelect}
                    >
                        Quick Sort
                    </button>
                    <button
                        className="algo"
                        id="Merge Sort"
                        onClick={this.algoSelect}
                    >
                        Merge Sort
                    </button>
                    <button
                        className="algo"
                        id="Selection Sort"
                        onClick={this.algoSelect}
                    >
                        Selection Sort
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
