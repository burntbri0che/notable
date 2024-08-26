import "./App.css";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateNote from './pages/CreateNote';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/notes/create" component={CreateNote} />
                <Route path="/notes/edit/:id" component={CreateNote} />
            </Switch>
        </Router>
    );
}

export default App;
