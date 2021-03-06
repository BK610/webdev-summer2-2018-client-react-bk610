import React from 'react';
import CourseRow from './CourseRow'
import CourseService from '../../services/CourseService';

class CourseList extends React.Component {
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
        this.setState({
            newCourse: {
                title: event.target.value
            }
        })
    };

    deleteCourse = (courseId) => {
        this.courseService.deleteCourse(courseId)
            .then(() => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}))
    };

    createCourse = () => {
        this.courseService.createCourse(this.state.newCourse)
            .then(course => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}))
    };

    render() {
        return (
            <div>
                <h3>Course List</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Last Updated
                        </th>
                        <th>
                            Owner
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input onChange={this.formChanged} className="form-control"/>
                        </th>
                        <th></th>
                        <th></th>
                        <th>
                            <button onClick={this.createCourse} className="btn btn-primary">Add</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.courses.map((course, index) =>
                        <CourseRow key={index}
                                   deleteCourse={this.deleteCourse}
                                   course={course}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseList;
