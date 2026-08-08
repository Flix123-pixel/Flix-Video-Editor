/* =========================================================
   FLIX VIDEO EDITOR
   FIXED & STABLE SCRIPT
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const video = document.getElementById("previewVideo");
const fileInput = document.getElementById("fileInput");

const importBtn = document.getElementById("importBtn");
const topImportButton = document.getElementById("topImportButton");
const mediaTool = document.getElementById("mediaTool");

const playBtn = document.getElementById("playBtn");
const playerSeek = document.getElementById("playerSeek");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const muteBtn = document.getElementById("muteBtn");

const emptyPreview = document.getElementById("emptyPreview");

const textOverlay = document.getElementById("textOverlay");
const textInput = document.getElementById("textInput");

const videoClip = document.getElementById("videoClip");
const videoTrack = document.getElementById("videoTrack");

const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const saturation = document.getElementById("saturation");
const blur = document.getElementById("blur");
const volume = document.getElementById("volume");
const speed = document.getElementById("speed");
const aspectRatio = document.getElementById("aspectRatio");

const historyList = [];
const futureList = [];


/* =========================================================
   VARIABLES
   ========================================================= */

let currentFile = null;
let currentURL = null;

let zoom = 100;


/* =========================================================
   SAFE EVENT HELPER
   ========================================================= */

function onClick(element, callback){

    if(element){

        element.addEventListener(
            "click",
            callback
        );

    }

}


function onInput(element, callback){

    if(element){

        element.addEventListener(
            "input",
            callback
        );

    }

}


function onChange(element, callback){

    if(element){

        element.addEventListener(
            "change",
            callback
        );

    }

}


/* =========================================================
   IMPORT VIDEO
   ========================================================= */

function openVideoPicker(){

    if(!fileInput){

        alert(
            "File input nahi mila. " +
            "index.html mein fileInput hona chahiye."
        );

        return;

    }

    try{

        fileInput.value = "";

        fileInput.click();

    }catch(error){

        console.error(
            "Import error:",
            error
        );

        alert(
            "File picker open nahi ho paya."
        );

    }

}


/* =========================================================
   ALL IMPORT BUTTONS
   ========================================================= */

onClick(
    importBtn,
    openVideoPicker
);

onClick(
    topImportButton,
    openVideoPicker
);

onClick(
    mediaTool,
    openVideoPicker
);


/* =========================================================
   FILE SELECTED
   ========================================================= */

if(fileInput){

    fileInput.addEventListener(
        "change",
        function(event){

            const file =
                event.target.files &&
                event.target.files[0];

            if(!file){

                return;

            }


            /* Check file type */

            const isVideo =
                file.type.startsWith("video/");


            /*
             Browser kabhi-kabhi AVI/MKV
             ka MIME type empty deta hai.
             Isliye extension bhi check kar rahe hain.
            */

            const extension =
                file.name
                .split(".")
                .pop()
                .toLowerCase();


            const allowedExtensions = [
                "mp4",
                "webm",
                "mov",
                "m4v",
                "avi",
                "mkv",
                "ogv"
            ];


            if(
                !isVideo &&
                !allowedExtensions.includes(extension)
            ){

                alert(
                    "Please ek valid video file select karo."
                );

                return;

            }


            /* Remove previous URL */

            if(currentURL){

                URL.revokeObjectURL(
                    currentURL
                );

                currentURL = null;

            }


            currentFile = file;


            /* Create new URL */

            currentURL =
                URL.createObjectURL(file);


            /* Reset old video */

            if(video){

                video.pause();

                video.removeAttribute("src");

                video.load();

                video.src =
                    currentURL;

                video.style.display =
                    "block";

                video.load();

            }


            /* Hide empty screen */

            if(emptyPreview){

                emptyPreview.style.display =
                    "none";

            }


            /* Update timeline */

            if(videoClip){

                videoClip.textContent =
                    "🎬 " + file.name;

            }


            /* Reset player */

            if(playerSeek){

                playerSeek.value = 0;

            }


            if(currentTime){

                currentTime.textContent =
                    "00:00";

            }


            if(totalTime){

                totalTime.textContent =
                    "00:00";

            }


            /* Default volume */

            if(video){

                video.volume =
                    volume
                    ? Number(volume.value) / 100
                    : 1;

            }


            /* Save state */

            saveState();


            console.log(
                "Flix imported:",
                file.name
            );

        }
    );

}


/* =========================================================
   VIDEO LOADED
   ========================================================= */

