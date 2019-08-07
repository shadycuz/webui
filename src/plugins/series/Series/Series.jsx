import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import SeriesCard from '../SeriesCard';
import { GridCard } from './styles';

class SeriesPage extends Component {
  static propTypes = {
    shows: PropTypes.arrayOf(PropTypes.object).isRequired,
    getShows: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getShows } = this.props;
    getShows();
  }

  render() {
    const { shows } = this.props;

    return (
      <Grid container spacing={3}>
        {shows.map(show => (
          <GridCard item key={show.id} sm={12} md={6}>
            <SeriesCard show={show} />
          </GridCard>
        ))}
      </Grid>
    );
  }
}

export default SeriesPage;