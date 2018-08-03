import React from 'react'
import LessonService from "../../services/LessonService";
import LessonRow from "./LessonRow";

export default class LessonList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moduleId: props.match.params.moduleId,
            newLesson: {title: ''},
            lessons: [],
            selectedLessonIndex: 0
        };

        this.lessonService = LessonService.instance;

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.findAllLessonsForModule = this.findAllLessonsForModule.bind(this);
        this.renderLessons = this.renderLessons.bind(this);
        this.render = this.render.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.rowChange = this.rowChange.bind(this);
    }

    componentDidMount() {
        this.findAllLessonsForModule(this.props.match.params.courseId, this.state.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setState({moduleId: newProps.match.params.moduleId});
        this.findAllLessonsForModule(newProps.match.params.moduleId);
    }

    findAllLessonsForModule(moduleId) {
        this.lessonService
            .findAllLessonsForModule(this.props.match.params.courseId, moduleId)
            .then((lessons) => {
                this.setState({lessons: lessons})
            });
        this.render();
    }

    rowChange() {
        this.findAllLessonsForModule(this.props.match.params.courseId,
            this.props.match.params.moduleId);
    }

    renderLessons() {
        if (this.state.lessons) {
            const rowChange = this.rowChange;
            const courseId = this.props.match.params.courseId;
            const moduleId = this.state.moduleId;
            let lessonRows = this.state.lessons.map(function (lesson) {
                return <LessonRow lesson={lesson}
                                  key={lesson.id}
                                  courseId={courseId}
                                  moduleId={moduleId}
                                  callback={rowChange}/>
            });
            return lessonRows;
        }
        return [];
    }

    titleChanged(event) {
        this.setState({newLesson: {title: event.target.value}});
    }

    createLesson() {
        this.lessonService
            .createLesson(this.props.match.params.courseId, this.state.moduleId, this.state.newLesson)
            .then(this.findAllLessonsForModule(this.props.match.params.courseId, this.state.moduleId));
        this.render();
    }

    render() {
        return (
            <div>
                <h3>Lessons for module: {this.state.moduleId}</h3>
                <input onChange={this.titleChanged}
                       placeholder="New Lesson"
                       className="form-control"/>
                <button onClick={this.createLesson} className="btn btn-primary btn-block">
                    <i className="fa fa-plus"></i>
                </button>
                <br/>
                <ul className="list-group">
                    {this.renderLessons()}
                </ul>
            </div>
        )
    }
}
