import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import { HashRouter, Route, Link } from "react-router-dom";

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
		return <HashRouter>
				<div>
					<Link className="state-link" to="/states">States</Link>
					<Link className="example-link" to="/example">Example</Link>

					<Route path="/states" component={States} />
					<Route path="/example" component={Example} />
				</div>
			   </HashRouter>

	}
}

ReactDOM.render(
  <DynamicViewSwitch />,
  document.getElementById('reactapp'),
);