if(video){

    video.addEventListener(
        "loadedmetadata",
        function(){

            if(totalTime){

                totalTime.textContent =
                    formatTime(video.duration);

            }

            if(currentTime){

                currentTime.textContent =
                    "00:00";

            }

            if(playerSeek){

                playerSeek.value = 0;

            }

        }
    );


    /* =====================================================
       TIME UPDATE
       ===================================================== */

    video.addEventListener(
        "timeupdate",
        function(){

            if(
                !isFinite(video.duration) ||
                video.duration <= 0
            ){

                return;

            }


            if(playerSeek){

                playerSeek.value =
                    (
                        video.currentTime /
                        video.duration
                    ) * 100;

            }


            if(currentTime){

                currentTime.textContent =
                    formatTime(
                        video.currentTime
                    );

            }

        }
    );


    /* =====================================================
       PLAY STATE
       ===================================================== */

    video.addEventListener(
        "play",
        function(){

            if(playBtn){

                playBtn.textContent =
                    "⏸";

            }

        }
    );


    video.addEventListener(
        "pause",
        function(){

            if(playBtn){

                playBtn.textContent =
                    "▶";

            }

        }
    );


    video.addEventListener(
        "ended",
        function(){

            if(playBtn){

                playBtn.textContent =
                    "▶";

            }

        }
    );


    /* =====================================================
       VIDEO ERROR
       ===================================================== */

    video.addEventListener(
        "error",
        function(){

            console.error(
                "Video error:",
                video.error
            );

            alert(
                "Video browser mein play nahi ho pa raha. " +
                "MP4 (H.264) video try karo."
            );

        }
    );

}


/* =========================================================
   FORMAT TIME
   ========================================================= */

