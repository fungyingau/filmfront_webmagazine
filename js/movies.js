var d = document;

window.addEventListener("load", function() {
    initMovies();
});

function initMovies() {
    /*  ======================================================================  
    Browser & Object sniffing
  =========================================================================== */
    if (!d.getElementById("movieContent")) return false;
    if (!d.getElementById("movieMenu")) return false;
    if (typeof movies == "undefined" || movies.length < 2) return false;

    /*  ======================================================================  
    Variables
  =========================================================================== */
    const windowWidth = window.innerWidth;
    var movieContent = d.getElementById("movieContent");
    var movieMenuLinks = d.getElementsByClassName("movieMenuLink");

    var eersteMovieNr = 1;

    /*  ======================================================================  
    Initialisatie & DOM Manipulatie
  =========================================================================== */
    movieContent.innerHTML = "";

    var dynamicCover = d.createElement("div");
    dynamicCover.setAttribute("class", "dynamicCover");
    dynamicCover.setAttribute("id", "movieCover");

    // .dymanicCover
    var dynamicCoverImg = d.createElement("img");
    // dynamicCoverImg.setAttribute("width", "auto");
    // dynamicCoverImg.setAttribute("height", "600");

    // .dynamicText
    var dynamicText = d.createElement("div");
    dynamicText.setAttribute("class", "dynamicText");

    var movieDutch = d.createElement("h2");
    movieDutch.setAttribute("id", "movieDutch");

    var movieOmschrijving = d.createElement("p");
    movieOmschrijving.setAttribute("id", "movieOmschrijving");

    var regiseur = d.createElement("p");
    regiseur.setAttribute("id", "regiseur");

    var schrijvers = d.createElement("p");
    schrijvers.setAttribute("id", "schrijvers");

    var acteurs = d.createElement("p");
    acteurs.setAttribute("id", "acteurs");

    var trailerLink = d.createElement("a");
    trailerLink.setAttribute("id", "trailerLink");

    dynamicCover.appendChild(dynamicCoverImg);

    movieContent.appendChild(dynamicCover);

    dynamicText.appendChild(movieDutch);
    dynamicText.appendChild(movieOmschrijving);

    dynamicText.appendChild(regiseur);
    dynamicText.appendChild(schrijvers);
    dynamicText.appendChild(acteurs);
    dynamicText.appendChild(trailerLink);

    movieContent.appendChild(dynamicText);

    updateMovie(eersteMovieNr);

    /*  ======================================================================  
    Functions
  =========================================================================== */
    function updateMovie(movieNr = 1) {
        var movie = movies[movieNr];
        movieDutch.textContent = movie.Title;
        movieOmschrijving.innerHTML = movie.omschrijving;
        regiseur.textContent = "Regie: " + movie.regiseur;
        schrijvers.textContent = "Schrijvers: " + movie.schrijvers;
        acteurs.textContent = "Acteurs: " + movie.acteurs;
        trailerLink.href = movie.trailerLink;
        trailerLink.textContent = "Bekijk de trailer";
        dynamicCoverImg.src = "images/" + movie.coverImage;
        dynamicCoverImg.alt = movie.Title;
    }

    // Verplaatst de dynamicCover div op schermen kleiner dan 1024px.
    if (windowWidth <= 1024) {
        // Verplaats de dynamicCover div op schermen kleiner dan 1024px
        if (dynamicCover && movieOmschrijving && regiseur) {
            movieOmschrijving.parentNode.insertBefore(dynamicCover, regiseur);
        }
    } else {
        // Op grotere schermen: doe niets, de positie is al correct.
    }

    /*  ======================================================================  
    Event binding
  =========================================================================== */
    var eventList = ["click"];

    for (hetEvent of eventList) {
        for (movieLink of movieMenuLinks) {
            movieLink.addEventListener(hetEvent, function(e) {
                if (e.type == "click") {
                    e.preventDefault();
                    let movieLinkNr = this.id.substring(1);
                    updateMovie(movieLinkNr);
                }
            });
        }
    }
}