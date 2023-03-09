function fetchJson(location, callback) {
    fetch(location).then(resp => {
        if (!resp.ok) {
            throw `Server error: [${resp.status}] [${resp.statusText}] [${resp.url}]`;
        }
        return resp.json();
    }).then(out => {
        callback(out)
    }).catch(err => {
        console.error("FetchError, ", err);
    });
}

function fetchXml(location, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let sitemapContent = this.responseText;
            let sitemapObject = parseXml(sitemapContent);
            callback(sitemapObject);
        }
    };
    xhttp.open('GET', location, true);
    xhttp.send();
}

function parseXml(xml) {
    return new DOMParser().parseFromString(xml, 'text/xml');
}

function generateHash(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function generateUniqueHash() {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}