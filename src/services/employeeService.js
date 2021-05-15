import http from "../http-route"

class EmployeeService{

    login(data){
        return http.post("/login", data)
    }

    add(data) {
        return http.post("/signup", data);
    }

    getAll() {
        return http.get("/listEmployees");
    }

    getUser(id){
        return http.get(`/employee/view/${id}`);
    }

    updateProfile(data){
        return http.put("/employee/updateDetails", data);
    }

    getAllDev(){
        return http.get("/list/dev");
    }

    deleteEmployee(id){
        return http.delete(`/employee/delete/${id}`);
    }
}

export default new EmployeeService();