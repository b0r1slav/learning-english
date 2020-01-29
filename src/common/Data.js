/**
 * API routes
 * 
 * words/search?value={search}
 * words/read/{limit}/{level?} - pagination
 * words/get?limit={int}&offset={int}&id={int}&level={str}
 * phrases/read/{limit} - pagination
 * exercises/search?value={search}
 * exercises/read/{limit}/{lesson?} - pagination
 * lessons
 */

const apiUri = 'https://summertime-sadness.herokuapp.com/api/';


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
            dontKnow: [],
            offset: 0,
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

    getData: function (key = 'learningEnglish') {
        return JSON.parse(localStorage.getItem(key));
    }
};