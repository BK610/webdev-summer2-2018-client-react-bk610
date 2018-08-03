import React from 'react'
import LessonTabs from '../lessons/LessonTabs'
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

        this.selectModule.bind(this);
        this.findAllModulesForCourse.bind(this);
        this.renderModules()
        this.titleChanged = this.titleChanged.bind(this);
        this.setState = this.setState.bind(this);
        this.createModule = this.createModule.bind(this);
        this.render.bind(this);
    }

    selectModule = (index) => {
        console.log(index);
        this.setState({
            newModule: index
        });
    };

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setState({modules: modules})
            });
    }

    renderModules() {
        let moduleRows = this.state.modules.map(function (module) {
            return <ModuleRow module={module}
                              key={module.id}/>
        });
        return moduleRows;
    }

    titleChanged(event) {
        // console.log(event.target.value);
        this.setState({newModule: {title: event.target.value}});
    }

    createModule() {
        console.log(this.state.module);
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
    }

    render() {
        console.log(this.state.modules);
        return (
            <div>
                <h3>Module List for course: {this.state.courseId}</h3>
                <input onChange={this.titleChanged}
                       value={this.state.newModule.title}
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

            // <div>
            //   <h3>Module List {/*this.props.course*/}</h3>
            //   <ul>
            //     {this.props.course.modules.map(
            //       (module, i) => {
            //         return (
            //           <li onClick={() => this.selectModule(i)} key={i}>{module.title}</li>)
            //       })}
            //   </ul>
            //   {/*<LessonTabs module={this.props.course.modules[this.state.selectedModuleIndex]}/>*/}
            // </div>
        )
    }
}
