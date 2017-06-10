import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from './components/dialog/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class App extends Component {
	constructor(props) {
	    super(props);

	    this.handleOpenFirstDialog = this.handleOpenFirstDialog.bind(this);
	    this.handleCloseFirstDialog = this.handleCloseFirstDialog.bind(this);
	    this.saveData = this.saveData.bind(this);
	    this.dataTable = this.dataTable.bind(this);
	    this.list = this.list.bind(this);

	    this.state = {openFirstDialog: false, openSecondDialog: false};
	}

	handleOpenFirstDialog = () => {
	    this.setState({openFirstDialog: true});
	};

	handleCloseFirstDialog = (bool) =>  {
    	this.setState({openFirstDialog: bool});
	};

	saveData = (data) => {
		this.setState({data})
	};

	list = (data) => {
		return data.map( (item, i) =>
			<li key={i.toString()}>{item.title} - {item.count}</li>
			)
	};

	dataTable = () => {
		if ( this.state.data && this.state.data.length ) {
			return (
			<ul>
				<h3>Выбранная структура номеров</h3>
				{this.list(this.state.data)}
			</ul>
			)
		} else {
			return null;
		}
	}

	render() {
	    return (
	    	<MuiThemeProvider>
	    	<div>
	    		<RaisedButton label="Open dialog" onTouchTap={this.handleOpenFirstDialog} />
	    		{this.dataTable()}
			    <Dialog stateOpen={this.state.openFirstDialog} handleActionClose={this.handleCloseFirstDialog} saveData={this.saveData}/>
			</div>
			</MuiThemeProvider>
	    );
	  }
}
