const React = require('react');
const ReactDOM  = require('react-dom/client');

function generateUrl(componentName, startDate, endDate) {
    let url;
    if (componentName === 'temperature') {
        url = `http://localhost:3000/temperature`;
    } else {
        url = `http://localhost:3000/humidity`;
    }
    url += `?startDate=${startDate}&endDate=${endDate}`;
    return url;
}

class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            results: [],
            error: null
        };
    }

    handleStartDateChange = (event) => {
        this.setState({startDate: event.target.value});
    }

    handleEndDateChange = (event) => {
        this.setState({endDate: event.target.value});
    }

    handleSubmit = (event) => {
        const url = generateUrl(this.props.name, this.state.startDate, this.state.endDate);
        fetch(url)
            .then((response) => response.json())
            .then(
                (data) => {
                    this.setState({
                        results: data.results
                    });
                    console.log(data.results);
                },
                (error) => {this.setState({error: error});}
            );
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    from <input
                            type="date"
                            name="startDate"
                            onChange={this.handleStartDateChange}
                            required
                         />
                </label>
                <label>
                    to <input
                          type="date"
                          name="endDate"
                          onChange={this.handleEndDateChange}
                          required
                       />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}


class Chart extends React.Component {
    // 构造函数添加可变属性
    constructor(props) {
        super(props);
        this.state = {results: {}};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // 添加个函数自动调用this.setState()
    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TimePicker name='temperature'/>);