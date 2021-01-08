import React, { Component } from 'react';
import CountryList from './components/CountryList/CountryList';
import SearchBox from './SearchBox/SearchBox';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      stats: [],
      searchField: '',
    };
  }

  async componentDidMount() {
    const resp = await fetch('https://api.covid19api.com/countries');
    const countries = await resp.json();
    this.setState({ countries });
    this.state.countries.map(async (country) => {
      const resp = await fetch(
        `https://api.covid19api.com/total/country/${country.Slug}`
      );
      const data = await resp.json();
      if (data.length)
        this.setState((prevState) => ({
          stats: prevState.stats.concat({
            ...data[data.length - 1],
            CountryCode: country.ISO2,
          }),
        }));
    });
  }

  handleChange = (e) => this.setState({ searchField: e.target.value });

  render() {
    const { stats, searchField } = this.state;
    const filteredCountries = stats.filter((country) =>
      country.Country.toLowerCase().includes(searchField.toLocaleLowerCase())
    );
    return (
      <div className="App">
        <h1>Covid19 Stats Web App</h1>
        <SearchBox
          placeholder="Enter Country Name ..."
          handleChange={this.handleChange}
        />
        <CountryList stats={filteredCountries} />
      </div>
      /* */
    );
  }
}
