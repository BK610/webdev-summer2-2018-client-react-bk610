import React from 'react'
import LessonService from "../../services/LessonService";

class LessonRow extends React.Component {

    constructor(props) {
        super(props);

        this.lessonService = LessonService.instance;

        this.delete = this.delete.bind(this);
    }

    delete() {
        if(window.confirm('Delete lesson?')) {
            this.lessonService.deleteLesson(this.props.lesson.id)
                .then(this.props.callback);
        }
    }

    render() {
        return (
            <div>
                <li className="list-group-item">
                    {this.props.lesson.title}
                    <span className="float-right">
                    <button onClick={this.delete}
                            className="btn btn-secondary">
                        <i className="fa fa-trash"></i>
                    </button>
                    <button onClick={this.update}
                            className="btn btn-secondary">
                        <i className="fa fa-pencil"></i>
                    </button>
                </span>
                </li>
            </div>
        )
    }
}

export default LessonRow;
