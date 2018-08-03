import React from  'react'

import CourseEditor from './CourseEditor';
import CourseList from './CourseList';
import CourseRow from "./CourseRow";
import CourseService from "../../services/CourseService";

export default class WhiteBoard extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {
            newCourse: {},
            courses: []
        };
    }

    componentDidMount() {
        this.courseService.findAllCourses()
            .then(courses => {
                this.setState({courses: courses});
            });
    }

    formChanged = (event) => {
        this.setState({newCourse: {
                title: event.target.value
            }})
    };

    deleteCourse = (courseId) => {
        this.courseService.deleteCourse(courseId)
            .then(() => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}))
    };

    createCourse = () => {
        this.courseService.createCourse(this.state.newCourse)
            .then(course  => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}))
    };

    render() {
        return (
            <div>
                <h2>WhiteBoard</h2>
                <CourseList/>
                {/*<CourseEditor/>*/}
            </div>
        )
    }
}