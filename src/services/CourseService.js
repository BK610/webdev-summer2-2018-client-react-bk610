let _singleton = Symbol();

class CourseService {
    COURSE_API_URL = 'https://cs4550-summer2-2018-bk610.herokuapp.com/api/course';

    findCourseById(courseId) {
        return fetch(this.COURSE_API_URL + "/" + courseId)
            .then(function (response) {
                return response.json();
            });
    }

    deleteCourse(courseId) {
        return fetch(this.COURSE_API_URL + '/' + courseId, {
            method: 'delete'
        })
            .then(function (response) {
                return response;
            });
    }

    createCourse(course) {
        return fetch(this.COURSE_API_URL, {
            method: 'post',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            });
    }

    updateCourse(courseId, course) {
        return fetch(this.COURSE_API_URL + '/' + courseId, {
            method: 'put',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
    }

    findAllCourses() {
        return fetch(this.COURSE_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }
}

export default CourseService;
