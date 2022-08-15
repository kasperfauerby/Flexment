import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getTasks, getTasksBySearch } from '../../actions/tasks';
import Tasks from '../Tasks/Tasks';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [programmingLanguages, setProgrammingLanguages] = useState([]);

    const searchTask = () => {
        if(search.trim() || programmingLanguages) {
            dispatch(getTasksBySearch({ search, programmingLanguages: programmingLanguages.join(',') }));
            history.push(`/tasks/search?searchQuery=${search || 'none'}&programmingLanguages=${programmingLanguages.join(',')}`);
        } else {
            history.push('/')
        }
    }

    const handleKeyPress = (e) => {
        // keyCode === 13 -> Enter knap
        if(e.keyCode === 13) {
            searchTask();
        }
    }

    const handleAdd = (programmingLanguage) => setProgrammingLanguages([ ...programmingLanguages, programmingLanguage])

    const handleDelete = (programmingLanguageToDelete) => setProgrammingLanguages(programmingLanguages.filter((programmingLanguage) => programmingLanguage !== programmingLanguageToDelete))

    return(
        <Grow in>
            <Container maxWidth ="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Tasks setCurrentId={setCurrentId} /> 
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                            name="search"
                            variant="outlined" 
                            label="Søg i opgaver" 
                            onKeyPress={handleKeyPress} 
                            fullWidth 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} />

                            <ChipInput 
                                style={{ margin: '10px 0' }}
                                value={programmingLanguages}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Søg teknologier"
                                variant="outlined"
                            />
                            <Button onClick={searchTask} className={classes.searchButton} variant="contained" color="primary">Søg</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} /> 
                        {(!searchQuery && !programmingLanguages.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
};

export default Home;