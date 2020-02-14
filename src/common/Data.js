/**
 * API routes
 * 
 * words/search?value={search}
 * words/read/{limit}/{level?} - pagination
 * words/get?limit={int}&offset={int}&level={str}
 * phrases/read/{limit} - pagination
 * exercises/search?value={search}
 * exercises/read/{limit}/{lesson?} - pagination
 * lessons
 */

const apiUri = 'https://summertime-sadness.herokuapp.com/api/';


export const Levels = ['A1', 'A2', 'B1', 'B2', 'B2.2', 'C1'];


const wordsLocal = function () {
    let words = {};

    Levels.forEach(element => {
        words[element] = {
            dontKnow: [],
            offset: 0,
            limit: 0,
            know: 0,
            wrong: 0,
            count: 895
        };
    });

    return words;
};


export const Data = {

    get: function(uri, options={}) {
        
        return fetch(uri, options)
            .then((response) => {
                return response.json();
            });
    }
};


export const Uris = {

    wordsSearch: apiUri + 'words/search',
    wordsRead: apiUri + 'words/read',
    wordsGet: apiUri + 'words/get',
    phrasesRead: apiUri + 'phrases/read',
    exrcisesSearch: apiUri + 'exercises/search',
    exrcisesRead: apiUri + 'exercises/read',
    lessons: apiUri + 'lessons',

};


export const Local = {

    defaultData: {
        sound: true,
        exercises: {},
        words: {
            levels: wordsLocal(),
            currentLevel: 'A1'
        }
    },

    setItem: function(key, data) {
        localStorage.setItem(key, data);
    },

    getItem: function(key) {
        return localStorage.getItem(key);
    },

    setData: function (data = Local.defaultData, key = 'learningEnglish') {
        localStorage.setItem(key, JSON.stringify(data));
    },

    getData: function (key='', keyLocal = 'learningEnglish') {
        const local = JSON.parse(localStorage.getItem(keyLocal));

        if (key) {

            return key.split('/').reduce((o, i) => o[i], local);
        }

        return local;
    }
};

