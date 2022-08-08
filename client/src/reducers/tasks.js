export default (tasks = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return tasks;
    
        default:
            return tasks;
    }
}