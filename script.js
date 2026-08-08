const video =
    document.getElementById("previewVideo");

const fileInput =
    document.getElementById("fileInput");

const importBtn =
    document.getElementById("importBtn");

const playBtn =
    document.getElementById("playBtn");

const playerSeek =
    document.getElementById("playerSeek");

const currentTime =
    document.getElementById("currentTime");

const totalTime =
    document.getElementById("totalTime");

const muteBtn =
    document.getElementById("muteBtn");

const emptyPreview =
    document.getElementById("emptyPreview");

const textOverlay =
    document.getElementById("textOverlay");

const textInput =
    document.getElementById("textInput");

const videoClip =
    document.getElementById("videoClip");

let currentFile = null;

let history = [];

let future = [];

let zoom = 100;


/* =========================
   IMPORT
========================= */

importBtn.onclick = () => {

    fileInput.click();

};


fileInput.onchange = () => {

    const file =
        fileInput.files[0];

    if(!file) return;

    currentFile = file;

    const url =
        URL.createObjectURL(file);

    video.src = url;

    video.style.display = "block";

    emptyPreview.style.display = "none";

    video.load();

    saveState();

};


/* =========================
   PLAY
========================= */

playBtn.onclick = () => {

    if(!video.src) return;

    if(video.paused){

        video.play();

        playBtn.textContent = "⏸";

    }else{

        video.pause();

        playBtn.textContent = "▶";

    }

};


video.onended = () => {

    playBtn.textContent = "▶";

};


/* =========================
   TIME
========================= */

function formatTime(seconds){

    if(!isFinite(seconds))
        return "00:00";

    const min =
        Math.floor(seconds / 60);

    const sec =
        Math.floor(seconds % 60);

    return String(min).padStart(2,"0")
        + ":" +
        String(sec).padStart(2,"0");

}


video.ontimeupdate = () => {

    if(!video.duration) return;

    playerSeek.value =
        video.currentTime /
        video.duration *
        100;

    currentTime.textContent =
        formatTime(video.currentTime);

};


video.onloadedmetadata = () => {

    totalTime.textContent =
        formatTime(video.duration);

};


/* =========================
   SEEK
========================= */

playerSeek.oninput = () => {

    if(!video.duration) return;

    video.currentTime =
        video.duration *
        playerSeek.value /
        100;

};


/* =========================
   MUTE
========================= */

muteBtn.onclick = () => {

    video.muted =
        !video.muted;

    muteBtn.textContent =
        video.muted ? "🔇" : "🔊";

};


/* =========================
   FILTERS
========================= */

function applyFilters(){

    const brightness =
        document.getElementById(
            "brightness"
        ).value;

    const contrast =
        document.getElementById(
            "contrast"
        ).value;

    const saturation =
        document.getElementById(
            "saturation"
        ).value;

    const blur =
        document.getElementById(
            "blur"
        ).value;

    video.style.filter =
        `brightness(${brightness}%)
         contrast(${contrast}%)
         saturate(${saturation}%)
         blur(${blur}px)`;

}


[
    "brightness",
    "contrast",
    "saturation",
    "blur"
].forEach(id => {

    document
        .getElementById(id)
        .oninput = applyFilters;

});


/* =========================
   VOLUME
========================= */

document
    .getElementById("volume")
    .oninput = function(){

        video.volume =
            this.value / 100;

    };


/* =========================
   SPEED
========================= */

document
    .getElementById("speed")
    .onchange = function(){

        video.playbackRate =
            Number(this.value);

        saveState();

    };


/* =========================
   TEXT
========================= */

textInput.oninput = () => {

    const value =
        textInput.value;

    textOverlay.textContent =
        value;

    if(value){

        textOverlay.style.display =
            "block";

    }else{

        textOverlay.style.display =
            "none";

    }

};


document
    .getElementById("textClip")
    .onclick = () => {

        textInput.focus();

    };


/* =========================
   ASPECT RATIO
========================= */

document
    .getElementById("aspectRatio")
    .onchange = function(){

        video.style.aspectRatio =
            this.value === "auto"
            ? "auto"
            : this.value;

    };


/* =========================
   SPLIT
========================= */

