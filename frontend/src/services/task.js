import http from "../http-common";

class TaskDataService {
    getAll(page = 0) {
        return http.get(`tasks?page=${page}`);
      }
    
      get(id) {
        return http.get(`/task?id=${id}`);
      }
    
      find(query, by = "name", page = 0) {
        return http.get(`tasks?${by}=${query}&page=${page}`);
      } 
    
      createReview(data) {
        return http.post("/review-new", data);
      }
    
      updateReview(data) {
        return http.put("/review-edit", data);
      }
    
      deleteReview(id, userId) {
        return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
      }
    
      getCuisines(id) {
        return http.get(`/cuisines`);
      }
    
    }
    
    export default new TaskDataService();
   
    