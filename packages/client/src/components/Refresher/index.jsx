import { Component } from 'react';

class Refresher extends Component {
  constructor() {
    super();

    this.state = {
      token: 0,
    };
  }

  componentDidMount() {
    if (this.props.interval) {
      this.setInterval();
    }
  }

  setInterval = () => {
    this.interval = setInterval(() => {
      this.setState({
        token: Date.now(),
      });
    }, this.props.interval);
  }

  clearInterval = () => {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.interval) {
      this.clearInterval();
    } else if (this.props.interval !== prevProps.interval) {
      this.clearInterval();
      this.setInterval();
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  render() {
    const { children } = this.props;
    const { token } = this.state;

    return children({ token });
  }
}

export default Refresher;