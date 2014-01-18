var entries = [
    { 
    "s_photo": "limitless_005.jpg",  
    "id": "micha",
    "name": "邱惠琳", 
    "nick": "Micha Chiu", 
    "email": "float.lin@gmail.com", 
    "desc": "description",
    "works": [{"ch": "極境", "eng": "limitless"}], 
    "dir": "limitless"
    },

    {   
    "s_photo": "Xin_002.jpg",
    "id": "poho",
    "name": "陳柏合 & 王郁閔", 
    "nick": "Poho Chen & YuMin Wang", 
    "email": "poho.chen@gmail.com / aquapiscesw@gmail.com", 
    "desc": "",
    "works": [{"ch": "馨", "eng": "xin"}], 
    "dir": "xin"
    },


    {   
    "s_photo": "union_series_003.jpg",
    "id": "aenit",
    "name": "許家毓 & 陳世穎", 
    "nick": "Aenit Hsu & Sean Chen", 
    "email": "aenithsu@gmail.com / mix1010@gmail.com", 
    "desc": "",
    "works": [{"ch": "聯集系列", "eng": "union series"}], 
    "dir": "unionseries"
    },

    { 
    "s_photo": "makemoney_000.jpg",  
    "id": "aenit",
    "name": "許家毓 & 陳世穎", 
    "nick": "Aenit Hsu & Sean Chen", 
    "email": "aenithsu@gmail.com / mix1010@gmail.com", 
    "desc": "",
    "works": [{"ch": "兆財機", "eng": "make money"}], 
    "dir": "makemoney"
    },

    {
    "s_photo": "dryluffa_000.jpg",     
    "id": "tim & obey",
    "name": "郭映廷 & 連勤和", 
    "nick": "Timo Kuo", 
    "email": "yingtimkuo@gmail.com", 
    "desc": "",
    "works": [{"ch": "絲光", "eng": "dry luffa"}], 
    "dir": "dryluffa"
    },

    {   
    "s_photo": "susan_003.jpg", 
    "id": "tim & obey",
    "name": "郭映廷 & 連勤和", 
    "nick": "Timo Kuo", 
    "email": "yingtimkuo@gmail.com", 
    "desc": "",
    "works": [{"ch": "書山", "eng": "susan"}], 
    "dir": "susan"
    },

    {
    "s_photo": "spiritofhouse_001.jpg",    
    "id": "tim",
    "name": "郭映廷", 
    "nick": "Timo Kuo", 
    "email": "yingtimkuo@gmail.com", 
    "desc": "",
    "works": [{"ch": "窗氣", "eng": "spirit of house"}], 
    "dir": "spiritofhouse"
    },

    {
    "s_photo": "linearlight_003.jpg",    
    "id": "obey",
    "name": "連勤和", 
    "nick": "Obey Lien", 
    "email": "obey_lien@gmail.com", 
    "desc": "",
    "works": [{"ch": "光。線", "eng" : "linear light"}], 
    "dir": "linearlight"
    },

    {
    "s_photo": "meet_000.jpg",    
    "id": "jen",
    "name": "莊宜蓁", 
    "nick": "Jen Chuang", 
    "email": "wago39@gmail.com", 
    "desc": "",
    "works": [{"ch": "邂逅", "eng": "meet"}], 
    "dir": "meet"
    },

    {
    "s_photo": "sign_012.jpg",    
    "id": "lisa",
    "name": "謝宜珊", 
    "nick": "Lisa Hsieh", 
    "email": "lisa1206_tw@hotmail.com", 
    "desc": "",
    "works": [{"ch": "預見", "eng": "sign"}], 
    "dir": "sign"
    },

    {
    "s_photo": "goodtime_000.jpg",    
    "id": "luca",
    "name": "丁允邑", 
    "nick": "Luca Ting", 
    "email": "occur.design@gmail.com", 
    "desc": "",
    "works": [{"ch": "時光", "eng": "good time"}], 
    "dir": "goodtime"
    },

    {
    "s_photo": "measurementoftime_012.jpg",   
    "dir": "measurementoftime", 
    "id": "jim",
    "name": "黃政豪", 
    "nick": "Jim Huang", 
    "email": "hchenghao@gmail.com", 
    "desc": "",
    "works": [{"ch": "時間的量度", "eng": "time length"}]
    }

];

exports.getEntries = function() {
   return entries;
   }
    
exports.getEntry = function(id) {
    for(var i=0; i < entries.length; i++) {
        if(entries[i].dir == id) return entries[i];
    }
}

