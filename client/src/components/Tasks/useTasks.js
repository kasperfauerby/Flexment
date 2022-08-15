import { useSelector } from 'react-redux';

export const getTasks = () => {
    const { tasks, isLoading } = useSelector((state) => state.tasks);

    return {tasks, isLoading}
}