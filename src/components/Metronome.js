import React from 'react';
import click1 from '../click1.wav';
import click2 from '../click2.wav';

class Metronome extends React.Component {
    state = {
        playing: false,
        bpm: 100,
        count: 0,
        beatsPerMeasure: 4
    };

    click1 = new Audio(click1);
    click2 = new Audio(click2);

    handleOnChange = (e) => {
        const bpm = e.target.value;
        if(this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
            this.setState(() => ({
                count: 0,
                bpm
            }));
        }
        else {
            this.setState(() => ({
                bpm
            }));
        }
    };

    startStop = () => {
        if(this.state.playing){
            clearInterval(this.timer);
            this.setState(() => ({
                playing: false
            }));   
        }
        else {
            this.timer = setInterval(this.playClick, (60/this.state.bpm) * 1000);
            this.setState(() => ({
                count: 0,
                playing:true
            }), this.playClick);
        }
    };

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;
        if(count%beatsPerMeasure === 0){
            this.click2.play();
        }
        else {
            this.click1.play();
        }

        this.setState((prevState) => ({
            count: (prevState.count + 1) % prevState.beatsPerMeasure
        }));
    };

    render() {
        return (
            <div className='metronome'>
            <div className='bpm-slider'>
                <div>{this.state.bpm} BPM</div>
                <input type='range' min='60' max='240' value={this.state.bpm} 
                className='bpm-slider__input' onChange={this.handleOnChange}/>
            </div>
            <button className = 'bpm-slider__button' onClick={this.startStop}>
            {this.state.playing ? 'Stop': 'Start'}
            </button>
            </div>
        
        );
    }
}

export default Metronome;