/*
 *  YUI OwlCarousel v1.3.2
 *
 *  Copyright (c) 2014 justangon
 *  
 *
 *  Licensed under MIT
 *
 */

/*
if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
*/

YUI.add('justangon-lib', function (Y) {
	var node = Y.Node;

	Y.namespace("justangon").OwlCarousel = Y.Base.create ('OwlCarousel', Y.Widget, [], {
		initializer: function (cfg) {
			var base = this;

			base._triggerClassName = base.getClassName("trigger");

			base.Yelem = base.get('sliderNode');
			
			base.options = Y.mix(Y.justangon.OwlCarousel.options, cfg, true);
			
			base.userOptions = cfg;

			base.loadContent();

		}, 

		loadContent: function () {
			var base = this, url;
			//console.log(base.get('contentBox'));
			
			function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.owl) {
                        if (data.owl.hasOwnProperty(i)) {
                            content += data.owl[i].item;
                        }
                    }
                    base.Yelem.setHtml(content);
                }
                base.logIn();
            }

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.Yelem]);
            }

            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                Y.jsonp(url, getData);
            } else {
                base.logIn();
            }
		},

		logIn : function () {
            var base = this;

            base.Yelem.setData("owl-originalStyles", base.get('contentBox').get("style"))
                      .setData("owl-originalClasses", base.get('contentBox').get("class"));

            base.get('contentBox').setStyles({opacity: 0});
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        },

        checkBrowser : function () {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d" : support3d,
                "isTouch" : isTouch
            };
        },

        setVars : function () {
            var base = this;
            if (base.Yelem.get('children').length === 0) { return false; }
            
            base.baseClass();
            base.eventTypes();
            base.userItems = base.Yelem.all('.item');
            base.itemsAmount = base.userItems.size();
            base.wrapItems();
            base.owlItems = Y.all(".owl-item");
            base.owlWrapper = base.Yelem.one(".owl-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
        },

        baseClass : function () {
            var base = this,
                hasBaseClass = base.Yelem.hasClass(base.options.baseClass),
                hasThemeClass = base.Yelem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.Yelem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.Yelem.addClass(base.options.theme);
            }
        },

        eventTypes : function () {
            var base = this,
                types = {};

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = {
                    "s": ['owl|touchstart', "owl|mousedown"],
                    "e": ["owl|touchmove", "owl|mousemove"],
                    "x": ["owl|touchend", "owl|touchcancel", "owl|mouseup"]
                };
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = {
                    "s": ["owl|touchstart"],
                    "e": ["owl|touchmove"],
                    "x": ["owl|touchend", "owl|touchcancel"]
                };
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = {
                    "s": ["owl|mousedown"],
                    "e": ["owl|mousemove"],
                    "x": ["owl|mouseup"]
                };
            }

            base.ev_types.start = types.s;
            base.ev_types.move = types.e;
            base.ev_types.end = types.x;
        },

        wrapItems : function () {
            var base = this,
            	wrapper;

            base.userItems.each(function (n) { n.wrap('<div class="owl-item"></div>'); } );
            wrapper = Y.Node.create('<div class="owl-wrapper"></div>');
            wrapper.append(base.Yelem.get('children'));
            base.Yelem.append(wrapper);

            Y.one('.owl-wrapper').wrap('<div class="owl-wrapper-outer"></div>');
            base.Yelem.setStyle("display", "block");
            //wrapper.append(base.userItems.replace(wrapper));

            //base.userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            //base.get('contentBox').one(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            //base.wrapperOuter = base.get('contentBox').one(".owl-wrapper-outer");

            //base.get('contentBox').setStyle("display", "block");
        },

        customEvents : function () {
            /*jslint unparam: true*/
            var base = this;
            base.Yelem.on("owl|next", function () {
                base.next();
            });
            base.Yelem.on("owl|prev", function () {
                base.prev();
            });
            base.Yelem.on("owl|play", function (event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.Yelem.on("owl|stop", function () {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.Yelem.on("owl|goTo", function (event, item) {
                base.goTo(item);
            });
            base.Yelem.on("owl|jumpTo", function (event, item) {
                base.jumpTo(item);
            });
        },

        next : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentItem = 0;
                    speed = "rewind";
                } else {
                    base.currentItem = base.maximumItem;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        prev : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;
            } else {
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }
            if (base.currentItem < 0) {
                if (base.options.rewindNav === true) {
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
                } else {
                    base.currentItem = 0;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        goTo : function (position, speed, drag) {
            var base = this,
                goToPixel;

            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.Yelem]);
            }
            if (position >= base.maximumItem) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }

            base.currentItem = base.owl.currentItem = position;

            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singleItemTransition();
                return false;
            }
            
            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) {
                base.isCss3Finish = false;

                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);

                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        },

        jumpTo : function (position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.Yelem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.owl.currentItem = position;
            base.afterGo();
        },

        afterGo : function () {
            var base = this;

            base.prevArr.push(base.currentItem);
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevItem !== base.currentItem) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.Yelem]);
            }
            
        },

        onStartup : function () {
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.owlStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }
            base.play();

            Y.one(".owl-wrapper").setStyle("display", "block");

            if (!base.Yelem.hasClass(":visible")) {
                base.watchVisibility();
            } else {
                base.Yelem.setStyle("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.Yelem]);
            }
        },

        owlStatus : function () {
            var base = this;
            base.owl = {
                "userOptions"   : base.userOptions,
                "baseElement"   : base.Yelem,
                "userItems"     : base.userItems,
                "owlItems"      : base.owlItems,
                "currentItem"   : base.currentItem,
                "prevItem"      : base.prevItem,
                "visibleItems"  : base.visibleItems,
                "isTouch"       : base.browser.isTouch,
                "browser"       : base.browser,
                "dragDirection" : base.dragDirection
            };
        },

        stopOnHover : function () {
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.Yelem.on("mouseover", function () {
                	//console.log('mouse over');
                    base.stop();
                });
                base.Yelem.on("mouseout", function () {
                    if (base.hoverStatus !== "stop") {
                    	//console.log('mouse out');
                        base.play();
                    }
                });
            }
        },

        moveEvents : function () {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        },

        gestures : function () {
            /*jslint unparam: true*/
            var base = this,
                locals = {
                    offsetX : 0,
                    offsetY : 0,
                    baseElWidth : 0,
                    relativePos : 0,
                    position: null,
                    minSwipe : null,
                    maxSwipe: null,
                    sliding : null,
                    dargging: null,
                    targetElement : null
                };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x : event.touches[0].pageX,
                        y : event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x : event.pageX,
                            y : event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x : event.clientX,
                            y : event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    base.dm = Y.one('document').on(base.ev_types.move, dragMove);
                    base.de = Y.one('document').on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    base.dm.detach(base.ev_types.move);
                    base.de.detach(base.ev_types.end);
                }
            }

            function dragStart(event) {
            	//console.log(event);
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }

                if (base.browser.isTouch !== true && !base.owlWrapper.hasClass("grabbing")) {
                    base.owlWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                this.setStyles(base.removeTransition());

                position = this.getXY();
                //console.log(getTouches(ev).x);
                locals.relativePos = position[0];

                locals.offsetX = getTouches(ev).x - position[0];
                locals.offsetY = getTouches(ev).y - position[1];

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;
                //console.log(base.newRelativeX);

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    //console.log('dragging');
                    base.options.startDragging.apply(base, [base.Yelem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    var ggg = base.Yelem.detach("owl|touchmove");
                }

                minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }

            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    owlStopEvent;

                ev.target = ev.currentTarget || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.owlWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {
                    base.dragDirection = base.owl.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    /*
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                    	console.log('str');
                        ev.target.on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            ev.currentTarget.detach("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();
                        handlers.splice(0, 0, owlStopEvent);
                    }
                    */
                }
                swapEvents("off");
            }
            Y.one('#'+base.get('sliderNode').get('id')+' .owl-wrapper').on(base.ev_types.start, dragStart);
            //Y.delegate(base.ev_types.start, dragStart, '#'+base.get('sliderNode').get('id')+' .owl-wrapper');
            
        },

        getNewPosition : function () {
            var base = this,
                newPosition = base.closestItem();

            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition  = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        },

        disabledEvents :  function () {
            var base = this;
            base.Yelem.on("owl|dragstart", function (event) { event.preventDefault(); });
            base.Yelem.on("disableTextSelect|mousedown", function (e) {
                return e.currentTarget.hasClass('input, textarea, select, option');
            });
        },

        watchVisibility : function () {
            var base = this;

            if (base.Yelem.one(":visible") === false) {
                base.Yelem.setStyles({opacity: 0});
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function () {
                if (base.Yelem.one(":visible")) {
                    base.reload();
                    base.Yelem.animate({opacity: 1}, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        },

        updateItems : function () {
            var base = this, width, i;

            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singleItem === true) {
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }

            width = Y.one(base.options.responsiveBaseWidth).get('width');

            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }

            if (base.options.itemsCustom !== false) {
                //Reorder array by screen size
                base.options.itemsCustom.sort(function (a, b) {return a[0] - b[0]; });

                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }

            } else {

                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }

                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }

                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }

                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }

                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }

            //if number of items is less than declared
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        },

        calculateAll : function () {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        },

        calculateWidth : function () {
            var base = this;
            base.itemWidth = Math.round(base.Yelem.get('offsetWidth') / base.options.items);
        },

        appendWrapperSizes : function () {
            var base = this,
                width = base.owlItems.size() * base.itemWidth;

            base.owlWrapper.setStyles({
                "width": width * 2,
                "left": 0
            });
            base.appendItemsSizes();
        },

        appendItemsSizes : function () {
            var base = this,
                roundPages = 0,
                lastItem = base.itemsAmount - base.options.items;

            base.owlItems.each(function (i) {
                var that = this,
                	index = base.owlItems.indexOf(i);;
                that
                    .setStyles({"width": base.itemWidth})
                    .setData("owl-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {
                        roundPages += 1;
                    }
                }
                that.setData("owl-roundPages", roundPages);
            });
        },

        max : function () {
            var base = this,
                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
            }
            return maximum;
        },

        min : function () {
            return 0;
        },

        loops : function () {
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {
                    item = base.owlItems.item(i);
                    roundPageNum = item.getData("owl-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }

        },

        doTranslate : function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        },

        removeTransition : function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        transition3d : function (value) {
            var base = this;
            base.owlWrapper.setStyles(base.doTranslate(value));
        },

        closestItem : function () {
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            Y.Array.each(array, function (v, i) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = Y.Array.indexOf(base.positionsInArray, closest);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = Y.Array.indexOf(base.positionsInArray, closest);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        },

        moveDirection : function () {
            var base = this,
                direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            //console.log(direction);
            return direction;
        },

        swapSpeed : function (action) {
            var base = this;
            if (action === "slideSpeed") {
                base.owlWrapper.setStyles(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.owlWrapper.setStyles(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.owlWrapper.setStyles(base.addCssSpeed(action));
            }
        },

        addCssSpeed : function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        buildControls : function () {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = Y.Node.create('<div class="owl-controls"/>').toggleClass("clickable", !base.browser.isTouch).appendTo(base.Yelem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons : function () {
            var base = this,
                buttonsWrapper = Y.Node.create('<div class="owl-buttons"></div>');
            base.owlControls.append(buttonsWrapper);

            base.buttonPrev = Y.Node.create('<div class="owl-prev">'+base.options.navigationText[0] || ""+'</div>');

            base.buttonNext = Y.Node.create('<div class="owl-next">'+base.options.navigationText[1] || ""+'</div>');

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on(["owlControls|touchstart", "owlControls|mousedown"], function (event) {
                event.preventDefault();
            });
            /*
            Y.delegate(["owlControls|touchend", "owlControls|mouseup"], function (event) {
                event.preventDefault();
                
                if (this.hasClass("owl-next")) {
                    base.next();
                    console.log('next');
                } else {
                    base.prev();
                    console.log('prev');
                }
            }, '.owl-buttons', 'div');
			*/
			Y.one('.owl-next').on(["owlControls|touchend", "owlControls|mouseup"], function (event) {base.next();});
			Y.one('.owl-prev').on(["owlControls|touchend", "owlControls|mouseup"], function (event) {base.prev();});
        },

        buildPagination : function () {
            var base = this;

            base.paginationWrapper = Y.Node.create("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);

            Y.delegate(["owlControls|touchend", "owlControls|mouseup"], function (event) {
                event.preventDefault();
                
                if (Number(event.currentTarget.getData("owl-page")) !== base.currentItem) {
                    base.goTo(Number(event.currentTarget.getData("owl-page")), true);
                }
            },'.owl-pagination', '.owl-page');
        },

        updateControls : function () {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.owlControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.owlControls.hide();
                } else {
                    base.owlControls.show();
                }
            }
        },

        checkNavigation : function () {
            var base = this;

            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        },

        updatePagination : function () {
            var base = this,
                counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.setHTML("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = Y.Node.create('<div class="owl-page" />');
                    paginationButtonInner = Y.Node.create('<span></span>');
                    if (base.options.paginationNumbers === true) { 
                    	paginationButtonInner.addClass('owl-numbers'); 
                    	paginationButtonInner.setHTML(counter);
                    }
                    
                    paginationButton.append(paginationButtonInner);

                    paginationButton.setData("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.setData("owl-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        },

        checkPagination : function () {
            var base = this,
            	oItemDataArr;
            if (base.options.pagination === false) {
                return false;
            }
            oItemDataArr = base.owlItems.getData("owl-roundPages");
            base.paginationWrapper.all(".owl-page").each(function (i) {
                if (this.getData("owl-roundPages") === oItemDataArr[base.currentItem]) {
                    base.paginationWrapper
                        .all(".owl-page")
                        .removeClass("active");
                    this.addClass("active");
                }
            });
        },

        response : function () {
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = window.innerWidth;

            base.resizer = function () {
                if (window.innerWidth !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () {
                        lastWindowWidth = window.innerWidth;
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);
                }
            };
            Y.on('windowresize', base.resizer);
        },

        updateVars : function () {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.Yelem]);
            }
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.Yelem]);
            }
        },

        eachMoveUpdate : function () {
            var base = this;

            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisibleItems();

            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.Yelem]);
            }
        },

        onVisibleItems : function () {
            var base = this,
                i;

            if (base.options.addClassActive === true) {
                base.owlItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) {
                    base.owlItems.item(i).addClass("active");
                }
            }
            base.owl.visibleItems = base.visibleItems;
        },

        play : function () {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () {
                base.next(true);
            }, base.options.autoPlay);
        },

        lazyLoad : function () {
            var base = this,
                i,
                item,
                itemNumber,
                lazyImg,
                follow;

            if (base.options.lazyLoad === false) {
                return false;
            }

            //owlItemsArr = base.owlItems.getDOMNodes();

            base.owlItems.each (function (i) {
            	item = i;

            	if (item.getData("owl-loaded") === "loaded") {
                    return;
                }

                itemNumber = item.getData("owl-item");
                lazyImg = item.one(".lazyOwl");
                //console.log(lazyImg);
                if (typeof lazyImg.getData("src") !== "string") {
                    item.setData("owl-loaded", "loaded");
                    return;
                }
                if (item.getData("owl-loaded") === undefined) {
                    lazyImg.hide(); 
                    item.addClass("loading").setData("owl-loaded", "checked");
                }

                if (base.options.lazyFollow === true) {
                    follow = itemNumber >= base.currentItem;
                } else {
                    follow = true;
                }

                if (follow && itemNumber < base.currentItem + base.options.items && lazyImg) {
                    base.lazyPreload(item, lazyImg);
                }

            });

        },

        lazyPreload : function (item, lazyImg) {
        	
            var base = this,
                iterations = 0,
                isBackgroundImg,
                src;

            if (lazyImg.get("tagName") === "DIV") {
                lazyImg.setStyle("backgroundImage", "url(" + lazyImg.getData("src") + ")");
                isBackgroundImg = true;
            } else {
                lazyImg.set('src', lazyImg.getData("src"));
            }

            function showImage() {
                item.setData("owl-loaded", "loaded").removeClass("loading");
                lazyImg.removeAttribute("data-src");
                if (base.options.lazyEffect === "fade") {
                    lazyImg.show();
                } else {
                    lazyImg.show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.Yelem]);
                }
            }

            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg(lazyImg.getDOMNode()) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) {//if image loads in less than 10 seconds 
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }

            checkLazyImage();
        },

        completeImg : function (img) {
            var naturalWidthType;

            if (!img.complete) {
                return false;
            }
            
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        },

        transitionTypes : function (className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
        },

        updatePosition : function () {
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        },

        checkAp : function () {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        },

        play : function () {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () {
                base.next(true);
            }, base.options.autoPlay);
        },

        stop : function () {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        },

        addCssSpeed : function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        removeTransition : function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        transitionTypes : function (className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
        }

	}, {
		options: {
			test : 'test',
			sliderNode: null,
			items : 5,
	        itemsCustom : false,
	        itemsDesktop : [1199, 4],
	        itemsDesktopSmall : [979, 3],
	        itemsTablet : [768, 2],
	        itemsTabletSmall : false,
	        itemsMobile : [479, 1],
	        singleItem : false,
	        itemsScaleUp : false,

	        slideSpeed : 200,
	        paginationSpeed : 800,
	        rewindSpeed : 1000,

	        autoPlay : false,
	        stopOnHover : false,

	        navigation : false,
	        navigationText : ["&lt;", "&gt;"],
	        rewindNav : true,
	        scrollPerPage : false,

	        pagination : true,
	        paginationNumbers : false,

	        responsive : true,
	        responsiveRefreshRate : 200,
	        responsiveBaseWidth : window,

	        baseClass : "owl-carousel",
	        theme : "owl-theme",

	        lazyLoad : false,
	        lazyFollow : true,
	        lazyEffect : "fade",

	        autoHeight : false,

	        jsonPath : false,
	        jsonSuccess : false,

	        dragBeforeAnimFinish : true,
	        mouseDrag : true,
	        touchDrag : true,

	        addClassActive : false,
	        transitionStyle : false,

	        beforeUpdate : false,
	        afterUpdate : false,
	        beforeInit : false,
	        afterInit : false,
	        beforeMove : false,
	        afterMove : false,
	        afterAction : false,
	        startDragging : false,
	        afterLazyLoad: false
		},
		ATTRS: {
			
			sliderNode: null,
			items : 5,
	        itemsCustom : false,
	        itemsDesktop : [1199, 4],
	        itemsDesktopSmall : [979, 3],
	        itemsTablet : [768, 2],
	        itemsTabletSmall : false,
	        itemsMobile : [479, 1],
	        singleItem : false,
	        itemsScaleUp : false,

	        slideSpeed : 200,
	        paginationSpeed : 800,
	        rewindSpeed : 1000,

	        autoPlay : false,
	        stopOnHover : false,

	        navigation : false,
	        navigationText : ["&lt;", "&gt;"],
	        rewindNav : true,
	        scrollPerPage : false,

	        pagination : true,
	        paginationNumbers : false,

	        responsive : true,
	        responsiveRefreshRate : 200,
	        responsiveBaseWidth : window,

	        baseClass : "owl-carousel",
	        theme : "owl-theme",

	        lazyLoad : false,
	        lazyFollow : true,
	        lazyEffect : "fade",

	        autoHeight : false,

	        jsonPath : false,
	        jsonSuccess : false,

	        dragBeforeAnimFinish : true,
	        mouseDrag : true,
	        touchDrag : true,

	        addClassActive : false,
	        transitionStyle : false,

	        beforeUpdate : false,
	        afterUpdate : false,
	        beforeInit : false,
	        afterInit : false,
	        beforeMove : false,
	        afterMove : false,
	        afterAction : false,
	        startDragging : false,
	        afterLazyLoad: false
		}
	})
}, '0.1.0', {requires:['node', 'widget-base', 'base-build', "transition", 'event-custom', 'event']});