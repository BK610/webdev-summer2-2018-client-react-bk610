import React from 'react'
import CourseService from "../../services/CourseService";
import ModuleList from "../modules/ModuleList"
import {Route} from "react-router-dom";

export default class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            title: ''
        };

        this.service = CourseService.instance;
        this.componentDidMount = this.componentDidMount.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        this.setState({courseId: this.props.match.params.courseId})
        this.service.findCourseById(this.props.match.params.courseId)
            .then((course) => this.setState({title: course.title}));
    }

    titleChanged(event) {
        console.log(event);
        console.log(this);
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div className='card-header'>
                    <h2>Course Editor: {this.state.title}</h2>
                    <div className="row">
                        <input onChange={this.titleChanged}
                               className='form-control'
                               id='titleFld'
                               style={{width: 200}}
                               placeholder='New Title'/>
                        <button className="btn btn-outline-secondary"
                                onClick={this.updateCourse}>
                            <i className="fa fa-check">
                            </i>
                        </button>
                    </div>
                    {/*<ModuleList courseId={this.state.courseId}/>*/}
                    <Route path='/course/:courseId/module' component={ModuleList}/>
                </div>
                <div className="row" style={{paddingTop: 20}}>
                    <div className="col-4">
                        <ModuleList courseId={this.state.courseId}/>
                    </div>
                    <div className="col-8">
                        {/*<Route path="/course/:courseId/module/:moduleId"*/}
                               {/*component={LessonTabs}>*/}
                        {/*</Route>*/}
                        {/*<Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"*/}
                               {/*component={App}>*/}
                        {/*</Route>*/}
                    </div>
                </div>
                <div>
                    <br></br>
                </div>
            </div>
        )
    }
}
