const movieContainerElm = document.getElementById('movie-container')
const searchBtn = document.getElementById('search-btn')
const inputElm = document.getElementById('input-movie')
const addToWatchlistBtn = document.getElementById('add-movie-btn')
let movieDataArr = []

const getMovieTitles = async () => {
    const url = searchMovies()
    // console.log(url)
    const res = await fetch(url)
    const data = await res.json()

    //console.log(data)
    const movieObj = data.Search

    let movieTitles = []
    for (const movies of movieObj) {
        movieTitles.push(movies.Title)
    }

    return movieTitles
}

const renderMovies = async () => {
    const movieTitles = await getMovieTitles()
    movieContainerElm.innerHTML = ''
    for (const movie of movieTitles) {
        const res = await fetch(
            `https://www.omdbapi.com/?apikey=367551de&t=${movie}`
        )
        const data = await res.json()
        const { Title, Genre, Plot, Poster, Runtime, imdbRating } = data

        movieContainerElm.innerHTML += `
                <div class="movies-html-javascript-wrapper">
                    <div class="poster-container">
                        <img src=${Poster}>
                    </div>
               
                    <div class="movie-info-container">
                        <div class="name-rating">
                          <h4 class="movie-name">${Title}</h4>
                          <div class="movie-rating">
                          <i class="fa-solid fa-star"></i>
                          <h6>${imdbRating}</h6>
                        </div>
                        </div>
                    
                        <div class="movie-details-container">
                            <h6 class="movie-runtime">
                                ${Runtime}
                            </h6>
                            <h6 class="movie-tags">
                                ${Genre}
                            </h6>
                            <form class="watchlist-actions-container" id="watchlist-actions-container">
                                <button id="add-movie-btn" class="watchlist-btn"><svg width="25" height="25" viewBox="0 0 100 100" fill="none" type="submit" onClick="addMovieWatchList()" form="watchlist-actions-container" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" fill="#1C1C1C"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M50 75C63.8071 75 75 63.8071 75 50C75 36.1929 63.8071 25 50 25C36.1929 25 25 36.1929 25 50C25 63.8071 36.1929 75 50 75ZM53.125 40.625C53.125 38.8991 51.7259 37.5 50 37.5C48.2741 37.5 46.875 38.8991 46.875 40.625V46.875H40.625C38.8991 46.875 37.5 48.2741 37.5 50C37.5 51.7259 38.8991 53.125 40.625 53.125H46.875V59.375C46.875 61.1009 48.2741 62.5 50 62.5C51.7259 62.5 53.125 61.1009 53.125 59.375V53.125H59.375C61.1009 53.125 62.5 51.7259 62.5 50C62.5 48.2741 61.1009 46.875 59.375 46.875H53.125V40.625Z" fill="white"/>
                                </svg> Watchlist</button>
                            </form>
                        </div>
                        <div class="movie-plot-container">
                            <p>${Plot}</p>
                        </div>
                          

                    </div>
                </div>
        `
        movieDataArr.push(data)
    }
    WatchListListener()
}

const getMovieFromStorage = () => {
    const movieArray = JSON.parse(localStorage.getItem('movie'))

    return movieArray
}

const addMovieWatchList = (e) => {
    e.preventDefault()
    const movieArray = movieDataArr
    const movieFromStorage = getMovieFromStorage()
    let movieArrayLocal = []
    const movieName = e.path[2].children[0].firstElementChild.innerText

    const movie = movieArray.filter((movieObj) => {
        return movieObj.Title === movieName
    })

    if (movieFromStorage) {
        for (const movieElement of movieFromStorage) {
            movieArrayLocal.push(movieElement)
        }
    }

    if (movieFromStorage) {
        const filteredMovie = movieFromStorage.filter((elem) => {
            return elem.Title === movie[0].Title
        })
        console.log(filteredMovie)
        if (filteredMovie.length >= 1) {
            console.log('duplicate movie ')
        } else {
            movieArrayLocal.push(movie[0])
            console.log(movie[0])
            localStorage.setItem('movie', JSON.stringify(movieArrayLocal))
        }
    } else {
        movieArrayLocal.push(movie[0])
        console.log(movie[0])
        localStorage.setItem('movie', JSON.stringify(movieArrayLocal))
    }
}

const WatchListListener = () => {
    if (document.querySelector('.watchlist-actions-container')) {
        const addMovie = document.querySelectorAll(
            '.watchlist-actions-container'
        )
        for (const addMovieElm of addMovie) {
            addMovieElm.addEventListener('submit', addMovieWatchList)
        }
    } else {
        console.log('fail')
    }
}

const searchMovies = () => {
    const movieTitle = inputElm.value
    const url = `https://www.omdbapi.com/?apikey=367551de&s=${movieTitle}`
    return url
}

searchBtn.addEventListener('click', renderMovies)

const print = (value) => {
    console.log(value)
}

const config = (configure) => {
    configure('yo')
}
config(print)

console.log(print)
