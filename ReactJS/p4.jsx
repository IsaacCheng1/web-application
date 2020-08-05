import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';

import Example from './components/example/Example';
import States from './components/states/States';

class DynamicViewSwitch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExampleView: true,
		};
	}

	handleButtonClick(event) {
		this.setState({isExampleView: !this.state.isExampleView});
	}

	render() {
		return <div className="container">
					<button
						type="button"
    					onClick={e => this.handleButtonClick(e)}
    				>
    				{this.state.isExampleView ? "Switch to State View" : "Switch to Example View"}
    				</button>
    			{this.state.isExampleView ? <Example/> : <States/>}
			   </div>
	}
}

ReactDOM.render(
  <DynamicViewSwitch />,
  document.getElementById('reactapp'),
);