

//Confirmation page
var Confirmation = () => React.createElement(
  'div',
  null,
  React.createElement(
    'h3',
    null,
    'Please confirm your order!'
  ),
  React.createElement(
    'button',
    { type: 'submit' },
    'Purchase'
  )
);

function Checkout4(props) {
  console.log('props.collectedShipTo:', props.collectedPaymentMethod);
  if (props.collectedPaymentMethod) {
    $('#checkout1').show();
    $('#checkout2').show();
    $('#checkout3').show();
    return React.createElement(Confirmation, { id: props.id });
  }
  return null;
}

ReactDOM.render(React.createElement(Checkout4, null), document.getElementById('app'));

//CollectPaymentMethod component
class CollectedPaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectedPaymentMethod: false
    };
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }
  nextButtonClick(e) {
    e.preventDefault();
    this.setState({ collectedPaymentMethod: true });
    $.post("http://localhost:5000/update", {
      id: this.props.id,
      creditCardNumber: document.getElementById("creditCardNumber").value,
      expiryDate: document.getElementById("expiryDate").value,
      CVV: document.getElementById("CVV").value,
      billingZipcode: document.getElementById("billingZipcode").value
    }, function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    });
  }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { id: 'checkout3' },
        React.createElement(
          'form',
          null,
          React.createElement(
            'h3',
            null,
            'Please enter your payment information.'
          ),
          React.createElement(
            'label',
            null,
            'Credit Card #:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'creditCardNumber', name: 'creditCardNumber' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Expiry Date:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'expiryDate', name: 'expiryDate' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'CVV:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'CVV', name: 'CVV' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Billing Zip Code:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'billingZipcode', name: 'billingZipcode' }),
          React.createElement('br', null),
          React.createElement('input', { type: 'submit', value: 'Next', onClick: this.nextButtonClick })
        )
      ),
      React.createElement(Checkout4, { collectedPaymentMethod: this.state.collectedPaymentMethod, id: this.props.id })
    );
  }
}

function Checkout3(props) {
  console.log('props.collectedShipTo:', props.collectedShipTo);
  if (props.collectedShipTo) {
    $('#checkout2').hide();
    return React.createElement(CollectedPaymentMethod, { id: props.id });
  }
  return null;
}

ReactDOM.render(React.createElement(Checkout3, null), document.getElementById('app'));

//CollectShipTo component

class CollectShipTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectedShipTo: false
    };
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }
  nextButtonClick(e) {
    e.preventDefault();
    this.setState({ collectedShipTo: true });
    $.post("http://localhost:5000/update", {
      id: this.props.id,
      shipToLine1: document.getElementById("shipToLine1").value,
      shipToLine2: document.getElementById("shipToLine2").value,
      shipToCity: document.getElementById("shipToCity").value,
      shipToState: document.getElementById("shipToState").value,
      shipToZipcode: document.getElementById("shipToZipcode").value
    }, function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    });
  }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { id: 'checkout2' },
        React.createElement(
          'form',
          null,
          React.createElement(
            'h3',
            null,
            'Please enter your address.'
          ),
          React.createElement(
            'label',
            null,
            'Line 1:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'shipToLine1', name: 'line1' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Line 2:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'shipToLine2', name: 'line2' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'City:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'shipToCity', name: 'city' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'State:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'shipToState', name: 'state' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'Zip Code:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'shipToZipcode', name: 'zipcode' }),
          React.createElement('br', null),
          React.createElement('input', { type: 'submit', value: 'Next', onClick: this.nextButtonClick })
        )
      ),
      React.createElement(Checkout3, { collectedShipTo: this.state.collectedShipTo, id: this.props.id })
    );
  }
}

function Checkout2(props) {
  console.log('props.createdAccount: ', props.createdAccount);
  if (props.createdAccount) {
    $('#checkout1').hide();
    console.log(props.id);
    return React.createElement(CollectShipTo, { id: props.id });
  }
  return null;
}

ReactDOM.render(React.createElement(Checkout2, null), document.getElementById('app'));

//CreateAccount component
class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAccount: false
    };
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }
  nextButtonClick(e) {
    e.preventDefault();
    this.setState({ createdAccount: true });
    $.post("http://localhost:5000/update", {
      id: this.props.id,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    }, function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    });
  }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { id: 'checkout1' },
        React.createElement(
          'form',
          null,
          React.createElement(
            'h3',
            null,
            'To create a new account, please enter your account inforamtion.'
          ),
          React.createElement(
            'label',
            null,
            'Name:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'name', name: 'name' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'email:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'email', name: 'email' }),
          React.createElement('br', null),
          React.createElement(
            'label',
            null,
            'password:'
          ),
          React.createElement('br', null),
          React.createElement('input', { type: 'text', id: 'password', name: 'password' }),
          React.createElement('br', null),
          React.createElement('input', { type: 'submit', value: 'Next', onClick: this.nextButtonClick })
        )
      ),
      React.createElement(Checkout2, { createdAccount: this.state.createdAccount, id: this.props.id })
    );
  }
}

