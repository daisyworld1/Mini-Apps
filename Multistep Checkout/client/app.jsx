

//Confirmation page
var Confirmation = () => (
  <div>
    <h3>Please confirm your order!</h3>
    <button type='submit'>Purchase</button>
  </div>
)

function Checkout4(props){
  console.log('props.collectedShipTo:', props.collectedPaymentMethod)
  if (props.collectedPaymentMethod) {
    $('#checkout1').show()
    $('#checkout2').show()
    $('#checkout3').show()
    return <Confirmation id={props.id}/>;
  }
  return null;
}

ReactDOM.render(
  <Checkout4 />,
  document.getElementById('app')
);

//CollectPaymentMethod component
class CollectedPaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectedPaymentMethod: false
    };
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }
  nextButtonClick(e){ 
    e.preventDefault();
    this.setState({collectedPaymentMethod: true});
    $.post("http://localhost:5000/update",
    {
      id: this.props.id,
      creditCardNumber: document.getElementById("creditCardNumber").value,
      expiryDate: document.getElementById("expiryDate").value,
      CVV: document.getElementById("CVV").value,
      billingZipcode: document.getElementById("billingZipcode").value
    },
    function(data, status){
      console.log("Data: " + data + "\nStatus: " + status);
    });
  }
  render() {
    return (
      <div>
        <div id="checkout3">
          <form>
            <h3>Please enter your payment information.</h3>
            <label>Credit Card #:</label><br/>
            <input type="text" id="creditCardNumber" name="creditCardNumber" /><br/>
            <label>Expiry Date:</label><br/>
            <input type="text" id="expiryDate" name="expiryDate" /><br/>
            <label>CVV:</label><br/>
            <input type="text" id="CVV" name="CVV" /><br/>
            <label>Billing Zip Code:</label><br/>
            <input type="text" id="billingZipcode" name="billingZipcode" /><br/>
            <input type="submit" value="Next" onClick={this.nextButtonClick}/> 
          </form> 
        </div>
        <Checkout4 collectedPaymentMethod={this.state.collectedPaymentMethod} id={this.props.id}/> 
      </div>
    );
  }
}

function Checkout3(props){
  console.log('props.collectedShipTo:', props.collectedShipTo)
  if (props.collectedShipTo) {
    $('#checkout2').hide()
    return <CollectedPaymentMethod id={props.id}/>;
  }
  return null;
}

ReactDOM.render(
  <Checkout3 />,
  document.getElementById('app')
);

//CollectShipTo component

class CollectShipTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectedShipTo: false
    };
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }
  nextButtonClick(e){ 
    e.preventDefault();
    this.setState({collectedShipTo: true});
    $.post("http://localhost:5000/update",
    {
      id: this.props.id,
      shipToLine1: document.getElementById("shipToLine1").value,
      shipToLine2: document.getElementById("shipToLine2").value,
      shipToCity: document.getElementById("shipToCity").value,
      shipToState: document.getElementById("shipToState").value,
      shipToZipcode: document.getElementById("shipToZipcode").value
    },
    function(data, status){
      console.log("Data: " + data + "\nStatus: " + status);
    });
  }
  render() {
    return (
      <div>
        <div id="checkout2">
          <form>
            <h3>Please enter your address.</h3>
            <label>Line 1:</label><br/>
            <input type="text" id="shipToLine1" name="line1" /><br/>
            <label>Line 2:</label><br/>
            <input type="text" id="shipToLine2" name="line2" /><br/>
            <label>City:</label><br/>
            <input type="text" id="shipToCity" name="city" /><br/>
            <label>State:</label><br/>
            <input type="text" id="shipToState" name="state" /><br/>
            <label>Zip Code:</label><br/>
            <input type="text" id="shipToZipcode" name="zipcode" /><br/>
            <input type="submit" value="Next" onClick={this.nextButtonClick}/> 
          </form>
        </div>
        <Checkout3 collectedShipTo={this.state.collectedShipTo} id={this.props.id}/> 
      </div>
    );
  }
}


function Checkout2(props){
  console.log('props.createdAccount: ', props.createdAccount)
  if (props.createdAccount) {
    $('#checkout1').hide()
    console.log(props.id)
    return <CollectShipTo id={props.id}/>;
  }
  return null;
}

ReactDOM.render(
  <Checkout2 />,
  document.getElementById('app')
);

//CreateAccount component
class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAccount: false
    };
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }
  nextButtonClick(e){ 
    e.preventDefault();
    this.setState({createdAccount: true});
    $.post("http://localhost:5000/update",
    {
      id: this.props.id,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    },
    function(data, status){
      console.log("Data: " + data + "\nStatus: " + status);
    });
  }
  render() {
    return (
      <div>
        <div id="checkout1">
          <form>
            <h3>To create a new account, please enter your account inforamtion.</h3>
            <label>Name:</label><br/>
            <input type="text" id="name" name="name" /><br/>
            <label>email:</label><br/>
            <input type="text" id="email" name="email" /><br/>
            <label>password:</label><br/>
            <input type="text" id="password" name="password" /><br/>
            <input type="submit" value="Next" onClick={this.nextButtonClick}/>
          </form> 
        </div>
        <Checkout2 createdAccount={this.state.createdAccount} id={this.props.id}/> 
      </div>
    );
  }
}

function Checkout1(props){
  console.log('props.startedCheckout: ', props.startedCheckout)
  console.log('props.id: ', props.id)
  if (props.startedCheckout) {
    $('#home').hide()
    
    return <CreateAccount id={props.id}/>;
  }
  return null;
}

ReactDOM.render(
  <Checkout1 />,
  document.getElementById('app')
);

//App Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startedCheckout: false,
      id: null
    };
    this.checkoutButtonClick = this.checkoutButtonClick.bind(this);
   }
  checkoutButtonClick(e){ 
    e.preventDefault();
    this.setState({startedCheckout: true});
    //AJAX POST
    $.post("http://localhost:5000/create",
    {
      action: "create",
    },
    function(data, status){
      console.log("Data: " + data + "\nStatus: " + status);
      this.setState({id: data});
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div id="home">
          <h1>Home</h1>
          <button onClick={this.checkoutButtonClick}>Checkout</button>
        </div>
          <Checkout1 startedCheckout={this.state.startedCheckout} id={this.state.id} />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'))


