import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const repositories = await localStorage.getItem('repositories');
    this.setState({ repositories: repositories ? JSON.parse(repositories) : [], loading: false });
  }

  updateRepo = async (pathRepo) => {
    const repositoriesUpdated = await this.getRepositoryIncluded(pathRepo);
    this.setRepoLocalStorage(repositoriesUpdated);
  };

  deleteRepo = async (repoId) => {
    const repositories = await localStorage.getItem('repositories');
    const repositoriesParsed = JSON.parse(repositories);
    const newRepositoriesList = repositoriesParsed.filter(repo => repo.id !== repoId);
    this.setRepoLocalStorage(newRepositoriesList);
  };

  setRepoLocalStorage = async (repo) => {
    await localStorage.setItem('repositories', JSON.stringify(repo));
    this.setState({ repositories: repo });
  };

  getRepositoryIncluded = async (repositoryInput) => {
    const { data: repository } = await api.get(`repos/${repositoryInput}`);

    repository.lastCommit = moment(repository.pushed_at).fromNow();

    return repository;
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const repository = await this.getRepositoryIncluded(this.state.repositoryInput);

      // Merge repositories that already existis with the new repository found.
      const repositories = [...this.state.repositories, repository];

      // Set repositories to local storage
      this.setRepoLocalStorage(repositories);

      this.setState({
        repositoryInput: '',
        repositoryError: false,
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="GitHub Compare" />
        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
            placeholder="user/repository"
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}
          </button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          updateRepo={this.updateRepo}
          deleteRepo={this.deleteRepo}
        />
      </Container>
    );
  }
}
