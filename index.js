var fs    = require('fs')
var fsp   = fs.promises;
var path = require('path');
class translateSystem {
    constructor (languageFileDirectory,option) {
        this.option = Object.assign({
            defaultLanguage: "Japan"
        },option);
        this.languageFileDirectory = languageFileDirectory
        this.languages = {};
    }
    async init() {
        (await fsp.readdir(this.languageFileDirectory)).filter(file => ((/(.*)\.lang\.json$/).test(file) && fs.statSync(path.join(this.languageFileDirectory,file)))).forEach(async file => this.languages[file.replace(/(.*)\.lang\.json$/,'$1')] = JSON.parse(fs.readFileSync(path.join(this.languageFileDirectory,file),'utf-8')));
    }
    trans( string, language = this.option.defaultLanguage ) {
        if(!(this.languages[language])) language = this.option.defaultLanguage;
        if(this.languages[language][string]) return this.languages[language][string];
        else {
            var paths = string.split(".");
            var last  = this.languages[language][paths[0]];
            if(!(last)) return string;
            for(var i=1;paths.length>i;i++) {
                last = last[paths[i]]
                if(!(last)) {
                    return string;
                }
            }
            return last;
        } 
    }
}
module.exports = translateSystem;
