import React from 'react';
import ModuleService from "../../services/ModuleService";
import Link from "react-router-dom/es/Link";

export default class ModuleRow
    extends React.Component {
    constructor(props) {
        super(props);

        this.moduleService = ModuleService.instance;
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    delete() {
        if(window.confirm('Delete module?')) {
            this.moduleService.deleteModule(this.props.module.id)
                .then(this.props.callback);
        }
    }

    update() {

    }

    render() {
        return (
            <li className="list-group-item">
                <Link to={'/course/' + this.props.courseId + '/module/' + this.props.module.id}>
                    {this.props.module.title}
                </Link>
                <span className="float-right">
                    <Link to={'/course/' + this.props.courseId}>
                        <button onClick={this.delete}
                                className="btn btn-secondary">
                            <i className="fa fa-trash"></i>
                        </button>
                    </Link>
                    <button onClick={this.update}
                            className="btn btn-secondary">
                        <i className="fa fa-pencil"></i>
                    </button>
                </span>
            </li>
        );
    }
}