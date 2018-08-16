import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

// import HelloWorld from './hello'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import WhiteBoard from './containers/courses/WhiteBoard'
import ES6 from './containers/es6/es6'
import CourseEditor from './containers/courses/CourseEditor'
import {widgetReducer} from "./reducers/widgetReducer";
import WidgetListContainer from "./containers/widgets/WidgetListContainer";

let store = createStore(widgetReducer);

class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <Router>
                    <div className="container-fluid">
                        <Link to="/whiteboard">WhiteBoard</Link> |
                        {/*<Link to="/hello">Hello</Link> |*/}
                        {/*<Link to="/page1">Page 1</Link> |*/}
                        {/*<Link to="/page2">Page 2</Link> |*/}
                        <Link to="/es6">ES6</Link> |
                        <Link to="/widgets">Widgets</Link>
                        <Route path='/widgets' component={WidgetListContainer}/>
                        <Route path='/whiteboard' component={WhiteBoard}/>
                        {/*<Route path='/page1' component={Page1}/>*/}
                        {/*<Route path='/page2' component={Page2}/>*/}
                        {/*<Route path='/hello' component={HelloWorld}/>*/}
                        {/*<Route path='/pageParam/:something' component={PageParam}/>*/}
                        <Route path='/es6' component={ES6}/>
                        <Route path='/course/:courseId' component={CourseEditor}/>
                    </div>
                </Router>
            </Provider>
        );
    }}

    ReactDOM.render(
    <App/>,
    document.getElementById('root')
);