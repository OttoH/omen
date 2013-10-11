YUI().use('node', 'event', 'anim', 'panel', function(Y) {
    var content_ind = Y.one('.content_ind'),
        content_ind_bar = Y.one('.content_ind .ind_title'),
        content_ind_title = Y.one('.content_ind .baseInfo .photoIntro .title'),
        content_ind_photo = Y.one('.content_ind .baseInfo .photoIntro .ind .headPhoto'),
        content_ind_name = Y.one('.content_ind .baseInfo .photoIntro .ind .intro .name'),
        content_ind_en_name = Y.one('.content_ind .baseInfo .photoIntro .ind .intro .en_name'),
        content_ind_email = Y.one('.content_ind .baseInfo .photoIntro .ind .intro .email'),
        content_ind_intro = Y.one('.content_ind .baseInfo .photoIntro .ind .desc'),
        content = Y.one('.content'),
        c_wrap = Y.one('.c_wrap'),
        desc_wrap = Y.one('.desc_wrap'),
        data = {},
        processingInstance,
        switchSketchState = function (on) {
            if (!processingInstance) {
                processingInstance = Processing.getInstanceById('sketch');
            }

            if (on) {
                processingInstance.loop();  // call Processing loop() function
                //alert("on");
            } else {
                processingInstance.noLoop(); // stop animation, call noLoop()
                //alert("off");
            }
        },
        curHandler = function (e) {
            var currentTarget = e.currentTarget,
                I, L, tempArr,
                temp = "";

            //console.log(data[currentTarget.get("id")][0]);

            e.preventDefault(currentTarget);

        
            content_ind_title.setHTML('<p>'+data[currentTarget.get("id")][0]+'</p>');
            content_ind_photo.setStyle("background", 'url(../data/head/'+data[currentTarget.get("id")][5]+'.jpg)');
            content_ind_name.setHTML(data[currentTarget.get("id")][1]);
            content_ind_en_name.setHTML(data[currentTarget.get("id")][2]);
            content_ind_email.setHTML(data[currentTarget.get("id")][3]);
            content_ind_intro.setHTML(data[currentTarget.get("id")][4]);
            

            Y.all(".slider ul li").setStyle("display", "inline-block");
            console.log(Y.all('.slider ul li:not([data-index*='+currentTarget.get("id")+'])'));
            Y.all('.slider ul li:not([data-index *='+currentTarget.get("id")+'])').setStyle("display", "none");

            content.hide();
            anim_content_hide.run();

            content_ind.show();
            anim_contentInd_show.run();
            content_ind_bar.show();

            switchSketchState(0);

            //content_ind.scrollIntoView(true);
            console.log("click");
        },
        closeHandler = function (e) {
            e.preventDefault();

            anim_contentInd_hide.run();
            content_ind.hide();
            content_ind_bar.hide();

            content.show();
            anim_content_show.run();

            //switchSketchState(1);
            //content.scrollIntoView(true);
            
            console.log("close click");
        },
        anim_content_show = new Y.Anim({
            node: ".content",
            to : {opacity: 1},
            easing: 'easeOut',
            duration: 0.8

        }),
        anim_content_hide = new Y.Anim({
            node: ".content",
            to : {opacity: 0},
            easing: 'easeOut',
            duration: 0.8

        }),
        anim_contentInd_show = new Y.Anim({
            node: ".content_ind",
            to : {opacity: 1},
            easing: 'easeOut',
            duration: 0.8

        }),
        anim_contentInd_hide = new Y.Anim({
            node: ".content_ind",
            to : {opacity: 0},
            easing: 'easeOut',
            duration: 0.8

        }),
        anim_descWrap_show = new Y.Anim({
            node: ".desc_wrap",
            to : {opacity: 1},
            easing: 'easeOut',
            duration: 1.6

        }),
        pPanel = new Y.Panel({
            srcNode: '#photoPanel',
            width: 800,
            height: 600,
            y: 47,
            x: 16,
            centered: true,
            modal: true,
            zIndex: 99,
            render: true,
            visible: false
        }),
        isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
    
    data["unionseries"] = ["聯集系列。Union Series", "許家毓 / 陳世穎", "Aenit Hsu / Sean Chen", "aenithsu@gmail.com / mix1010@gmail.com", "裂了又合，聯集曲木的構造，創造出結構融於外形的設計。「裂」象徵著一種預兆，不全然為不好的事物，抑或是一種新的可能性。", "aenit_sean"];
    data["makemoney"] = ["兆財機。MAKE MONEY", "許家毓 / 陳世穎", "Aenit Hsu / Sean Chen", "aenithsu@gmail.com / mix1010@gmail.com", "店家們祈求財源廣進，於是在計算錢的工具上黏附了錢幣。兆財機將等號的按鍵設計成可放入錢幣，在每次按下等號鍵時就等於叩響財源廣進之門，期待財神爺多多照拂。", "aenit_sean"];
    
    data["dryluffa"] = ["絲光。Dry Luffa", "郭映廷 / 連勤和", "Timo Kuo / Obey Lien", "yingtimkuo@gmail.com / obey_lien@gmail.com", "「兆」意指訊息的表徵。以有機物-絲瓜作為載體，為根本，藉由材料運用，型塑、模擬再現出自然有機的肌理，透過功能的延伸詮釋，讓光透過一絲一絲的紋理結構，完成物件與觀者間有機/無機連續地交互作用。", "tim_obey"];
    data["susan"] = ["書山。Susan", "郭映廷 / 連勤和", "Timo Kuo / Obey Lien", "yingtimkuo@gmail.com / obey_lien@gmail.com", "以乘載物-書堆疊成山的意像，作為重新定義書架、書與空間之間關係的設計邏輯，一座一座的書山成為空間中最美的造景。", "tim_obey"];
    data["rulben"] = ["魯班尺。Rul Ben's", "郭映廷 / 連勤和", "Timo Kuo / Obey Lien", "yingtimkuo@gmail.com / obey_lien@gmail.com", "", "tim_obey"];

    data["spiritofhouse"] = ["窗氣。Spirit of house", "郭映廷", "Timo Kuo", "yingtimkuo@gmail.com", "「兆」意指訊息的產生。以窗，為起始，其意即分隔兩異空間之介面，無論是由內而外，或由外而內，訊息皆於此穿透與傳遞。氣，可謂人氣、氣息，實為有機物與無機物間連續地交互作用。", "tim"];
    
    data["linearlight"] = ["光，線。Linear Light", "連勤和", "Obey Lien", "obey_lien@gmail.com", "最低限度架構出空間立體光景氛圍。", "obey"];

    data["xin"] = ["馨。Xin", "陳柏合 / 王郁閔", "Poho / YuMin Wang", "poho.chen@gmail.com / aquapiscesw@gmail.com", "透過反覆的實驗，藉由材質的特性與其特有之紋路，翻製結合成視覺與嗅覺獨特感受的馨。", "poho_yumin"];

    data["meet"] = ["邂逅。Meet", "莊宜蓁 / 蕭博文", "Jen Chuang", "wago39@gmail.com", "為了展現這個關係，作品分成兩個部分：一盞燈和一把凳。燈所代表的是天、風、雨，凳所代表的是地、山、澤，各有給予和承接的意象。而人坐在凳上，介於燈與凳之間，完整了邂逅的姿態。", "jen"];

    data["limitless"] = ["極境。Limitless", "邱惠琳", "Micha Chiu", "float.lin@gmail.com", "裂縫隱藏一種隱喻、無常變化著，再涉及個人經驗與情感時，織構如畫面般不同的景緻。極境與吉鏡作連結，將碎裂轉為一種圖紋，成為一種好的感受。過媒介，與環境產生的各種感觸不斷更迭循環。", "micha"];

    data["sign"] = ["預見。Sign", "謝宜珊", "Lisa Hsieh", "lisa1206_tw@hotmail.com", "探討人在操作使用物件時的心情，透過器物媒介觸發得以清楚看見生活中的慾望。一個媒介傳遞一則慾望，而一個開關切換一個氛圍，從思考一盞燈的可能性去創造與切換不同的氛圍構成，讓使用時預見自己的直覺慾望，轉而呈現後，遇見心情改變後的自己。", "lisa"];

    data["goodtime"] = ["時光。Good Time", "丁允邑", "Luca Ting", "occur.design@gmail.com", "時間是種抽象的概念；而感受時間最自然的方式就是觀察光的變化。陽光穿透朦朧灑落，增加了大地色彩的層次，若隱若現的光影，疊織成柔和隨性的氛圍。在忙碌緊湊的生活步調中，人們常常忘記那種坐在樹下享受陽光微風的片刻悠閒把美好的感受帶進生活裡，提醒人們去感受最原始自然的時光。", "luca"];

    data["measurementoftime"] = ["時間的量度。Measurement of time", "黃政豪", "Chenghao Huang", "hchenghao@gmail.com", "時間在現代的表現方式早已方便地簡化為時鐘以及數字等等方式，而作品主要想把過去需要仔細觀察的時間融入一物件中，藉由這物件表達時間的另外一種量度。", "jim"];

    //init
    if (isMobile.any()) { Y.one('#sketch').hide();}
    desc_wrap.hide();
    content_ind.hide();
    content_ind_bar.hide();
    //anim_contenInd_show.run();

    Y.one(".content_ind .close").on("click", closeHandler);
    
    c_wrap.on("click", function (e) {
        switchSketchState(0);

        c_wrap.hide();
        desc_wrap.show();
        anim_descWrap_show.run();

    });
    
    Y.delegate("click", curHandler, ".cList", "ul li a");

    //box.bindClick(Y.all('.slider ul li a'));

    Y.delegate("click", function (e) {
        
        var currentTarget = e.currentTarget;
        
        e.preventDefault();
        //console.log(pPanel._attrs.visible.value);

        Y.one('#photoPanel .img').setStyle("background", "url("+currentTarget.get('href')+")"); 
        Y.one('#photoPanel .img').setStyle("background-size", "contain"); 
        Y.one('#photoPanel .img').setStyle("background-position", "center"); 
        Y.one('#photoPanel .img').setStyle("background-repeat", "no-repeat"); 
        //Y.one('#photoPanel img').set("src", currentTarget.get("href")).show(); 

        pPanel.show();

        
    }, ".slider", "ul li a");

    //console.log(Y.all(".cList ul li"));
    Y.all(".cList ul li").each(function (childNode) { childNode.setStyle("width", String((Math.random() * 52)+48)+"%"); });


});
