import React from 'react';
import {connect} from 'react-redux';
import Widget from './Widget';
import * as actions from '../../actions/index'

class WidgetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonId: "",
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.renderWidgets = this.renderWidgets.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount() {
        this.setState({lessonId: this.props.match.params.lessonId},
            () => this.props.findAllWidgets(this.state.lessonId));
    }

    componentWillReceiveProps(props) {
        if (props.match.params.lessonId !== this.state.lessonId) {
            this.setState({lessonId: props.match.params.lessonId},
                () => this.props.findAllWidgets(this.state.lessonId));
        }
    }

    renderWidgets() {
        return (
            <div>
                <ul className="list-group">
                    {this.props.widgets.map(widget => (
                        <Widget widget={widget}
                                key={widget.id}/>
                    ))}
                </ul>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h3>Widgets</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <button onClick={() => this.props.createWidget()}
                                className="btn btn-success float-left">
                            Create Widget
                        </button>
                        <button onClick={() => this.props.saveWidgets(this.state.lessonId)}
                                className="btn btn-primary float-right">
                            Save
                        </button>
                        <button onClick={() => this.props.previewWidgets()}
                                className="btn btn-secondary"
                                hidden={this.props.preview}>
                            Preview
                        </button>
                        <button onClick={() => this.props.previewWidgets()}
                                className="btn btn-secondary"
                                hidden={!this.props.preview}>
                            Edit
                        </button>
                    </li>
                    {this.renderWidgets()}
                </ul>
            </div>
        );
    }
}

const stateToPropertyMapper = state => (
    {
        widgets: state.widgets,
        preview: state.preview
    }
)

const dispatcherToPropertyMapper = dispatch => (
    {
        createWidget: () => actions.createWidget(dispatch),
        saveWidgets: (lessonId) => actions.save(dispatch, lessonId),
        findAllWidgets: (lessonId) => actions.findAllWidgetsForLesson(dispatch, lessonId),
        previewWidgets: () => actions.preview(dispatch)
    }
)

const WidgetListContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (WidgetList);

export default WidgetListContainer;
