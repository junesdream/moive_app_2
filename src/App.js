import React,{useState,useEffect} from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Form, FormControl,Button } from 'react-bootstrap';

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=f6dfb3cfa15d829e7e1a2f408f0c3081";
const API_SEARCH ="https://api.themoviedb.org/3/search/movie?api_key=f6dfb3cfa15d829e7e1a2f408f0c3081&query";

function App() {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMovies(data.results);
			});
  }, []);

  const searchMovie = async (e) => {
		e.preventDefault();
		console.log("Searching");
		try {
			const url = `https://api.themoviedb.org/3/search/movie?api_key=f6dfb3cfa15d829e7e1a2f408f0c3081&query=${query} `;
			const res = await fetch(url);
			const data = await res.json();
			console.log(data);
			setMovies(data.results);
		} catch (e) {
			console.log(e);
		}
  };

  const changeHandler = (e) => {
		setQuery(e.target.value);
  };

  return (
		<>
			<Navbar className="navbar" expand="lg" variant="dark">
				<Container fluid>
					<Navbar.Brand className="navbar-title" href="/home">
						Movie Search App
					</Navbar.Brand>
					<Navbar.Brand className="navbar-title" href="/home">
						Rainbow
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
					<Navbar.Collapse id="nabarScroll">
						<Nav
							className="me-auto my-2 my-lg-3"
							style={{ maxHeight: "100px" }}
							navbarScroll
						></Nav>

						<Form
							className="d-flex"
							onSubmit={searchMovie}
							autoComplete="off"
						>
							<FormControl
								type="search"
								placeholder="Movie Search"
								className="me-2"
								aria-label="search"
								name="query"
								value={query}
								onChange={changeHandler}
							></FormControl>
							<Button
								className="nav-btn"
								variant="secondary"
								type="submit"
							>
								Search
							</Button>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div>
				{movies.length > 0 ? (
					<div className="container">
						<div className="grid">
							{movies.map((movieReq) => (
								<MovieBox key={movieReq.id} {...movieReq} />
							))}
						</div>
					</div>
				) : (
					<h2>Sorry !! No Movies Found</h2>
				)}
			</div>
			<div className="footer">
				<p>RainbowDev &copy; 2022</p>

				<div className="icons">
					<span>
						<a href="https://www.linkedin.com">
							<i class="ri-linkedin-box-fill"></i>
						</a>
					</span>
					<span>
						<a href="https://accounts.google.com ">
							<i class="ri-mail-send-fill"></i>
						</a>
					</span>
					<span>
						<a
							href="https://docs.github.com">
							<i class="ri-github-fill"></i>
						</a>
					</span>
				</div>
			</div>
		</>
  );
}

export default App;
