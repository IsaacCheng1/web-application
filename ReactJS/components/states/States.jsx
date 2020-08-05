import React from 'react';
import './States.css';
import Header from '../header/Header'


/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    console.log('window.cs142models.statesModel()', window.cs142models.statesModel());

    this.state = {
      inputValue: '',
      results: '',
      isButtonClicked: false
    };

    this.handleInputChangeBound = event => this.handleInputChange(event);
  }

  handleInputChange(event) {
    this.setState( { inputValue: event.target.value });
  }

  fetchResult() {
    this.state.isButtonClicked = false;
    var states = window.cs142models.statesModel();
    var listItems = [];
    states.forEach((state, ind) => {
      if (state.toLowerCase().includes(this.state.inputValue.toLowerCase())) {
        listItems.push(state);
      }
    })


    if (listItems.length === 0) {
      return <div className="noResult">Sorry, no results.</div>
    } else {
      // sort the list alphabetically
      listItems.sort();

      return <table>
              <tbody>
                {listItems.map((state, ind) => <tr key={ind+1}><td>{state}</td></tr>)}
              </tbody>
             </table>
    }
  }

  handleButtonClick(event) {
    this.setState( { isButtonClicked: true });
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <label className="label">Input Field: </label>
        <input type="text" className="input" 
          placeholder="which state you want to search today?"
          value={this.state.inputValue} 
          onChange={this.handleInputChangeBound} name="search"/>
        <button
          type="button"
          className="state-button"
          onClick={e => this.handleButtonClick(e)}
        >
          search
        </button>
        {this.state.isButtonClicked && <div className="result">Here are your search results:</div>}
        {this.state.isButtonClicked && <div>{this.fetchResult()}</div>}
      </div>
    );
  }
}

export default States;
