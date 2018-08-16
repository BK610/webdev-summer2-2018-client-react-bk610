import React from 'react'
import ModuleService from "../../services/ModuleService";
import ModuleRow from "./ModuleRow";

export default class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            modules: [],
            newModule: {title: ''},
        }

        this.moduleService = ModuleService.instance;

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.findAllModulesForCourse = this.findAllModulesForCourse.bind(this);
        this.renderModules = this.renderModules.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setState = this.setState.bind(this);
        this.createModule = this.createModule.bind(this);
        this.render = this.render.bind(this);
        this.rowChange = this.rowChange.bind(this);
    }

    componentDidMount() {
        this.setState({courseId: this.props.courseId})
    }

    componentWillReceiveProps(newProps) {
        this.setState({courseId: newProps.courseId});
        this.findAllModulesForCourse(newProps.courseId)
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setState({modules: modules})
            });
    }

    rowChange() {
        this.findAllModulesForCourse(this.props.courseId);
    }

    renderModules() {
        const rowChange = this.rowChange;
        const courseId = this.state.courseId;
        let moduleRows = this.state.modules.map(function (module) {
            return <ModuleRow module={module}
                              key={module.id}
                              courseId={courseId}
                              callback={rowChange}/>
        });
        return moduleRows;
    }

    titleChanged(event) {
        this.setState({newModule: {title: event.target.value}});
    }

    createModule() {
        this.moduleService
            .createModule(this.props.courseId, this.state.newModule)
            .then(this.findAllModulesForCourse(this.state.courseId));
        this.render();
    }

    render() {
        return (
            <div>
                <h3>Modules</h3>
                <input onChange={this.titleChanged}
                       placeholder="New Module"
                       className="form-control"/>
                <button onClick={this.createModule} className="btn btn-primary btn-block">
                    <i className="fa fa-plus"></i>
                </button>
                <br/>
                <ul className="list-group">
                    {this.renderModules()}
                </ul>
            </div>
        )
    }
}
