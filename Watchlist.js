const movieContainerElm = document.getElementById('movie-container')
const removeBtn = document.getElementById('add-movie-btn')

const getMovieFromStorage = () => {
    const movieArray = JSON.parse(localStorage.getItem('movie'))

    return movieArray
}

const renderMovies = () => {
    const movieData = getMovieFromStorage()
    movieContainerElm.innerHTML = ''
    for (const movie of movieData) {
        const { Title, Genre, Plot, Poster, Runtime, imdbRating } = movie

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
                                <button id="add-movie-btn" class="watchlist-btn"><svg width="25" height="25" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" fill="#1C1C1C"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M50 75C63.8071 75 75 63.8071 75 50C75 36.1929 63.8071 25 50 25C36.1929 25 25 36.1929 25 50C25 63.8071 36.1929 75 50 75ZM40.625 46.875C38.8991 46.875 37.5 48.2741 37.5 50C37.5 51.7259 38.8991 53.125 40.625 53.125H59.375C61.1009 53.125 62.5 51.7259 62.5 50C62.5 48.2741 61.1009 46.875 59.375 46.875H40.625Z" fill="white"/>
                                </svg>Remove</button>
                            </form>
                        </div>
                        <div class="movie-plot-container">
                            <p>${Plot}</p>
                        </div>
                          

                    </div>
                </div>
        `
    }
    listenerFunction()
}

const removeMovie = (e) => {
    e.preventDefault()
    const movieDataArr = getMovieFromStorage()
    const selectedMovieName =
        e.path[2].firstElementChild.firstElementChild.innerText

    const filteredMovieArr = movieDataArr.filter((movieName) => {
        if (selectedMovieName != movieName.Title) return movieName
    })

    localStorage.setItem('movie', JSON.stringify(filteredMovieArr))
    renderMovies()
}

const listenerFunction = () => {
    if (document.querySelector('.watchlist-actions-container')) {
        const removeForms = document.querySelectorAll(
            '.watchlist-actions-container'
        )
        for (const removeForm of removeForms) {
            removeForm.addEventListener('submit', removeMovie)
        }
    }
}

renderMovies()
