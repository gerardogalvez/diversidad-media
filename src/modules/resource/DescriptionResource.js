import React from 'react';
import s from './DescriptionMovie.css';
import {Link} from 'react-router-dom'
import axios from 'axios';

class DescriptionResource extends React.Component {
  state = {
    resource: null
  }

  async componentWillMount() {
    const id = this.props.match.params.id;
    const {data:resource} = await axios.get(`/${this.props.resource}/${id}`);
    this.setState({resource});
  }

  renderGenres(genres) {
    return genres.map((gen, i) => {
      return `${gen.name}${genres.length -1 === i ? "" : ", "}`
    })
  }

  render() {
    const {resource} = this.props;
    const {movie} = this.state;

    if (!movie) {
      return null;

    }

    return (
      <div>
        <h2 className={s.title}><Link to={`/${resource}`}>Peliculas</Link> › {movie.title}</h2>
          <div className={s.container}>
            <div className={s.backdrop} style={{
              backgroundImage: `url(http://image.tmdb.org/t/p/w500${movie.backdrop_path})`
            }}></div>

            <div className={s.side}>
              <img
                className={s.poster}
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} alt="Poster"/>
            </div>
            <div className={s.description}>
              <h2>{movie.title}</h2>
              <ul>
                <li>{(movie.release_date).split('-')[0]}</li>
                <li>{this.renderGenres(movie.genres)}</li>
                <li>{`${movie.vote_average} / 10`}</li>
              </ul>
              <p>
                {movie.overview}
              </p>
            </div>
          </div>
       </div>
    );
  }
}

export default DescriptionResource;