document
    .getElementById("splitBtn")
    .onclick = () => {

        if(!video.duration){

            alert("Import a video first.");

            return;

        }

        const percentage =
            video.currentTime /
            video.duration *
            100;

        const first =
            document.createElement("div");

        first.className =
            "timeline-clip";

        first.textContent =
            "🎬 Clip 1";

        first.style.left = "5px";

        first.style.width =
            percentage + "%";

        first.style.background =
            "#4d46c9";


        const second =
            document.createElement("div");

        second.className =
            "timeline-clip";

        second.textContent =
            "🎬 Clip 2";

        second.style.left =
            percentage + "%";

        second.style.width =
            (100 - percentage) + "%";

        second.style.background =
            "#756dff";


        const track =
            document.getElementById(
                "videoTrack"
            );

        track.innerHTML = "";

        track.appendChild(first);

        track.appendChild(second);

        saveState();

    };


/* =========================
   DELETE
========================= */

document
    .getElementById("deleteBtn")
    .onclick = () => {

        if(!video.src){

            alert("Nothing to delete.");

            return;

        }

        if(confirm("Delete current media?")){

            video.pause();

            video.removeAttribute("src");

            video.load();

            video.style.display =
                "none";

            emptyPreview.style.display =
                "block";

            document
                .getElementById("videoTrack")
                .innerHTML = "";

            saveState();

        }

    };


/* =========================
   DUPLICATE
========================= */

document
    .getElementById("duplicateBtn")
    .onclick = () => {

        const original =
            document.getElementById(
                "videoClip"
            );

        const copy =
            original.cloneNode(true);

        copy.id = "";

        copy.style.left =
            "50%";

        copy.style.background =
            "#857dff";

        document
            .getElementById("videoTrack")
            .appendChild(copy);

        saveState();

    };


/* =========================
   ZOOM
========================= */

document
    .getElementById("zoomInBtn")
    .onclick = () => {

        zoom += 10;

        updateZoom();

    };


document
    .getElementById("zoomOutBtn")
    .onclick = () => {

        zoom =
            Math.max(50, zoom - 10);

        updateZoom();

    };


function updateZoom(){

    document
        .getElementById("zoomValue")
        .textContent =
        zoom + "%";

    document
        .querySelectorAll(".timeline-clip")
        .forEach(clip => {

            clip.style.transform =
                `scaleX(${zoom / 100})`;

            clip.style.transformOrigin =
                "left center";

        });

}


/* =========================
   UNDO / REDO
========================= */

function saveState(){

    history.push({
        time:
            video.currentTime,

        speed:
            video.playbackRate,

        volume:
            video.volume,

        text:
            textInput.value
    });

    if(history.length > 30){

        history.shift();

    }

    future = [];

}


document
    .getElementById("undoBtn")
    .onclick = () => {

        if(history.length <= 1) return;

        const current =
            history.pop();

        future.push(current);

        const previous =
            history[history.length - 1];

        restoreState(previous);

    };


document
    .getElementById("redoBtn")
    .onclick = () => {

        if(!future.length) return;

        const state =
            future.pop();

        history.push(state);

        restoreState(state);

    };


function restoreState(state){

    if(video.duration){

        video.currentTime =
            Math.min(
                state.time,
                video.duration
            );

    }

    video.playbackRate =
        state.speed;

    video.volume =
        state.volume;

    textInput.value =
        state.text;

    textOverlay.textContent =
        state.text;

    textOverlay.style.display =
        state.text ? "block" : "none";

}


/* =========================
   TOOL BUTTONS
========================= */

document
    .querySelectorAll(".tool")
    .forEach(button => {

        button.onclick = () => {

            document
                .querySelectorAll(".tool")
                .forEach(x =>
                    x.classList.remove("active")
                );

            button.classList.add("active");

            const tool =
                button.dataset.tool;

            document
                .getElementById("panelTitle")
                .textContent =
                tool
                .charAt(0)
                .toUpperCase()
                + tool.slice(1);

        };

    });


/* =========================
   EXPORT
========================= */

document
    .getElementById("exportBtn")
    .onclick = async () => {

        if(!video.src){

            alert(
                "Import a video first."
            );

            return;

        }

        if(!video.captureStream){

            alert(
                "Your browser does not support browser export."
            );

            return;

        }

        const stream =
            video.captureStream();

        const recorder =
            new MediaRecorder(
                stream
            );

        const chunks = [];

        recorder.ondataavailable =
            event => {

                if(event.data.size){

                    chunks.push(
                        event.data
                    );

                }

            };


        recorder.onstop = () => {

            const blob =
                new Blob(
                    chunks,
                    {
                        type:
                        "video/webm"
                    }
                );

            const url =
                URL.createObjectURL(
                    blob
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "flix-video.webm";

            link.click();

            URL.revokeObjectURL(url);

        };


        video.currentTime = 0;

        recorder.start();

        video.play();

        video.onended = () => {

            recorder.stop();

        };

    };


/* INITIAL STATE */

saveState();
