var entries = [{
    "id":1,
    "title":"兆 / OMEN", 
    "date": "2013 9/27 - 2013 10/6", 
    "desc": "兆，又為「始」，是一種人與環境事物彼此感應的關係。", 
    "expo": "台灣設計師週主題聯展", 
    "expo_en": "TWDW Theme Zone"}];

exports.getEntries = function() {
   return entries;
   }
    
exports.getEntry = function(id) {
    for(var i=0; i < entries.length; i++) {
        if(entries[i].id == id) return entries[i];
    }
}

