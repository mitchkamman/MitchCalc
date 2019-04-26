
const calcContainer = document.getElementById("calc")

var $calcLog = $('#log');
var log = []
var socket = io.connect("http://localhost:8081");

var sendMessage = function(calcMessage){
  socket.emit("sendCalc", calcMessage, 
  function() {
    //Callback function
  });
};

socket.on("update messages", function(msg){
  if(log.length == 10){
    log.pop();
  }

  log.unshift(msg);
  $calcLog.empty();
  $.each(log, function(i, element) {
    $calcLog.append('<li>'+element+'</li>');
  });
  });

var calculate = function (val1, val2, op, name) {
  var valid = false;
  var result = ''
  if(op == '+'){
      result = +val1 + +val2
      alert("Answer:" + result + "!");

      valid = true;
  }
  else if(op == '-'){
      result = +val1 - +val2
      alert(result + "!");

      valid = true;
  }
  else if(op == '*'){
      result = +val1 * +val2
      alert(result + "!");

      valid = true;
  }
  else if(op == '/'){
      result = +val1 / +val2
      alert(result + "!");

      valid = true;
  }

  if(valid === false){
      alert("Invalid input");
  };

  var message = name + ": " + val1 + op + val2 + "=" + result;
  sendMessage(message);
};


class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value1: 0, value2: 0, value3: '+', username: "user"};

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value1: event.target.value, value2: this.state.value2, value3: this.state.value3, username: this.state.username});
  }

  handleChange2(event) {
    this.setState({value1: this.state.value1, value2: event.target.value, value3: this.state.value3, username: this.state.username});
  }

  handleChange3(event) {
    this.setState({value1: this.state.value1, value2: this.state.value2, value3: event.target.value, username: this.state.username});
  }

  handleChange4(event) {
    this.setState({value1: this.state.value1, value2: this.state.value2, value3: this.state.value3, username: event.target.value});
  }

  handleSubmit(event) {
    calculate(this.state.value1, this.state.value2, this.state.value3, this.state.username);
  
    event.preventDefault();
  }

  render() {
    return (
      <div className="test">
        <label>
            Username:
            <input type="text" value={this.state.username} onChange={this.handleChange4} />
            </label>
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
      </div>  
    );
  }
}

ReactDOM.render(
    <Calc />,
    calcContainer
  );


