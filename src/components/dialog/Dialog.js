import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { NameForm } from './../form/Form';
import './Dialog.css';

injectTapEventPlugin();


const style = {
  marginLeft: 15,
  color: '#636363'
};

export default class ModalDialog extends React.Component {


  constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
      this.state = {
        dataArr: [
        {
          count: 1,
          optionIndex: 1,
          title: 'Single',
          get name() {
            return this.optionIndex
          },
          set name([val, list]) {
            this.title = list[val-1];
            this.optionIndex = val
          }
        },
        {
          count: 23,
          optionIndex: 2,
          title: 'Twin',
          get name() {
            return this.optionIndex
          },
          set name([val, list]) {
            this.title = list[val-1];
            this.optionIndex = val
          }
        }
        ],
        lastSaved: []
      };
      this.upDateInfo = this.upDateInfo.bind(this);
      this.saveInfo = this.saveInfo.bind(this);
      this.handleClose = this.handleClose.bind(this);
  }

  handleClose () {
    this.props.handleActionClose(false);
  };

  saveInfo() {
    this.state.lastSaved = JSON.parse(JSON.stringify(this.state.dataArr));
    this.props.saveData(this.state.lastSaved);
    this.handleClose();
  }
  upDateInfo(arr) {
    this.setState({dataArr: arr})
  }

  render() {
    const actions = [
      <RaisedButton
        label="Сохранить"
        primary={true}
        onTouchTap={this.saveInfo}
        />,
      <FlatButton
        label="Отмена"
        primary={true}
        style={style}
        onTouchTap={this.handleClose}
      />,
      <FloatingActionButton
        mini={true}
        disabled={false}
        onTouchTap={this.handleClose}
        className='button_close'>
          <ContentAdd />
        </FloatingActionButton>
    ];

    return (
      <div>
        <Dialog
          title='Структура номеров'
          actions={actions}
          modal={true}
          className='modal_form'
          contentClassName="mf_body"
          open={this.props.stateOpen}
          onRequestClose={this.handleClose}
        >

        <NameForm upDateInfo={this.upDateInfo} dataArr={this.state.dataArr}/>
        </Dialog>
      </div>
    );
  }
}
