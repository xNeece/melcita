/* ============================================
 E LEMENTOS        *
 ============================================ */

const openingScreen =
document.getElementById("opening-screen");

const openGiftButton =
document.getElementById("open-gift");

const mainContent =
document.getElementById("main-content");


/* Música */

const backgroundMusic =
document.getElementById("background-music");

const musicToggle =
document.getElementById("music-toggle");

const musicIcon =
document.getElementById("music-icon");


/* Libro */

const pages =
document.querySelectorAll(".page");

const previousButton =
document.getElementById("prev-page");

const nextButton =
document.getElementById("next-page");

const pageCounter =
document.getElementById("page-counter");


/* Voz */

const voiceAudio =
document.getElementById("voice-audio");

const voiceButton =
document.getElementById("voice-button");

const voiceIcon =
document.getElementById("voice-icon");

const voiceText =
document.getElementById("voice-text");

const voiceStatus =
document.getElementById("voice-status");


/* ============================================
 V ARIABLES        *
 ============================================ */

let currentPage = 0;

let musicStarted = false;

let musicPausedByUser = false;


/* ============================================
 A BRIR REGALO     *
 ============================================ */

openGiftButton.addEventListener("click", () => {

    /*
     E l navegador *permite reproducir audio porque
     esta acción proviene de un clic del usuario.
     */

    backgroundMusic.volume = 0.35;

    backgroundMusic
    .play()
    .then(() => {

        musicStarted = true;

        musicPausedByUser = false;

        updateMusicButton();

    })
    .catch((error) => {

        console.log(
            "No se pudo iniciar automáticamente la música:",
            error
        );

    });


    openingScreen.classList.add("fade-out");

    setTimeout(() => {

        openingScreen.style.display = "none";

        mainContent.classList.remove("hidden");

        showPage(0);

    }, 1000);

});


/* ============================================
 M ÚSICA           *
 ============================================ */

musicToggle.addEventListener("click", () => {

    if (backgroundMusic.paused) {

        backgroundMusic
        .play()
        .then(() => {

            musicPausedByUser = false;

            updateMusicButton();

        });

    } else {

        backgroundMusic.pause();

        musicPausedByUser = true;

        updateMusicButton();

    }

});


function updateMusicButton() {

    if (backgroundMusic.paused) {

        musicIcon.textContent = "▶";

        musicToggle.setAttribute(
            "aria-label",
            "Reproducir música"
        );

    } else {

        musicIcon.textContent = "Ⅱ";

        musicToggle.setAttribute(
            "aria-label",
            "Pausar música"
        );

    }

}


/* ============================================
 C AMBIO DE PÁGINAS*
 ============================================ */

function showPage(index, direction = "next") {

    if (index < 0 || index >= pages.length) {
        return;
    }


    pages.forEach(page => {

        page.classList.remove(
            "active",
            "page-exit-left",
            "page-exit-right"
        );

    });


    const page = pages[index];

    page.classList.add("active");

    currentPage = index;


    updatePageControls();

    updatePageCounter();


    /*
     P equeña anima*ción adicional
     para los elementos de la página.
     */

    animatePageElements(page);

}


/* ============================================
 A NIMACIÓN DE ELEM*ENTOS
 ============================================ */

function animatePageElements(page) {

    const elements =
    page.querySelectorAll(
        "h2, p, img, .hero-card, .message-card"
    );


    elements.forEach((element, index) => {

        element.animate(
            [
                {
                    opacity: 0,
                    transform:
                    "translateY(15px)"
                },
                {
                    opacity: 1,
                    transform:
                    "translateY(0)"
                }
            ],
            {
                duration: 500,
                delay: index * 60,
                easing: "ease-out",
                fill: "both"
            }
        );

    });

}


/* ============================================
 S IGUIENTE PÁGINA *
 ============================================ */

nextButton.addEventListener("click", () => {

    if (currentPage < pages.length - 1) {

        const oldPage =
        pages[currentPage];

        oldPage.classList.add(
            "page-exit-left"
        );


        setTimeout(() => {

            showPage(
                currentPage + 1,
                "next"
            );

        }, 180);

    }

});