function Checkout1(props) {
  console.log('props.startedCheckout: ', props.startedCheckout);
  console.log('props.id: ', props.id);
  if (props.startedCheckout) {
    $('#home').hide();

    return React.createElement(CreateAccount, { id: props.id });
  }
  return null;
}

ReactDOM.render(React.createElement(Checkout1, null), document.getElementById('app'));

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
  checkoutButtonClick(e) {
    e.preventDefault();
    this.setState({ startedCheckout: true });
    //AJAX POST
    $.post("http://localhost:5000/create", {
      action: "create"
    }, function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
      this.setState({ id: data });
    }.bind(this));
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { id: 'home' },
        React.createElement(
          'h1',
          null,
          'Home'
        ),
        React.createElement(
          'button',
          { onClick: this.checkoutButtonClick },
          'Checkout'
        )
      ),
      React.createElement(Checkout1, { startedCheckout: this.state.startedCheckout, id: this.state.id })
    );
  }
}
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkNvbmZpcm1hdGlvbiIsIkNoZWNrb3V0NCIsInByb3BzIiwiY29uc29sZSIsImxvZyIsImNvbGxlY3RlZFBheW1lbnRNZXRob2QiLCIkIiwic2hvdyIsImlkIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiQ29sbGVjdGVkUGF5bWVudE1ldGhvZCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJzdGF0ZSIsIm5leHRCdXR0b25DbGljayIsImJpbmQiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZXRTdGF0ZSIsInBvc3QiLCJjcmVkaXRDYXJkTnVtYmVyIiwidmFsdWUiLCJleHBpcnlEYXRlIiwiQ1ZWIiwiYmlsbGluZ1ppcGNvZGUiLCJkYXRhIiwic3RhdHVzIiwiQ2hlY2tvdXQzIiwiY29sbGVjdGVkU2hpcFRvIiwiaGlkZSIsIkNvbGxlY3RTaGlwVG8iLCJzaGlwVG9MaW5lMSIsInNoaXBUb0xpbmUyIiwic2hpcFRvQ2l0eSIsInNoaXBUb1N0YXRlIiwic2hpcFRvWmlwY29kZSIsIkNoZWNrb3V0MiIsImNyZWF0ZWRBY2NvdW50IiwiQ3JlYXRlQWNjb3VudCIsIm5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiQ2hlY2tvdXQxIiwic3RhcnRlZENoZWNrb3V0IiwiQXBwIiwiY2hlY2tvdXRCdXR0b25DbGljayIsImFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7QUFFQTtBQUNBLElBQUlBLGVBQWUsTUFDakI7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQURGO0FBRUU7QUFBQTtBQUFBLE1BQVEsTUFBSyxRQUFiO0FBQUE7QUFBQTtBQUZGLENBREY7O0FBT0EsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBeUI7QUFDdkJDLFVBQVFDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQ0YsTUFBTUcsc0JBQTVDO0FBQ0EsTUFBSUgsTUFBTUcsc0JBQVYsRUFBa0M7QUFDaENDLE1BQUUsWUFBRixFQUFnQkMsSUFBaEI7QUFDQUQsTUFBRSxZQUFGLEVBQWdCQyxJQUFoQjtBQUNBRCxNQUFFLFlBQUYsRUFBZ0JDLElBQWhCO0FBQ0EsV0FBTyxvQkFBQyxZQUFELElBQWMsSUFBSUwsTUFBTU0sRUFBeEIsR0FBUDtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRURDLFNBQVNDLE1BQVQsQ0FDRSxvQkFBQyxTQUFELE9BREYsRUFFRUMsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUZGOztBQUtBO0FBQ0EsTUFBTUMsc0JBQU4sU0FBcUNDLE1BQU1DLFNBQTNDLENBQXFEO0FBQ25EQyxjQUFZZCxLQUFaLEVBQW1CO0FBQ2pCLFVBQU1BLEtBQU47QUFDQSxTQUFLZSxLQUFMLEdBQWE7QUFDWFosOEJBQXdCO0FBRGIsS0FBYjtBQUdBLFNBQUthLGVBQUwsR0FBdUIsS0FBS0EsZUFBTCxDQUFxQkMsSUFBckIsQ0FBMEIsSUFBMUIsQ0FBdkI7QUFDRDtBQUNERCxrQkFBZ0JFLENBQWhCLEVBQWtCO0FBQ2hCQSxNQUFFQyxjQUFGO0FBQ0EsU0FBS0MsUUFBTCxDQUFjLEVBQUNqQix3QkFBd0IsSUFBekIsRUFBZDtBQUNBQyxNQUFFaUIsSUFBRixDQUFPLDhCQUFQLEVBQ0E7QUFDRWYsVUFBSSxLQUFLTixLQUFMLENBQVdNLEVBRGpCO0FBRUVnQix3QkFBa0JiLFNBQVNDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDYSxLQUZoRTtBQUdFQyxrQkFBWWYsU0FBU0MsY0FBVCxDQUF3QixZQUF4QixFQUFzQ2EsS0FIcEQ7QUFJRUUsV0FBS2hCLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsRUFBK0JhLEtBSnRDO0FBS0VHLHNCQUFnQmpCLFNBQVNDLGNBQVQsQ0FBd0IsZ0JBQXhCLEVBQTBDYTtBQUw1RCxLQURBLEVBUUEsVUFBU0ksSUFBVCxFQUFlQyxNQUFmLEVBQXNCO0FBQ3BCM0IsY0FBUUMsR0FBUixDQUFZLFdBQVd5QixJQUFYLEdBQWtCLFlBQWxCLEdBQWlDQyxNQUE3QztBQUNELEtBVkQ7QUFXRDtBQUNEcEIsV0FBUztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFVBQUssSUFBRyxXQUFSO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUZGO0FBRStCLHlDQUYvQjtBQUdFLHlDQUFPLE1BQUssTUFBWixFQUFtQixJQUFHLGtCQUF0QixFQUF5QyxNQUFLLGtCQUE5QyxHQUhGO0FBR3FFLHlDQUhyRTtBQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FKRjtBQUk2Qix5Q0FKN0I7QUFLRSx5Q0FBTyxNQUFLLE1BQVosRUFBbUIsSUFBRyxZQUF0QixFQUFtQyxNQUFLLFlBQXhDLEdBTEY7QUFLeUQseUNBTHpEO0FBTUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQU5GO0FBTXFCLHlDQU5yQjtBQU9FLHlDQUFPLE1BQUssTUFBWixFQUFtQixJQUFHLEtBQXRCLEVBQTRCLE1BQUssS0FBakMsR0FQRjtBQU8yQyx5Q0FQM0M7QUFRRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBUkY7QUFRa0MseUNBUmxDO0FBU0UseUNBQU8sTUFBSyxNQUFaLEVBQW1CLElBQUcsZ0JBQXRCLEVBQXVDLE1BQUssZ0JBQTVDLEdBVEY7QUFTaUUseUNBVGpFO0FBVUUseUNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sTUFBM0IsRUFBa0MsU0FBUyxLQUFLUSxlQUFoRDtBQVZGO0FBREYsT0FERjtBQWVFLDBCQUFDLFNBQUQsSUFBVyx3QkFBd0IsS0FBS0QsS0FBTCxDQUFXWixzQkFBOUMsRUFBc0UsSUFBSSxLQUFLSCxLQUFMLENBQVdNLEVBQXJGO0FBZkYsS0FERjtBQW1CRDtBQTNDa0Q7O0FBOENyRCxTQUFTdUIsU0FBVCxDQUFtQjdCLEtBQW5CLEVBQXlCO0FBQ3ZCQyxVQUFRQyxHQUFSLENBQVksd0JBQVosRUFBc0NGLE1BQU04QixlQUE1QztBQUNBLE1BQUk5QixNQUFNOEIsZUFBVixFQUEyQjtBQUN6QjFCLE1BQUUsWUFBRixFQUFnQjJCLElBQWhCO0FBQ0EsV0FBTyxvQkFBQyxzQkFBRCxJQUF3QixJQUFJL0IsTUFBTU0sRUFBbEMsR0FBUDtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRURDLFNBQVNDLE1BQVQsQ0FDRSxvQkFBQyxTQUFELE9BREYsRUFFRUMsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUZGOztBQUtBOztBQUVBLE1BQU1zQixhQUFOLFNBQTRCcEIsTUFBTUMsU0FBbEMsQ0FBNEM7QUFDMUNDLGNBQVlkLEtBQVosRUFBbUI7QUFDakIsVUFBTUEsS0FBTjtBQUNBLFNBQUtlLEtBQUwsR0FBYTtBQUNYZSx1QkFBaUI7QUFETixLQUFiO0FBR0EsU0FBS2QsZUFBTCxHQUF1QixLQUFLQSxlQUFMLENBQXFCQyxJQUFyQixDQUEwQixJQUExQixDQUF2QjtBQUNEO0FBQ0RELGtCQUFnQkUsQ0FBaEIsRUFBa0I7QUFDaEJBLE1BQUVDLGNBQUY7QUFDQSxTQUFLQyxRQUFMLENBQWMsRUFBQ1UsaUJBQWlCLElBQWxCLEVBQWQ7QUFDQTFCLE1BQUVpQixJQUFGLENBQU8sOEJBQVAsRUFDQTtBQUNFZixVQUFJLEtBQUtOLEtBQUwsQ0FBV00sRUFEakI7QUFFRTJCLG1CQUFheEIsU0FBU0MsY0FBVCxDQUF3QixhQUF4QixFQUF1Q2EsS0FGdEQ7QUFHRVcsbUJBQWF6QixTQUFTQyxjQUFULENBQXdCLGFBQXhCLEVBQXVDYSxLQUh0RDtBQUlFWSxrQkFBWTFCLFNBQVNDLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0NhLEtBSnBEO0FBS0VhLG1CQUFhM0IsU0FBU0MsY0FBVCxDQUF3QixhQUF4QixFQUF1Q2EsS0FMdEQ7QUFNRWMscUJBQWU1QixTQUFTQyxjQUFULENBQXdCLGVBQXhCLEVBQXlDYTtBQU4xRCxLQURBLEVBU0EsVUFBU0ksSUFBVCxFQUFlQyxNQUFmLEVBQXNCO0FBQ3BCM0IsY0FBUUMsR0FBUixDQUFZLFdBQVd5QixJQUFYLEdBQWtCLFlBQWxCLEdBQWlDQyxNQUE3QztBQUNELEtBWEQ7QUFZRDtBQUNEcEIsV0FBUztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFVBQUssSUFBRyxXQUFSO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUZGO0FBRXdCLHlDQUZ4QjtBQUdFLHlDQUFPLE1BQUssTUFBWixFQUFtQixJQUFHLGFBQXRCLEVBQW9DLE1BQUssT0FBekMsR0FIRjtBQUdxRCx5Q0FIckQ7QUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBSkY7QUFJd0IseUNBSnhCO0FBS0UseUNBQU8sTUFBSyxNQUFaLEVBQW1CLElBQUcsYUFBdEIsRUFBb0MsTUFBSyxPQUF6QyxHQUxGO0FBS3FELHlDQUxyRDtBQU1FO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FORjtBQU1zQix5Q0FOdEI7QUFPRSx5Q0FBTyxNQUFLLE1BQVosRUFBbUIsSUFBRyxZQUF0QixFQUFtQyxNQUFLLE1BQXhDLEdBUEY7QUFPbUQseUNBUG5EO0FBUUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQVJGO0FBUXVCLHlDQVJ2QjtBQVNFLHlDQUFPLE1BQUssTUFBWixFQUFtQixJQUFHLGFBQXRCLEVBQW9DLE1BQUssT0FBekMsR0FURjtBQVNxRCx5Q0FUckQ7QUFVRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBVkY7QUFVMEIseUNBVjFCO0FBV0UseUNBQU8sTUFBSyxNQUFaLEVBQW1CLElBQUcsZUFBdEIsRUFBc0MsTUFBSyxTQUEzQyxHQVhGO0FBV3lELHlDQVh6RDtBQVlFLHlDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLE1BQTNCLEVBQWtDLFNBQVMsS0FBS1EsZUFBaEQ7QUFaRjtBQURGLE9BREY7QUFpQkUsMEJBQUMsU0FBRCxJQUFXLGlCQUFpQixLQUFLRCxLQUFMLENBQVdlLGVBQXZDLEVBQXdELElBQUksS0FBSzlCLEtBQUwsQ0FBV00sRUFBdkU7QUFqQkYsS0FERjtBQXFCRDtBQTlDeUM7O0FBa0Q1QyxTQUFTZ0MsU0FBVCxDQUFtQnRDLEtBQW5CLEVBQXlCO0FBQ3ZCQyxVQUFRQyxHQUFSLENBQVksd0JBQVosRUFBc0NGLE1BQU11QyxjQUE1QztBQUNBLE1BQUl2QyxNQUFNdUMsY0FBVixFQUEwQjtBQUN4Qm5DLE1BQUUsWUFBRixFQUFnQjJCLElBQWhCO0FBQ0E5QixZQUFRQyxHQUFSLENBQVlGLE1BQU1NLEVBQWxCO0FBQ0EsV0FBTyxvQkFBQyxhQUFELElBQWUsSUFBSU4sTUFBTU0sRUFBekIsR0FBUDtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRURDLFNBQVNDLE1BQVQsQ0FDRSxvQkFBQyxTQUFELE9BREYsRUFFRUMsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUZGOztBQUtBO0FBQ0EsTUFBTThCLGFBQU4sU0FBNEI1QixNQUFNQyxTQUFsQyxDQUE0QztBQUMxQ0MsY0FBWWQsS0FBWixFQUFtQjtBQUNqQixVQUFNQSxLQUFOO0FBQ0EsU0FBS2UsS0FBTCxHQUFhO0FBQ1h3QixzQkFBZ0I7QUFETCxLQUFiO0FBR0EsU0FBS3ZCLGVBQUwsR0FBdUIsS0FBS0EsZUFBTCxDQUFxQkMsSUFBckIsQ0FBMEIsSUFBMUIsQ0FBdkI7QUFDRDtBQUNERCxrQkFBZ0JFLENBQWhCLEVBQWtCO0FBQ2hCQSxNQUFFQyxjQUFGO0FBQ0EsU0FBS0MsUUFBTCxDQUFjLEVBQUNtQixnQkFBZ0IsSUFBakIsRUFBZDtBQUNBbkMsTUFBRWlCLElBQUYsQ0FBTyw4QkFBUCxFQUNBO0FBQ0VmLFVBQUksS0FBS04sS0FBTCxDQUFXTSxFQURqQjtBQUVFbUMsWUFBTWhDLFNBQVNDLGNBQVQsQ0FBd0IsTUFBeEIsRUFBZ0NhLEtBRnhDO0FBR0VtQixhQUFPakMsU0FBU0MsY0FBVCxDQUF3QixPQUF4QixFQUFpQ2EsS0FIMUM7QUFJRW9CLGdCQUFVbEMsU0FBU0MsY0FBVCxDQUF3QixVQUF4QixFQUFvQ2E7QUFKaEQsS0FEQSxFQU9BLFVBQVNJLElBQVQsRUFBZUMsTUFBZixFQUFzQjtBQUNwQjNCLGNBQVFDLEdBQVIsQ0FBWSxXQUFXeUIsSUFBWCxHQUFrQixZQUFsQixHQUFpQ0MsTUFBN0M7QUFDRCxLQVREO0FBVUQ7QUFDRHBCLFdBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxVQUFLLElBQUcsV0FBUjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FGRjtBQUVzQix5Q0FGdEI7QUFHRSx5Q0FBTyxNQUFLLE1BQVosRUFBbUIsSUFBRyxNQUF0QixFQUE2QixNQUFLLE1BQWxDLEdBSEY7QUFHNkMseUNBSDdDO0FBSUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUpGO0FBSXVCLHlDQUp2QjtBQUtFLHlDQUFPLE1BQUssTUFBWixFQUFtQixJQUFHLE9BQXRCLEVBQThCLE1BQUssT0FBbkMsR0FMRjtBQUsrQyx5Q0FML0M7QUFNRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBTkY7QUFNMEIseUNBTjFCO0FBT0UseUNBQU8sTUFBSyxNQUFaLEVBQW1CLElBQUcsVUFBdEIsRUFBaUMsTUFBSyxVQUF0QyxHQVBGO0FBT3FELHlDQVByRDtBQVFFLHlDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLE1BQTNCLEVBQWtDLFNBQVMsS0FBS1EsZUFBaEQ7QUFSRjtBQURGLE9BREY7QUFhRSwwQkFBQyxTQUFELElBQVcsZ0JBQWdCLEtBQUtELEtBQUwsQ0FBV3dCLGNBQXRDLEVBQXNELElBQUksS0FBS3ZDLEtBQUwsQ0FBV00sRUFBckU7QUFiRixLQURGO0FBaUJEO0FBeEN5Qzs7QUEyQzVDLFNBQVNzQyxTQUFULENBQW1CNUMsS0FBbkIsRUFBeUI7QUFDdkJDLFVBQVFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1Q0YsTUFBTTZDLGVBQTdDO0FBQ0E1QyxVQUFRQyxHQUFSLENBQVksWUFBWixFQUEwQkYsTUFBTU0sRUFBaEM7QUFDQSxNQUFJTixNQUFNNkMsZUFBVixFQUEyQjtBQUN6QnpDLE1BQUUsT0FBRixFQUFXMkIsSUFBWDs7QUFFQSxXQUFPLG9CQUFDLGFBQUQsSUFBZSxJQUFJL0IsTUFBTU0sRUFBekIsR0FBUDtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRURDLFNBQVNDLE1BQVQsQ0FDRSxvQkFBQyxTQUFELE9BREYsRUFFRUMsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUZGOztBQUtBO0FBQ0EsTUFBTW9DLEdBQU4sU0FBa0JsQyxNQUFNQyxTQUF4QixDQUFrQztBQUNoQ0MsY0FBWWQsS0FBWixFQUFtQjtBQUNqQixVQUFNQSxLQUFOO0FBQ0EsU0FBS2UsS0FBTCxHQUFhO0FBQ1g4Qix1QkFBaUIsS0FETjtBQUVYdkMsVUFBSTtBQUZPLEtBQWI7QUFJQSxTQUFLeUMsbUJBQUwsR0FBMkIsS0FBS0EsbUJBQUwsQ0FBeUI5QixJQUF6QixDQUE4QixJQUE5QixDQUEzQjtBQUNBO0FBQ0Y4QixzQkFBb0I3QixDQUFwQixFQUFzQjtBQUNwQkEsTUFBRUMsY0FBRjtBQUNBLFNBQUtDLFFBQUwsQ0FBYyxFQUFDeUIsaUJBQWlCLElBQWxCLEVBQWQ7QUFDQTtBQUNBekMsTUFBRWlCLElBQUYsQ0FBTyw4QkFBUCxFQUNBO0FBQ0UyQixjQUFRO0FBRFYsS0FEQSxFQUlBLFVBQVNyQixJQUFULEVBQWVDLE1BQWYsRUFBc0I7QUFDcEIzQixjQUFRQyxHQUFSLENBQVksV0FBV3lCLElBQVgsR0FBa0IsWUFBbEIsR0FBaUNDLE1BQTdDO0FBQ0EsV0FBS1IsUUFBTCxDQUFjLEVBQUNkLElBQUlxQixJQUFMLEVBQWQ7QUFDRCxLQUhELENBR0VWLElBSEYsQ0FHTyxJQUhQLENBSkE7QUFRRDs7QUFFRFQsV0FBUztBQUNQLFdBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFVBQUssSUFBRyxNQUFSO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQVEsU0FBUyxLQUFLdUMsbUJBQXRCO0FBQUE7QUFBQTtBQUZGLE9BREY7QUFLSSwwQkFBQyxTQUFELElBQVcsaUJBQWlCLEtBQUtoQyxLQUFMLENBQVc4QixlQUF2QyxFQUF3RCxJQUFJLEtBQUs5QixLQUFMLENBQVdULEVBQXZFO0FBTEosS0FERjtBQVNEO0FBakMrQjtBQW1DbENDLFNBQVNDLE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUF5QkMsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUF6QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLy9Db25maXJtYXRpb24gcGFnZVxudmFyIENvbmZpcm1hdGlvbiA9ICgpID0+IChcbiAgPGRpdj5cbiAgICA8aDM+UGxlYXNlIGNvbmZpcm0geW91ciBvcmRlciE8L2gzPlxuICAgIDxidXR0b24gdHlwZT0nc3VibWl0Jz5QdXJjaGFzZTwvYnV0dG9uPlxuICA8L2Rpdj5cbilcblxuZnVuY3Rpb24gQ2hlY2tvdXQ0KHByb3BzKXtcbiAgY29uc29sZS5sb2coJ3Byb3BzLmNvbGxlY3RlZFNoaXBUbzonLCBwcm9wcy5jb2xsZWN0ZWRQYXltZW50TWV0aG9kKVxuICBpZiAocHJvcHMuY29sbGVjdGVkUGF5bWVudE1ldGhvZCkge1xuICAgICQoJyNjaGVja291dDEnKS5zaG93KClcbiAgICAkKCcjY2hlY2tvdXQyJykuc2hvdygpXG4gICAgJCgnI2NoZWNrb3V0MycpLnNob3coKVxuICAgIHJldHVybiA8Q29uZmlybWF0aW9uIGlkPXtwcm9wcy5pZH0vPjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuUmVhY3RET00ucmVuZGVyKFxuICA8Q2hlY2tvdXQ0IC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbik7XG5cbi8vQ29sbGVjdFBheW1lbnRNZXRob2QgY29tcG9uZW50XG5jbGFzcyBDb2xsZWN0ZWRQYXltZW50TWV0aG9kIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNvbGxlY3RlZFBheW1lbnRNZXRob2Q6IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLm5leHRCdXR0b25DbGljayA9IHRoaXMubmV4dEJ1dHRvbkNsaWNrLmJpbmQodGhpcyk7XG4gIH1cbiAgbmV4dEJ1dHRvbkNsaWNrKGUpeyBcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y29sbGVjdGVkUGF5bWVudE1ldGhvZDogdHJ1ZX0pO1xuICAgICQucG9zdChcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC91cGRhdGVcIixcbiAgICB7XG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIGNyZWRpdENhcmROdW1iZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlZGl0Q2FyZE51bWJlclwiKS52YWx1ZSxcbiAgICAgIGV4cGlyeURhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwaXJ5RGF0ZVwiKS52YWx1ZSxcbiAgICAgIENWVjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDVlZcIikudmFsdWUsXG4gICAgICBiaWxsaW5nWmlwY29kZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaWxsaW5nWmlwY29kZVwiKS52YWx1ZVxuICAgIH0sXG4gICAgZnVuY3Rpb24oZGF0YSwgc3RhdHVzKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiRGF0YTogXCIgKyBkYXRhICsgXCJcXG5TdGF0dXM6IFwiICsgc3RhdHVzKTtcbiAgICB9KTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJjaGVja291dDNcIj5cbiAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgIDxoMz5QbGVhc2UgZW50ZXIgeW91ciBwYXltZW50IGluZm9ybWF0aW9uLjwvaDM+XG4gICAgICAgICAgICA8bGFiZWw+Q3JlZGl0IENhcmQgIzo8L2xhYmVsPjxici8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImNyZWRpdENhcmROdW1iZXJcIiBuYW1lPVwiY3JlZGl0Q2FyZE51bWJlclwiIC8+PGJyLz5cbiAgICAgICAgICAgIDxsYWJlbD5FeHBpcnkgRGF0ZTo8L2xhYmVsPjxici8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImV4cGlyeURhdGVcIiBuYW1lPVwiZXhwaXJ5RGF0ZVwiIC8+PGJyLz5cbiAgICAgICAgICAgIDxsYWJlbD5DVlY6PC9sYWJlbD48YnIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJDVlZcIiBuYW1lPVwiQ1ZWXCIgLz48YnIvPlxuICAgICAgICAgICAgPGxhYmVsPkJpbGxpbmcgWmlwIENvZGU6PC9sYWJlbD48YnIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJiaWxsaW5nWmlwY29kZVwiIG5hbWU9XCJiaWxsaW5nWmlwY29kZVwiIC8+PGJyLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXh0XCIgb25DbGljaz17dGhpcy5uZXh0QnV0dG9uQ2xpY2t9Lz4gXG4gICAgICAgICAgPC9mb3JtPiBcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxDaGVja291dDQgY29sbGVjdGVkUGF5bWVudE1ldGhvZD17dGhpcy5zdGF0ZS5jb2xsZWN0ZWRQYXltZW50TWV0aG9kfSBpZD17dGhpcy5wcm9wcy5pZH0vPiBcbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gQ2hlY2tvdXQzKHByb3BzKXtcbiAgY29uc29sZS5sb2coJ3Byb3BzLmNvbGxlY3RlZFNoaXBUbzonLCBwcm9wcy5jb2xsZWN0ZWRTaGlwVG8pXG4gIGlmIChwcm9wcy5jb2xsZWN0ZWRTaGlwVG8pIHtcbiAgICAkKCcjY2hlY2tvdXQyJykuaGlkZSgpXG4gICAgcmV0dXJuIDxDb2xsZWN0ZWRQYXltZW50TWV0aG9kIGlkPXtwcm9wcy5pZH0vPjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuUmVhY3RET00ucmVuZGVyKFxuICA8Q2hlY2tvdXQzIC8+LFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbik7XG5cbi8vQ29sbGVjdFNoaXBUbyBjb21wb25lbnRcblxuY2xhc3MgQ29sbGVjdFNoaXBUbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb2xsZWN0ZWRTaGlwVG86IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLm5leHRCdXR0b25DbGljayA9IHRoaXMubmV4dEJ1dHRvbkNsaWNrLmJpbmQodGhpcyk7XG4gIH1cbiAgbmV4dEJ1dHRvbkNsaWNrKGUpeyBcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y29sbGVjdGVkU2hpcFRvOiB0cnVlfSk7XG4gICAgJC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL3VwZGF0ZVwiLFxuICAgIHtcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgc2hpcFRvTGluZTE6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcFRvTGluZTFcIikudmFsdWUsXG4gICAgICBzaGlwVG9MaW5lMjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwVG9MaW5lMlwiKS52YWx1ZSxcbiAgICAgIHNoaXBUb0NpdHk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcFRvQ2l0eVwiKS52YWx1ZSxcbiAgICAgIHNoaXBUb1N0YXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBUb1N0YXRlXCIpLnZhbHVlLFxuICAgICAgc2hpcFRvWmlwY29kZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwVG9aaXBjb2RlXCIpLnZhbHVlXG4gICAgfSxcbiAgICBmdW5jdGlvbihkYXRhLCBzdGF0dXMpe1xuICAgICAgY29uc29sZS5sb2coXCJEYXRhOiBcIiArIGRhdGEgKyBcIlxcblN0YXR1czogXCIgKyBzdGF0dXMpO1xuICAgIH0pO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBpZD1cImNoZWNrb3V0MlwiPlxuICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgPGgzPlBsZWFzZSBlbnRlciB5b3VyIGFkZHJlc3MuPC9oMz5cbiAgICAgICAgICAgIDxsYWJlbD5MaW5lIDE6PC9sYWJlbD48YnIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJzaGlwVG9MaW5lMVwiIG5hbWU9XCJsaW5lMVwiIC8+PGJyLz5cbiAgICAgICAgICAgIDxsYWJlbD5MaW5lIDI6PC9sYWJlbD48YnIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJzaGlwVG9MaW5lMlwiIG5hbWU9XCJsaW5lMlwiIC8+PGJyLz5cbiAgICAgICAgICAgIDxsYWJlbD5DaXR5OjwvbGFiZWw+PGJyLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwic2hpcFRvQ2l0eVwiIG5hbWU9XCJjaXR5XCIgLz48YnIvPlxuICAgICAgICAgICAgPGxhYmVsPlN0YXRlOjwvbGFiZWw+PGJyLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwic2hpcFRvU3RhdGVcIiBuYW1lPVwic3RhdGVcIiAvPjxici8+XG4gICAgICAgICAgICA8bGFiZWw+WmlwIENvZGU6PC9sYWJlbD48YnIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJzaGlwVG9aaXBjb2RlXCIgbmFtZT1cInppcGNvZGVcIiAvPjxici8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTmV4dFwiIG9uQ2xpY2s9e3RoaXMubmV4dEJ1dHRvbkNsaWNrfS8+IFxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxDaGVja291dDMgY29sbGVjdGVkU2hpcFRvPXt0aGlzLnN0YXRlLmNvbGxlY3RlZFNoaXBUb30gaWQ9e3RoaXMucHJvcHMuaWR9Lz4gXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblxuZnVuY3Rpb24gQ2hlY2tvdXQyKHByb3BzKXtcbiAgY29uc29sZS5sb2coJ3Byb3BzLmNyZWF0ZWRBY2NvdW50OiAnLCBwcm9wcy5jcmVhdGVkQWNjb3VudClcbiAgaWYgKHByb3BzLmNyZWF0ZWRBY2NvdW50KSB7XG4gICAgJCgnI2NoZWNrb3V0MScpLmhpZGUoKVxuICAgIGNvbnNvbGUubG9nKHByb3BzLmlkKVxuICAgIHJldHVybiA8Q29sbGVjdFNoaXBUbyBpZD17cHJvcHMuaWR9Lz47XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPENoZWNrb3V0MiAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4pO1xuXG4vL0NyZWF0ZUFjY291bnQgY29tcG9uZW50XG5jbGFzcyBDcmVhdGVBY2NvdW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNyZWF0ZWRBY2NvdW50OiBmYWxzZVxuICAgIH07XG4gICAgdGhpcy5uZXh0QnV0dG9uQ2xpY2sgPSB0aGlzLm5leHRCdXR0b25DbGljay5iaW5kKHRoaXMpO1xuICB9XG4gIG5leHRCdXR0b25DbGljayhlKXsgXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2NyZWF0ZWRBY2NvdW50OiB0cnVlfSk7XG4gICAgJC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL3VwZGF0ZVwiLFxuICAgIHtcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxuICAgICAgbmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lXCIpLnZhbHVlLFxuICAgICAgZW1haWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWUsXG4gICAgICBwYXNzd29yZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZVxuICAgIH0sXG4gICAgZnVuY3Rpb24oZGF0YSwgc3RhdHVzKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiRGF0YTogXCIgKyBkYXRhICsgXCJcXG5TdGF0dXM6IFwiICsgc3RhdHVzKTtcbiAgICB9KTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJjaGVja291dDFcIj5cbiAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgIDxoMz5UbyBjcmVhdGUgYSBuZXcgYWNjb3VudCwgcGxlYXNlIGVudGVyIHlvdXIgYWNjb3VudCBpbmZvcmFtdGlvbi48L2gzPlxuICAgICAgICAgICAgPGxhYmVsPk5hbWU6PC9sYWJlbD48YnIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJuYW1lXCIgbmFtZT1cIm5hbWVcIiAvPjxici8+XG4gICAgICAgICAgICA8bGFiZWw+ZW1haWw6PC9sYWJlbD48YnIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbWFpbFwiIG5hbWU9XCJlbWFpbFwiIC8+PGJyLz5cbiAgICAgICAgICAgIDxsYWJlbD5wYXNzd29yZDo8L2xhYmVsPjxici8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgLz48YnIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk5leHRcIiBvbkNsaWNrPXt0aGlzLm5leHRCdXR0b25DbGlja30vPlxuICAgICAgICAgIDwvZm9ybT4gXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8Q2hlY2tvdXQyIGNyZWF0ZWRBY2NvdW50PXt0aGlzLnN0YXRlLmNyZWF0ZWRBY2NvdW50fSBpZD17dGhpcy5wcm9wcy5pZH0vPiBcbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gQ2hlY2tvdXQxKHByb3BzKXtcbiAgY29uc29sZS5sb2coJ3Byb3BzLnN0YXJ0ZWRDaGVja291dDogJywgcHJvcHMuc3RhcnRlZENoZWNrb3V0KVxuICBjb25zb2xlLmxvZygncHJvcHMuaWQ6ICcsIHByb3BzLmlkKVxuICBpZiAocHJvcHMuc3RhcnRlZENoZWNrb3V0KSB7XG4gICAgJCgnI2hvbWUnKS5oaWRlKClcbiAgICBcbiAgICByZXR1cm4gPENyZWF0ZUFjY291bnQgaWQ9e3Byb3BzLmlkfS8+O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5SZWFjdERPTS5yZW5kZXIoXG4gIDxDaGVja291dDEgLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuKTtcblxuLy9BcHAgQ29tcG9uZW50XG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhcnRlZENoZWNrb3V0OiBmYWxzZSxcbiAgICAgIGlkOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLmNoZWNrb3V0QnV0dG9uQ2xpY2sgPSB0aGlzLmNoZWNrb3V0QnV0dG9uQ2xpY2suYmluZCh0aGlzKTtcbiAgIH1cbiAgY2hlY2tvdXRCdXR0b25DbGljayhlKXsgXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe3N0YXJ0ZWRDaGVja291dDogdHJ1ZX0pO1xuICAgIC8vQUpBWCBQT1NUXG4gICAgJC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2NyZWF0ZVwiLFxuICAgIHtcbiAgICAgIGFjdGlvbjogXCJjcmVhdGVcIixcbiAgICB9LFxuICAgIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cyl7XG4gICAgICBjb25zb2xlLmxvZyhcIkRhdGE6IFwiICsgZGF0YSArIFwiXFxuU3RhdHVzOiBcIiArIHN0YXR1cyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpZDogZGF0YX0pO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJob21lXCI+XG4gICAgICAgICAgPGgxPkhvbWU8L2gxPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5jaGVja291dEJ1dHRvbkNsaWNrfT5DaGVja291dDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8Q2hlY2tvdXQxIHN0YXJ0ZWRDaGVja291dD17dGhpcy5zdGF0ZS5zdGFydGVkQ2hlY2tvdXR9IGlkPXt0aGlzLnN0YXRlLmlkfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSlcblxuXG4iXX0=