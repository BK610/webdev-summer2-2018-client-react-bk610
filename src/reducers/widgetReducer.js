import * as constants from '../constants/index'

let initialState = {
    widgets: [],
    preview: false
};

export const widgetReducer = (state = initialState, action) => {
    let fromIndex;
    let toIndex;

    let changedState = Object.assign({}, state);

    switch (action.type) {
        case constants.UP:
            fromIndex = state.widgets.findIndex(widget => widget.id === action.widgetId);
            toIndex = fromIndex--;
            changedState = JSON.parse(JSON.stringify(state));
            changedState.widgets.splice(toIndex, 0, changedState.widgets.splice(fromIndex, 1)[0]);
            return changedState;
        case constants.DOWN:
            fromIndex = state.widgets.findIndex(widget => widget.id === action.widgetId);
            toIndex = fromIndex++;
            changedState = JSON.parse(JSON.stringify(state));
            changedState.widgets.splice(toIndex, 0, changedState.widgets.splice(fromIndex, 1)[0]);
            return changedState;
        case constants.FIND_ALL_WIDGETS:
            return {
                widgets: action.widgets,
                preview: state.preview
            };
        case constants.FIND_ALL_WIDGETS_FOR_LESSON:
            return {
                widgets: action.widgets,
                preview: state.preview
            };
        case constants.SAVE:
            fetch(constants.SERVER_API_URL + 'lesson/' + action.lessonId + '/widget/save', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(state.widgets)
            })
                .then(() => window.alert("Widgets saved."));
            return state;
        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(
                    widget => widget.id !== action.widgetId
                ),
                preview: state.preview
            }
        case constants.CREATE_WIDGET:
            let newId;
            if (state.widgets.length === 0) {
                newId = 1;
            } else {
                newId = Math.max(...state.widgets.map(widget => widget.id)) + 1;
            }
            let newWidget = {
                id: newId,
                title: 'New Widget',
                widgetType: constants.HEADING_WIDGET,
                text: '',
                size: '1',
                listType: 'ul',
                url: '',
            };
            return {
                widgets: [
                    ...state.widgets,
                    newWidget
                ],
                preview: state.preview
            }
        case constants.PREVIEW:
            changedState.preview = !state.preview;
            return changedState;
        case constants.CHANGE_WIDGET_TYPE:
            changedState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.widgetId) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                }),
                preview: state.preview
            };
            return JSON.parse(JSON.stringify(changedState));
        case constants.CHANGE_WIDGET_TEXT:
            changedState = {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.widgetId) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview
            };
            return changedState;
        case constants.CHANGE_HEADING_SIZE:
            changedState = {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.widgetId) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview
            };
            return changedState;
        case constants.CHANGE_WIDGET_TITLE:
            changedState = {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.widgetId) {
                        widget.title = action.title
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview
            };
            return changedState;
        case constants.CHANGE_URL:
            changedState = {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.widgetId) {
                        widget.url = action.url
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview
            };
            return changedState;
        case constants.CHANGE_LIST_TYPE:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.widgetId) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            };
        default:
            return changedState
    }
}
