import React  from "react";

class Demo extends React.Component {
constructor (props) {
super(props);
this.state={
a:10,
profile: {

name: "John Doe",
age: 30,
}
};
}

componentDidupdate() {


console.log("Demo component has been mounted.");

this.setState({a: this.state.a + 1});
}

render () {
return(
    <div>
<h1>Welcome to the Demo Component(this.state.a)</h1>
<p>This is a simple demonstration of a React component.{this.props.do}</p>
</div>
);
}
}

export default Demo;