import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import Nav from './components/Nav';


function App() {
const { imdbID } = useParams();

  return (
    <Router>
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/movies" exact element={<Movies />} />
        <Route path=':movie' element={<Movie />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
