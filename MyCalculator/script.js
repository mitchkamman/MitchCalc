
const calcContainer = document.getElementById("calc")
const logContainer = document.getElementById("log");

var addition = function (a, b) {
    var result = +a + +b;
	return result;
};

var subtraction = function (a, b) {
    var result = +a - +b;
	return result;
};

var multiplication = function (a, b) {
    var result = +a * +b;
	return result;
};

var division = function (a, b) {
    var result = +a / +b;
	return result;
};

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value1: 0, value2: 0, value3: '+', log: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value1: event.target.value, value2: this.state.value2, value3: this.state.value3, log: this.state.log});
  }

  handleChange2(event) {
    this.setState({value1: this.state.value1, value2: event.target.value, value3: this.state.value3, log: this.state.log});
  }

  handleChange3(event) {
    this.setState({value1: this.state.value1, value2: this.state.value2, value3: event.target.value, log: this.state.log});
  }

  handleSubmit(event) {
    var valid = false;
    var result = ''
    if(this.state.value3 == '+'){
        result = addition(this.state.value1, this.state.value2);
        alert("Answer:" + result + "!");

        valid = true;
    }
    else if(this.state.value3 == '-'){
        result = subtraction(this.state.value1, this.state.value2);
        alert(result + "!");

        valid = true;
    }
    else if(this.state.value3 == '*'){
        result = multiplication(this.state.value1, this.state.value2);
        alert(result + "!");

        valid = true;
    }
    else if(this.state.value3 == '/'){
        result = division(this.state.value1, this.state.value2);
        alert(result + "!");

        valid = true;
    }

    if(valid == false){
        alert("Input not valid");
    }
    else{
        var list = this.state.log;
        if(list.length == 10){
            list.pop();
        }
        list.unshift(this.state.value1 + this.state.value3 + this.state.value2 + "=" + result);

        this.setState({value1: this.state.value1, value2: this.state.value2, value3: this.state.value3, log: list});
    }
    
    event.preventDefault();
  }

  render() {
    return (
      <div className="test">
        <form onSubmit={this.handleSubmit}>
            <label>
            First number:
            <input type="text" value={this.state.value1} onChange={this.handleChange} />
            </label>
            <label>
            Operator (+, -, *, /):
            <input type="text" value={this.state.value3} onChange={this.handleChange3} />
            </label>
            <label>
            Second number:
            <input type="text" value={this.state.value2} onChange={this.handleChange2}/>
            </label>
            <input type="submit" value="Calculate" />
        </form>
        <div className="calc-log">
        <div className="log-header">
            Calculator Log:
        </div>
        <ul id = "test">
          {this.state.log.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        </div>
      </div>  
    );
  }
}

ReactDOM.render(
    <Calc />,
    calcContainer
  );


