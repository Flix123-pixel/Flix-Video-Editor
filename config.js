/* =========================================
   FLIX VIDEO EDITOR
   CONFIGURATION FILE
   ========================================= */

const FLIX_CONFIG = {

    /* ==============================
       APP INFORMATION
    ============================== */

    app: {
        name: "Flix Video Editor",
        version: "3.0.0",
        developer: "Flix",
        theme: "dark"
    },


    /* ==============================
       VIDEO SETTINGS
    ============================== */

    video: {

        supportedFormats: [
            "video/mp4",
            "video/webm",
            "video/ogg",
            "video/mov"
        ],

        defaultVolume: 1,

        defaultSpeed: 1,

        speeds: [
            0.25,
            0.5,
            0.75,
            1,
            1.25,
            1.5,
            1.75,
            2
        ]

    },


    /* ==============================
       IMAGE SETTINGS
    ============================== */

    image: {

        supportedFormats: [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/gif"
        ],

        maximumSizeMB: 50

    },


    /* ==============================
       AUDIO SETTINGS
    ============================== */

    audio: {

        supportedFormats: [
            "audio/mp3",
            "audio/wav",
            "audio/ogg",
            "audio/mpeg"
        ],

        defaultVolume: 1,

        fadeIn: true,

        fadeOut: true

    },


    /* ==============================
       ASPECT RATIOS
    ============================== */

    aspectRatios: {

        original: "auto",

        landscape: "16 / 9",

        portrait: "9 / 16",

        square: "1 / 1",

        cinematic: "21 / 9"

    },


    /* ==============================
       EXPORT SETTINGS
    ============================== */

    export: {

        defaultFormat: "webm",

        formats: [
            "webm",
            "mp4"
        ],

        resolutions: [
            "360p",
            "480p",
            "720p",
            "1080p"
        ],

        fps: [
            24,
            30,
            60
        ],

        defaultResolution: "720p",

        defaultFPS: 30

    },


    /* ==============================
       EDITING FEATURES
    ============================== */

    features: {

        importVideo: true,

        importImages: true,

        importAudio: true,

        multipleClips: true,

        split: true,

        trim: true,

        delete: true,

        duplicate: true,

        undo: true,

        redo: true,

        text: true,

        filters: true,

        effects: true,

        transitions: true,

        speedControl: true,

        volumeControl: true,

        crop: true,

        rotate: true,

        flip: true,

        zoom: true,

        timelineZoom: true

    },


    /* ==============================
       FILTER SETTINGS
    ============================== */

    filters: {

        brightness: {
            min: 50,
            max: 150,
            default: 100
        },

        contrast: {
            min: 50,
            max: 150,
            default: 100
        },

        saturation: {
            min: 0,
            max: 200,
            default: 100
        },

        blur: {
            min: 0,
            max: 20,
            default: 0
        }

    },


    /* ==============================
       TEXT SETTINGS
    ============================== */

    text: {

        defaultFont: "Arial",

        defaultSize: 40,

        minimumSize: 10,

        maximumSize: 150,

        bold: true,

        italic: true,

        shadow: true,

        outline: true

    },


    /* ==============================
       TIMELINE SETTINGS
    ============================== */

    timeline: {

        minimumZoom: 50,

        maximumZoom: 300,

        defaultZoom: 100,

        tracks: [

            "video",

            "overlay",

            "text",

            "audio"

        ]

    },


    /* ==============================
       TRANSITIONS
    ============================== */

    transitions: [

        {
            name: "None",
            id: "none",
            duration: 0
        },

        {
            name: "Fade",
            id: "fade",
            duration: 500
        },

        {
            name: "Dissolve",
            id: "dissolve",
            duration: 500
        },

        {
            name: "Slide",
            id: "slide",
            duration: 500
        },

        {
            name: "Zoom",
            id: "zoom",
            duration: 500
        }

    ],


    /* ==============================
       AUTOSAVE
    ============================== */

    autosave: {

        enabled: true,

        interval: 10000

    },


    /* ==============================
       LIMITS
    ============================== */

    limits: {

        maximumUndoSteps: 50,

        maximumProjectFiles: 100,

        maximumImageSizeMB: 50,

        maximumAudioSizeMB: 200,

        maximumVideoSizeMB: 1000

    }

};


/* =========================================
   MAKE CONFIG AVAILABLE
   ========================================= */

window.FLIX_CONFIG = FLIX_CONFIG;
