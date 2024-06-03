import { getDataSet, initThing, loadDataset } from '../util/pods';
import { movieShape } from './../util/shapes'
import { useEffect, useState } from 'react';
import MovieTable from './MovieTable';
import { getAllMovies } from '../util/util';
import { Column } from './styled';

const Dashboard = ({ appData }) => {

    const [movieDataset, setMovieDataset] = useState();
    const [movies, setMovies] = useState([]);

    // Get App data
    useEffect(() => {
        if (!appData.storageURL) return
        getDataSet(appData.fetch, `${appData.storageURL}/lore/movies`)
            .then(setMovieDataset);
    }, [appData]);

    // Load saved movies
    useEffect(() => {
        if (!movieDataset) return
        loadDataset(movieDataset, { shape: movieShape })
            .then(getAllMovies)
            .then(setMovies)
    }, [movieDataset])

    async function addMovie(movie) {
        let { dataset } = await initThing(
            movie,
            movieShape,
            {
                id: movie.id,
                dataset: movieDataset,
                fetch: appData.fetch
            });
        setMovieDataset(dataset);
    }

    return (
        <Column>
            <MovieTable movies={movies} addMovie={addMovie} />
        </Column>
    )
}

export default Dashboard;