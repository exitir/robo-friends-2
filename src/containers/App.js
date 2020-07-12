import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            stateRobotList: [],
            searchField: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                this.setState({ stateRobotList: users });
            })

    }

    onSearchChange = (event) => {
        this.setState({
            searchField: event.target.value,
        });
    }

    render() {
        const filteredRobotsList = this.state.stateRobotList.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        });
        if (!this.state.stateRobotList.length) {
            return (<div className='tc'>
                <h1 className="f1">Loading....</h1>
            </div>);
        } else {
            return (
                <div className='tc'>
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robotsList={filteredRobotsList} />
                    </Scroll>
                </div>
            );
        }
    }

}

export default App;