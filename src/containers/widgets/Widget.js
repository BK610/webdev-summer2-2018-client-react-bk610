import React from 'react'
import {HeadingWidget} from "./HeadingWidget"
import {ListWidget} from "./ListWidget";
import {YouTubeWidget} from "./YouTubeWidget"
import {ParagraphWidget} from "./ParagraphWidget";
import {LinkWidget} from "./LinkWidget";
import {ImageWidget} from "./ImageWidget";
import * as actions from "../../actions";
import * as constants from "../../constants";
import connect from "react-redux/es/connect/connect";

class Widget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let selectElement;
        return (
            <div>
                <li className="list-group-item">
                    {this.props.widget.title} - {this.props.widget.widgetType}

                    <button onClick={() => this.props.up(this.props.widget.id)}
                            className="float-right btn btn-warning">
                        Up
                    </button>

                    <button onClick={() => this.props.down(this.props.widget.id)}
                            className="float-right btn btn-warning">
                        Down
                    </button>

                    <select
                        value={this.props.widget.widgetType}
                        onChange={() => this.props.widgetTypeChange(this.props.widget.id, selectElement.value)}
                        ref={node => selectElement = node}>
                        <option>{constants.HEADING_WIDGET}</option>
                        <option>{constants.PARAGRAPH_WIDGET}</option>
                        <option>{constants.LIST_WIDGET}</option>
                        <option>{constants.IMAGE_WIDGET}</option>
                        <option>{constants.LINK_WIDGET}</option>
                    </select>

                    <button className="float-right btn btn-danger"
                            onClick={() => this.props.deleteWidget(this.props.widget.id)}>
                        Delete
                    </button>
                    <div>
                        {this.props.widget.widgetType === constants.YOUTUBE_WIDGET &&
                        <YoutubeWidgetContainer widget={this.props.widget}/>}
                        {this.props.widget.widgetType === constants.LIST_WIDGET &&
                        <ListWidgetContainer widget={this.props.widget}/>}
                        {this.props.widget.widgetType === constants.HEADING_WIDGET &&
                        <HeadingWidgetContainer widget={this.props.widget}/>}
                        {this.props.widget.widgetType === constants.PARAGRAPH_WIDGET &&
                        <ParagraphWidgetContainer widget={this.props.widget}/>}
                        {this.props.widget.widgetType === constants.LINK_WIDGET &&
                        <LinkWidgetContainer widget={this.props.widget}/>}
                        {this.props.widget.widgetType === constants.IMAGE_WIDGET &&
                        <ImageWidgetContainer widget={this.props.widget}/>}
                    </div>
                </li>
            </div>
        )
    }
}

const stateToPropertyMapper = state => (
    {
        preview: state.preview
    }
);

const dispatcherToPropertyMapper = dispatch => (
    {
        deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
        up: (widgetId) =>  actions.up(dispatch, widgetId),
        down: (widgetId) => actions.down(dispatch, widgetId),
        textChange: (widgetId, newText) =>
            actions.textChange(dispatch, widgetId, newText),
        sizeChange: (widgetId, newSize) =>
            actions.sizeChange(dispatch, widgetId, newSize),
        titleChange: (widgetId, newName) =>
            actions.titleChange(dispatch, widgetId, newName),
        listTypeChange: (widgetId, newListType) =>
            actions.listTypeChange(dispatch, widgetId, newListType),
        urlChange: (widgetId, newUrl) =>
            actions.urlChange(dispatch, widgetId, newUrl),
        widgetTypeChange: (widgetId, widgetType) =>
            actions.widgetTypeChange(dispatch, widgetId, widgetType)
    }
);

const WidgetContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (Widget);

const HeadingWidgetContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (HeadingWidget);

const ImageWidgetContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (ImageWidget);

const LinkWidgetContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (LinkWidget);

const ListWidgetContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (ListWidget);

const ParagraphWidgetContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (ParagraphWidget);

const YoutubeWidgetContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (YouTubeWidget);

export default WidgetContainer;