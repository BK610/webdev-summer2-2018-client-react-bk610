let _singleton = Symbol();
export default class ModuleService {
    MODULE_COURSE_API_URL = 'https://cs4550-summer2-2018-bk610.herokuapp.com/api/course/courseId/module';
    MODULE_API_URL = 'https://cs4550-summer2-2018-bk610.herokuapp.com/api/module';

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllModulesForCourse(courseId) {
        return fetch(this.MODULE_COURSE_API_URL.replace('courseId', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    createModule(courseId, module) {
        return fetch(this.MODULE_COURSE_API_URL.replace('courseId', courseId),
            {
                body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteModule(moduleId) {
        return fetch(this.MODULE_API_URL + '/' + moduleId, {
            method: 'delete'
        })
    }

    findModuleById(moduleId) {
        return fetch(this.MODULE_API_URL + '/' + moduleId)
            .then(function (response) {
                return response.json();
            })
    }

    findAllModules() {
        return fetch(
            this.MODULE_API_URL)
            .then(function (response) {
                return response.json();
            })
    }

    updateModule(moduleId, module) {
        return fetch(this.MODULE_API_URL + '/' + moduleId, {
            method: 'put',
            body: JSON.stringify(module),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }
}