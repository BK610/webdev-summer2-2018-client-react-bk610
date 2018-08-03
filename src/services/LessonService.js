let _singleton = Symbol();

class LessonService {
    LESSON_API_URL = 'https://cs4550-summer2-2018-bk610.herokuapp.com/api/lesson';
    LESSON_MODULE_COURSE_API_URL =
        'https://cs4550-summer2-2018-bk610.herokuapp.com/api/course/courseId/module/moduleId/lesson';

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch(this.LESSON_MODULE_COURSE_API_URL
            .replace('courseId', courseId)
            .replace('moduleId', moduleId), {
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        });
    }

    deleteLesson(lessonId) {
        return fetch(this.LESSON_API_URL + '/' + lessonId, {
            method: 'delete'
        })
    }

    findAllLessons() {
        return fetch(this.LESSON_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    findLessonById(lessonId) {
        return fetch(this.LESSON_API_URL + '/' + lessonId)
            .then(function (response) {
                return response.json();
            })
    }

    findAllLessonsForModule(courseId, moduleId) {
        return fetch(this.LESSON_MODULE_COURSE_API_URL
            .replace('courseId', courseId)
            .replace('moduleId', moduleId))
            .then(function (response) {
                return response.json();
            });
    }

    updateLesson(lessonId, lesson) {
        return fetch(this.LESSON_API_URL + '/' + lessonId, {
            method: 'put',
            body: JSON.stringify(lesson),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }
}

export default LessonService;