function formatTime(seconds){

    if(
        !isFinite(seconds) ||
        seconds < 0
    ){

        return "00:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secondsPart =
        Math.floor(
            seconds % 60
        );


    return (
        String(minutes).padStart(2,"0")
        +
        ":"
        +
        String(secondsPart).padStart(2,"0")
    );

}


/* =========================================================
   PLAY / PAUSE
   ========================================================= */

onClick(
    playBtn,
    async function(){

        if(
            !video ||
            !video.src
        ){

            alert(
                "Pehle video import karo."
            );

            return;

        }


        try{

            if(video.paused){

                await video.play();

            }else{

                video.pause();

            }

        }catch(error){

            console.error(
                "Play error:",
                error
            );

            alert(
                "Video play nahi ho paya."
            );

        }

    }
);


/* =========================================================
   SEEK
   ========================================================= */

onInput(
    playerSeek,
    function(){

        if(
            !video ||
            !isFinite(video.duration) ||
            video.duration <= 0
        ){

            return;

        }


        video.currentTime =
            (
                Number(this.value) /
                100
            ) *
            video.duration;

    }
);


/* =========================================================
   MUTE
   ========================================================= */

onClick(
    muteBtn,
    function(){

        if(!video){

            return;

        }


        video.muted =
            !video.muted;


        if(muteBtn){

            muteBtn.textContent =
                video.muted
                ? "🔇"
                : "🔊";

        }

    }
);


/* =========================================================
   VOLUME
   ========================================================= */

onInput(
    volume,
    function(){

        if(!video){

            return;

        }


        video.volume =
            Number(this.value) / 100;

        saveState();

    }
);


/* =========================================================
   SPEED
   ========================================================= */

onChange(
    speed,
    function(){

        if(!video){

            return;

        }


        const value =
            Number(this.value);


        if(
            isFinite(value) &&
            value > 0
        ){

            video.playbackRate =
                value;

            saveState();

        }

    }
);


/* =========================================================
   FILTERS
   ========================================================= */

function applyFilters(){

    if(!video){

        return;

    }


    const b =
        brightness
        ? brightness.value
        : 100;


    const c =
        contrast
        ? contrast.value
        : 100;


    const s =
        saturation
        ? saturation.value
        : 100;


    const bl =
        blur
        ? blur.value
        : 0;


    video.style.filter =
        "brightness(" +
        b +
        "%) " +

        "contrast(" +
        c +
        "%) " +

        "saturate(" +
        s +
        "%) " +

        "blur(" +
        bl +
        "px)";

}


[
    brightness,
    contrast,
    saturation,
    blur
].forEach(
    function(element){

        onInput(
            element,
            applyFilters
        );

    }
);


/* =========================================================
   ASPECT RATIO
   ========================================================= */

onChange(
    aspectRatio,
    function(){

        if(!video){

            return;

        }


        if(
            this.value === "auto" ||
            !this.value
        ){

            video.style.aspectRatio =
                "auto";

            video.style.width = "";
            video.style.height = "";

            return;

        }


        video.style.aspectRatio =
            this.value;


        if(this.value === "16/9"){

            video.style.width =
                "80%";

            video.style.height =
                "auto";

        }


        if(this.value === "9/16"){

            video.style.height =
                "80%";

            video.style.width =
                "auto";

        }


        if(this.value === "1/1"){

            video.style.width =
                "60%";

            video.style.height =
                "auto";

        }

    }
);


/* =========================================================
   TEXT
   ========================================================= */

onInput(
    textInput,
    function(){

        if(!textOverlay){

            return;

        }


        const value =
            this.value.trim();


        textOverlay.textContent =
            value;


        textOverlay.style.display =
            value
            ? "block"
            : "none";

    }
);


/* =========================================================
   TEXT CLIP
   ========================================================= */

const textClip =
    document.getElementById(
        "textClip"
    );


onClick(
    textClip,
    function(){

        if(textInput){

            textInput.focus();

        }

    }
);


/* =========================================================
   SPLIT
   ========================================================= */

const splitBtn =
    document.getElementById(
        "splitBtn"
    );


onClick(
    splitBtn,
    function(){

        if(
            !video ||
            !video.duration
        ){

            alert(
                "Pehle video import karo."
            );

            return;

        }


        if(!videoTrack){

            alert(
                "Video timeline nahi mili."
            );

            return;

        }


        const percentage =
            (
                video.currentTime /
                video.duration
            ) * 100;


        if(
            percentage <= 0 ||
            percentage >= 100
        ){

            alert(
                "Split ke liye video ke beech mein position select karo."
            );

            return;

        }


        videoTrack.innerHTML = "";


        const first =
            document.createElement(
                "div"
            );

        first.className =
            "timeline-clip";

        first.textContent =
            "🎬 Clip 1";

        first.style.left =
            "5px";

        first.style.width =
            Math.max(
                10,
                percentage
            ) + "%";


        const second =
            document.createElement(
                "div"
            );

        second.className =
            "timeline-clip";

        second.textContent =
            "🎬 Clip 2";

        second.style.left =
            percentage + "%";

        second.style.width =
            Math.max(
                10,
                100 - percentage
            ) + "%";


        videoTrack.appendChild(
            first
        );

        videoTrack.appendChild(
            second
        );


        saveState();

    }
);


/* =========================================================
   DELETE
   ========================================================= */

const deleteBtn =
    document.getElementById(
        "deleteBtn"
    );


onClick(
    deleteBtn,
    function(){

        if(
            !video ||
            !video.src
        ){

            alert(
                "Nothing to delete."
            );

            return;

        }


        const ok =
            confirm(
                "Current video delete karna hai?"
            );


        if(!ok){

            return;

        }


        video.pause();


        if(currentURL){

            URL.revokeObjectURL(
                currentURL
            );

            currentURL = null;

        }


        currentFile = null;


        video.removeAttribute(
            "src"
        );

        video.load();


        video.style.display =
            "none";


        if(emptyPreview){

            emptyPreview.style.display =
                "block";

        }


        if(videoTrack){

            videoTrack.innerHTML =
                "";

        }


        if(videoClip){

            videoClip.textContent =
                "🎬 No video imported";

        }


        if(playerSeek){

            playerSeek.value =
                0;

        }


        if(currentTime){

            currentTime.textContent =
                "00:00";

        }


        if(totalTime){

            totalTime.textContent =
                "00:00";

        }


        saveState();

    }
);


/* =========================================================
   DUPLICATE
   ========================================================= */

const duplicateBtn =
    document.getElementById(
        "duplicateBtn"
    );


onClick(
    duplicateBtn,
    function(){

        if(!videoTrack){

            return;

        }


        const original =
            document.getElementById(
                "videoClip"
            );


        if(!original){

            return;

        }


        const copy =
            original.cloneNode(
                true
            );


        copy.removeAttribute(
            "id"
        );


        copy.style.left =
            "50%";


        copy.style.background =
            "#857dff";


        videoTrack.appendChild(
            copy
        );


        saveState();

    }
);


/* =========================================================
   ZOOM
   ========================================================= */

const zoomInBtn =
    document.getElementById(
        "zoomInBtn"
    );


const zoomOutBtn =
    document.getElementById(
        "zoomOutBtn"
    );


onClick(
    zoomInBtn,
    function(){

        zoom =
            Math.min(
                300,
                zoom + 10
            );

        updateZoom();

    }
);


onClick(
    zoomOutBtn,
    function(){

        zoom =
            Math.max(
                50,
                zoom - 10
            );

        updateZoom();

    }
);


function updateZoom(){

    const zoomValue =
        document.getElementById(
            "zoomValue"
        );


    if(zoomValue){

        zoomValue.textContent =
            zoom + "%";

    }


    document
        .querySelectorAll(
            ".timeline-clip"
        )
        .forEach(
            function(item){

                item.style.transform =
                    "scaleX(" +
     
