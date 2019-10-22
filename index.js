
// const key = "b8174a28";
// const url = "https://od-api.oxforddictionaries.com/api/v2/<endpoint>/<language_code>/<word_id>";

const http = require("https");
const axios = require("axios")

const app_id = "b8174a28"; // insert your APP Id
const app_key = "43d236e5cf03949edce3d5cbece260d2"; // insert your APP Key
const wordId = process.argv.slice(2);
const fields = "definitions";
const strictMatch = "false";


const options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
    method: "GET",
    headers: {
        'app_id': app_id,
        'app_key': app_key
    }
};

http.get(options, (resp) => {
    let body = '';
    resp.on('data', (d) => {
        body += d;
    });
    resp.on('end', () => {
        let parsed = JSON.parse(body);
        console.log(parsed)
        console.log(`${wordId} (Adjective)`)

        let wordDefinition = parsed.results[0].lexicalEntries[0].entries[0].senses;
        wordDefinition.forEach(el => {
            console.log(el.definitions.join(""));
        });
        console.log(`
Provided by: ${parsed.metadata.provider}`)
    });
});
