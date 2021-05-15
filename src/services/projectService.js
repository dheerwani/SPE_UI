import http from "../http-route";

class ProjectService {
    getAll() {
        return http.get("/project/list");
    }

    get(id) {
        return http.get(`/project/view/${id}`);
    }


    add(data) {
        return http.post("/project/add", data);
    }

    //
    update(data) {
        return http.put("/project/update", data);
    }

    delete(id) {
        
        return http.delete(`/project/delete/${id}`);
    }

    getRequests(){
        return http.get("/project/request/list");
    }

    updateRequest(data){
        return http.put("/project/request/update", data);
    }

    makeRequest(data){
        
        return http.post("/project/request/add",data);
    }

    // get requests made by an employee
    getEmpRequest(id){
        return http.get(`/project/request/getEmpReq/${id}`)
    }

    // get all the projects available for employee by Emp ID
    getAvailableProjects(id){
        return http.get(`/project/available/${id}`)
    }

    // get the projects that the employee is working on. Active projects
    getActiveProjects(id){
        return http.get(`/project/active/${id}`)
    }

    // get completed projects
    getCompletedProjects(id){
        return http.get(`/project/complete/${id}`)
    }

    //
    // deleteAll() {
    //     return http.delete(`/tutorials`);
    // }
    //
    // findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    // }
}

export default new ProjectService();