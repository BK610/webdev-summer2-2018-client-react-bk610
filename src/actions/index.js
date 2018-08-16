import * as constants from '../constants/index'

export const widgetTypeChange = (dispatch, widgetId, widgetType) => {
    dispatch({
        type: constants.CHANGE_WIDGET_TYPE,
        widgetId: widgetId,
        widgetType: widgetType
    })
};

export const textChange = (dispatch, widgetId, newText) => {
    dispatch({
        type: constants.CHANGE_WIDGET_TEXT,
        widgetId: widgetId,
        text: newText
    })
};

export const sizeChange = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.CHANGE_HEADING_SIZE,
        widgetId: widgetId,
        size: newSize
    })
);

export const titleChange = (dispatch, widgetId, newTitle) => (
    dispatch({
        type: constants.CHANGE_WIDGET_TITLE,
        widgetId: widgetId,
        title: newTitle
    })
);

export const listTypeChange = (dispatch, widgetId, newListType) => (
    dispatch({
        type: constants.CHANGE_LIST_TYPE,
        widgetId: widgetId,
        listType: newListType
    })
);

export const urlChange = (dispatch, widgetId, newURL) => (
    dispatch({
        type: constants.CHANGE_URL,
        widgetId: widgetId,
        url: newURL
    })
);

export const up = (dispatch, widgetId) => (
    dispatch({
        type: constants.UP,
        widgetId: widgetId
    })
);

export const down = (dispatch, widgetId) => (
    dispatch({
        type: constants.DOWN,
        widgetId: widgetId
    })
);

export const findAllWidgets = dispatch => {
    fetch(constants.SERVER_API_URL + 'widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
};

export const findAllWidgetsForLesson = (dispatch, lessonId) => {
    fetch(constants.SERVER_API_URL + 'lesson/' + lessonId + '/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS_FOR_LESSON,
            widgets: widgets
        }))
};

export const createWidget = (dispatch) => (
    dispatch({
        type: constants.CREATE_WIDGET,
    })
);

export const save = (dispatch, lessonId) => (
    dispatch({
        type: constants.SAVE,
        lessonId: lessonId
    })
);

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
);

export const deleteWidget = (dispatch, widgetId) => {
    dispatch({
        type: constants.DELETE_WIDGET,
        widgetId: widgetId
    })
};

