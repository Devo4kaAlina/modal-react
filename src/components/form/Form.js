import React, { Component } from 'react';
import NumberInput from 'material-ui-number-input';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './Form.css';

const styles = {
  pluse: {
    fill: "rgb(239, 9, 9)",
    width: 33
  },
  add: {
    color: 'blue',
    textAlign: 'left',
    transform: "translateX(-15px)"
  },
  close: {
    transform: 'scale(0.7) rotate(45deg)',
    marginLeft: 15,
    verticalAlign: "top"
  },
  customWidth: {
    width: 150,
  },
  input: {
    marginLeft: 15,
    verticalAlign: "top",
    width: 35
  },
  list: {
    height: 190,
    overflowY: 'auto',
    marginRight: -18,
    paddingRight: 18
  },
  overflow: {
    overflow: 'hidden'
  }
};

//===================================================
// inputNumber
//===================================================

export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errorTexts: '', max: 1000, min: 1};
  };

  onChange = (event, value) => {
    this.props.changeCount(this.props.indexInArr, value)
  };

  onError = (error) => {
      let errorTexts;

      switch (error) {
        case 'required':
          errorTexts = 'Required';
          break;
        case 'invalidSymbol':
          errorTexts = 'You are tring to enter none number symbol';
          break;
        case 'incompleteNumber':
          errorTexts = 'Number is incomplete';
          break;
        case 'singleMinus':
          errorTexts = 'Minus can be use only for negativity';
          break;
        case 'singleFloatingPoint':
          errorTexts = 'There is already a floating point';
          break;
        case 'singleZero':
          errorTexts = 'Floating point is expected';
          break;
        case 'min':
          errorTexts = `You are tring to enter number less than ${this.state.min}`;
          break;
        case 'max':
          errorTexts = `You are tring to enter number greater than ${this.state.max}`;
          break;
        case 'none':
          errorTexts = '';
          break;
        default:
          errorTexts = '';
          break;
        }

        this.setState({errorTexts});
  };

  render() {
    const { onError, onChange } = this;
    const { errorTexts, max, min } = this.state;
    let defVal = this.props.valueDef + '';
    return (
      <NumberInput
        name = "number"
        required
        value={defVal}
        min={min}
        max={max}
        onChange={onChange}
        style={styles.input}
        errorText={errorTexts}
        onError={onError} />
    );
  }
}

//====================================================
// SelectField
//====================================================

export class ModalSelectField extends Component {

  constructor(props) {
    super(props);
    this.optionsVal = this.props.optionsVal;
  }

  MenuItemList = () => this.optionsVal.map((val, i) =>
    <MenuItem key={i.toString()} value={i+1} primaryText={val} />
  )

  handleChange = (event, index, value) => {
    this.props.changeCheckedOption(this.props.indexInArr, value)
    this.setState({value: value});
  }

  render() {
    return (
        <SelectField
          value={this.props.value}
          onChange={this.handleChange}
          style={styles.customWidth}
        >
          {this.MenuItemList()}
        </SelectField>
    );
  }
}

//====================================================
// Form
//====================================================

export class NameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultStructure: this.props.dataArr,
      optionsVal: ['Single','Twin','Tripple','Quardo']
    };

    this.upDateArr = this.upDateArr.bind(this);
    this.del = this.del.bind(this);
    this.changeCheckedOption = this.changeCheckedOption.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.add = this.add.bind(this);
  }

  structureList = () => this.props.dataArr.map( (val,i) => (
      <div className="parStr"  key={i} >
        <ModalSelectField indexInArr={i} changeCheckedOption={this.changeCheckedOption} value={val.name} optionsVal={this.state.optionsVal}/>
        <Input indexInArr={i} changeCount={this.changeCount} valueDef={val.count}/>

        <FloatingActionButton
            onTouchTap={this.del}
            mini={true}
            backgroundColor={"rgb(236, 223, 228)"}
            secondary={true}
            style={styles.close}>
          <ContentAdd
            tabIndex={i}
            style={styles.pluse}/>
        </FloatingActionButton>
      </div>
  ));

  changeCheckedOption(position, val) {
    let arr = this.state.defaultStructure;
    arr[position].name = [ val, this.state.optionsVal];
    this.upDateArr(arr)
  }
  changeCount(position, val) {
    let arr = this.state.defaultStructure;
    arr[position].count = val;
    this.upDateArr(arr)
  }
  del(event) {
      let index = +event.target.getAttribute("tabindex"),
      arr = this.state.defaultStructure;
      arr.splice(index, 1);
      this.upDateArr(arr)
  }
  upDateArr(arr) {
    this.props.upDateInfo(arr);
  }
  add() {
    let arr = this.state.defaultStructure;
    arr.push({
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
        });
    this.upDateArr(arr);
    let list_holder = document.querySelector('.list_holder');
    setTimeout(() => { list_holder.scrollTop = 999999}, 300 );
  }

  render() {
    return (
      <form>
        <div style={styles.overflow}>
          <div className='list_holder' style={styles.list}>
            {this.structureList()}
          </div>
        </div>
        <FlatButton
        label="Добавить"
        primary={true}
        style={styles.add}
        onTouchTap={this.add}
      />
      </form>
    );
  }
}

