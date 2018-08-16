import React from 'react'
import {Route} from "react-router-dom";
import CourseService from "../../services/CourseService";
import ModuleList from "../modules/ModuleList"
import LessonList from "../lessons/LessonList";
import WidgetListContainer from "../widgets/WidgetListContainer";

export default class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            title: ''
        };

        this.editedName = "";
        this.courseService = CourseService.instance;
        this.componentDidMount = this.componentDidMount.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        this.setState({courseId: this.props.match.params.courseId})
        this.courseService.findCourseById(this.props.match.params.courseId)
            .then((course) => this.setState({title: course.title}));
    }

    titleChanged(event) {
        this.editedName = event.target.value;
    }

    updateCourse() {
        this.courseService.updateCourse(this.state.courseId, this.state)
        ;
    }

    render() {
        return (
            <div>
                <div className='card-header'>
                    <h2>Course Editor: {this.state.title}</h2>
                    <div className="row">
                        <input onChange={this.titleChanged}
                               className='form-control'
                               placeholder='New Title'/>
                        <button className="btn btn-outline-secondary"
                                onClick={this.updateCourse}>
                            <i className="fa fa-check">
                            </i>
                        </button>
                    </div>
                </div>
                <div className="row" style={{paddingTop: 20}}>
                    <div className="col-md-4">
                        <ModuleList courseId={this.state.courseId}/>
                    </div>
                    <div className="col-md-8">
                        <Route path="/course/:courseId/module/:moduleId"
                               component={LessonList}>
                        </Route>
                        <Route
                            path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                            component={WidgetListContainer}>
                        </Route>
                    </div>
                </div>
                <div>
                    <br></br>
                </div>
            </div>
        )
    }
}
