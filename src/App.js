// import React, { Component } from 'react';
// import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: '',
//       name: '',
//       array: [],
//     };

//     this.fetchDog = this.fetchDog.bind(this);
//     this.saveData = this.saveData.bind(this);
//   }

//   componentDidMount() {
//     if (localStorage.nameDogUrl) {
//       const parseStorage = JSON.parse(localStorage.nameDogUrl);
//       const lastDog = parseStorage[parseStorage.length - 1].message;
//       this.setState({
//         array: parseStorage,
//         data: { message: lastDog },
//       });
//     } else {
//       this.fetchDog();
//     }
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextState.data.message.includes('terrier')) {
//       return false;
//     }
//     return true;
//   }

//   componentDidUpdate() {
//     const { data } = this.state;
//     localStorage.setItem('dogUrl', data.message);
//     const dogBreed = data.message.split('/')[4];
//     alert(dogBreed);
//   }

//   async fetchDog() {
//     fetch('https://dog.ceo/api/breeds/image/random')
//       .then((response) => response.json())
//       .then((result) => this.setState({ data: result }));
//   }

//   saveData() {
//     const {
//       data: { message },
//       name,
//       array,
//     } = this.state;
//     const dogData = { message, name };
//     const newArray = [...array, dogData];
//     this.setState({ array: newArray });
//     this.setState({ name: '' });
//     localStorage.setItem('nameDogUrl', JSON.stringify(newArray));
//   }

//   render() {
//     const { data } = this.state;
//     console.log(data.message);
//     if (data === '') return 'loading...';
//     return (
//       <div>
//         <p>Doguinhos</p>
//         <button type="button" onClick={ this.fetchDog }> Novo doguinho!</button>
//         <div>
//           <input
//             type="text"
//             value={ data.name }
//             onChange={ (e) => this.setState({ name: e.target.value }) }
//             placeholder="Digite o nome do doguinho"
//           />
//             <button type="button" onClick={this.saveData}>Salvar doguinho!</button>
//           <img src={ data.message } alt="Random dog" />
//         </div>
//       </div>
//     );
//   }
// }
// export default App;

import React from 'react';

let dogBreed = '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      name: '',
      array: [],
    };
    this.fetchDog = this.fetchDog.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.data.message.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;
    if (prevState.data !== data.message) {
      dogBreed = [data.message.split('/')[4]];
    }
  }

  fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((result) => this.setState({ data: result }));
  }

  saveData() {
    const {
      data: { message },
      name,
      array,
    } = this.state;
    const dogData = { message, name };
    const newArray = [...array, dogData];
    this.setState({ array: newArray });
    this.setState({ name: '' });
    localStorage.setItem('namedDogURL', JSON.stringify(newArray));

    if (localStorage.namedDogURL) {
      const parseStorage = JSON.parse(localStorage.namedDogURL);
      const lastDog = parseStorage[parseStorage.length - 1].message;
      this.setState({
        array: parseStorage,
        data: { message: lastDog },
      });
    }
    alert(dogBreed);
  }

  render() {
    const { data } = this.state;
    if (data.message === '') return 'loading...';
    return (
      <div>
        <p>Doguinhos</p>
        <button type="button" onClick={ this.fetchDog }>Novo doguinho!</button>
        <div>
          <input
            type="text"
            value={ data.name }
            onChange={ (e) => this.setState({ name: e.target.value }) }
            placeholder="digite o nome do doguinho"
          />
          <button type="button" onClick={ this.saveData }>Salvar doguinho!</button>
        </div>
        <div>
          <img src={ data.message } alt={ data.message } />
        </div>
      </div>
    );
  }
}
export default App;