/* ============================================
 P ÁGINA ANTERIOR  *
 ============================================ */

previousButton.addEventListener("click", () => {

    if (currentPage > 0) {

        const oldPage =
        pages[currentPage];

        oldPage.classList.add(
            "page-exit-right"
        );


        setTimeout(() => {

            showPage(
                currentPage - 1,
                "previous"
            );

        }, 180);

    }

});


/* ============================================
 C ONTROLES        *
 ============================================ */

function updatePageControls() {

    previousButton.disabled =
    currentPage === 0;


    nextButton.disabled =
    currentPage === pages.length - 1;

}


function updatePageCounter() {

    pageCounter.textContent =
    `${currentPage + 1} / ${pages.length}`;

}


/* ============================================
 T ECLADO          *
 ============================================ */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            openingScreen.style.display !==
            "none"
        ) {
            return;
        }


        if (event.key === "ArrowRight") {

            nextButton.click();

        }


        if (event.key === "ArrowLeft") {

            previousButton.click();

        }


        if (event.code === "Space") {

            /*
             E vita* que la barra espaciadora
             haga scroll.
             */

            event.preventDefault();

            musicToggle.click();

        }

    }
);


/* ============================================
 A UDIO DE VOZ     *
 ============================================ */

voiceButton.addEventListener(
    "click",
    () => {

        if (voiceAudio.paused) {

            /*
             G uard*amos si la música estaba
             sonando antes del mensaje.
             */

            if (!backgroundMusic.paused) {

                backgroundMusic.pause();

                musicPausedByUser = false;

            }


            voiceAudio
            .play()
            .then(() => {

                document
                .querySelector(".voice-page")
                .classList.add("playing");


                voiceIcon.textContent =
                "Ⅱ";


    voiceText.textContent =
    "Pausar mi mensaje";


                voiceStatus.textContent =
                "La música está pausada mientras me escuchás. 💛";

            })
            .catch(error => {

                console.log(
                    "No se pudo reproducir el audio:",
                    error
                );

            });

        } else {

            voiceAudio.pause();

            document
            .querySelector(".voice-page")
            .classList.remove("playing");


            voiceIcon.textContent =
            "▶";


    voiceText.textContent =
    "Continuar mi mensaje";


            voiceStatus.textContent =
            "El mensaje está pausado.";

        }

    }
);


/* ============================================
 C UANDO TERMINA EL* MENSAJE DE VOZ
 ============================================ */

voiceAudio.addEventListener(
    "ended",
    () => {

        document
        .querySelector(".voice-page")
        .classList.remove("playing");


        voiceIcon.textContent =
        "▶";


        voiceText.textContent =
        "Escuchar mi mensaje";


        voiceStatus.textContent =
        "Mensaje terminado. La música vuelve a sonar. 🌷";


        /*
         V olvemos *a reproducir la música
         automáticamente.
         */

        if (
            musicStarted &&
            musicPausedByUser === false
        ) {

            backgroundMusic
            .play()
            .then(() => {

                updateMusicButton();

            });

        }

    }
);


/* ============================================
 S I EL USUARIO CAM*BIA DE PÁGINA
 ============================================ */

pages.forEach(page => {

    page.addEventListener(
        "click",
        () => {

            /*
             N o ha*cemos nada aquí.
             Se deja el evento disponible
             para futuras interacciones.
             */

        }
    );

});


/* ============================================
 S WIPE PARA CELULA*R
 ============================================ */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
        event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
        event.changedTouches[0].screenX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const difference =
    touchStartX - touchEndX;


    /*
     I gnoramos mov*imientos muy pequeños.
     */

    if (Math.abs(difference) < 60) {
        return;
    }


    if (difference > 0) {

        nextButton.click();

    } else {

        previousButton.click();

    }

}


/* ============================================
 I NICIO           *
 ============================================ */

updatePageControls();

updatePageCounter();
