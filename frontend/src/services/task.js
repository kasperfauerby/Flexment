import http from "../http-common";

class TaskDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
      }
    
      get(id) {
        return http.get(`/id/${id}`);
      }
    
      find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
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
    
      getLanguages(id) {
        return http.get(`/languages`);
      }
    
    }
    
    export default new TaskDataService();
   
    