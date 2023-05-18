import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8081/api/v1/product/all";

class apiservice {

    getProduct(){
        return axios.get(PRODUCT_API_BASE_URL);
    }

    // createCourse(course){
    //     return axios.post(COURSE_API_BASE_URL, course);
    // }

    // getCourseById(coursId){
    //     return axios.get(COURSE_API_BASE_URL + '/' + coursId);
    // }

    // updateCourse(course, coursId){
    //     return axios.put(COURSE_API_BASE_URL + '/' + coursId, course);
    // }

    // deleteCourse(courseId){
    //     return axios.delete(COURSE_API_BASE_URL + '/' + courseId);
    // } 
}
export default apiservice
