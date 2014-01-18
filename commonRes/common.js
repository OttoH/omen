var entries = [
    {   
    "id": "micha",
    "name": "邱惠琳", 
    "nick": "Micha Chiu", 
    "email": "float.lin@gmail.com", 
    "desc": "",
    "works": [{"ch": "極境", "eng": "limitless"}]
    },

    {   
    "id": "poho",
    "name": "陳柏合 & 王郁閔", 
    "nick": "Poho Chen & YuMin Wang", 
    "email": "poho.chen@gmail.com / aquapiscesw@gmail.com", 
    "desc": "",
    "works": [{"ch": "馨", "eng": "xin"}]
    },


    {   
    "id": "aenit",
    "name": "許家毓 & 陳世穎", 
    "nick": "Aenit Hsu & Sean Chen", 
    "email": "aenithsu@gmail.com / mix1010@gmail.com", 
    "desc": "",
    "works": [{"ch": "聯集系列", "eng": "union series"}, {"ch": "兆財機", "eng": "makemoney"}]
    },


    {   
    "id": "tim",
    "name": "郭映廷", 
    "nick": "Timo Kuo", 
    "email": "yingtimkuo@gmail.com", 
    "desc": "",
    "works": [{"ch": "絲光", "eng": "dryluffa"}, {"ch": "書山", "eng": "susan"}, {"ch": "窗氣", "eng": "spiritofhouse"}]
    },

    {   
    "id": "obey",
    "name": "連勤和", 
    "nick": "Obey Lien", 
    "email": "obey_lien@gmail.com", 
    "desc": "",
    "works": [{"ch": "絲光", "eng": "dry luffa"}, {"ch": "書山", "eng": "susan"}, {"ch": "光。線", "eng" : "linearlight"}]},

    {   
    "id": "jen",
    "name": "莊宜蓁", 
    "nick": "Jen Chuang", 
    "email": "wago39@gmail.com", 
    "desc": "",
    "works": [{"ch": "邂逅", "eng": "meet"}]
    },

    {   
    "id": "lisa",
    "name": "謝宜珊", 
    "nick": "Lisa Hsieh", 
    "email": "lisa1206_tw@hotmail.com", 
    "desc": "",
    "works": [{"ch": "預見", "eng": "sign"}]
    },

    {   
    "id": "luca",
    "name": "丁允邑", 
    "nick": "Luca Ting", 
    "email": "occur.design@gmail.com", 
    "desc": "",
    "works": [{"ch": "時光", "eng": "goodtime"}]
    },

    {   
    "id": "jim",
    "name": "黃政豪", 
    "nick": "Jim Huang", 
    "email": "hchenghao@gmail.com", 
    "desc": "",
    "works": [{"ch": "時間的量度", "eng": "measurementoftime"}]
    }

],

cover = [
        "data/work/goodtime/goodtime_002.jpg", 
        "data/work/limitless/limitless_011.jpg", 
        "data/work/limitless/limitless_016.jpg", 
        "data/work/spiritofhouse/spiritofhouse_002.jpg"
        ];

exports.getEntries = function() {
   return entries;
   }
    
exports.getEntry = function(id) {
    for(var i=0; i < entries.length; i++) {
        if(entries[i].id == id) return entries[i];
    }
}

exports.getCover = function() {
   return cover;
   }
