YUI().use('scrollview', 'scrollview-paginator', function(Y) {
	
	var scrollView = new Y.ScrollView({
        id: "scrollview",
        srcNode : '#scrollview-content',
        width : 480,
        flick: {
            minDistance:10,
            minVelocity:0.6,
            axis: "x"
        }
    });

	scrollView.plug(Y.Plugin.ScrollViewPaginator, {
        selector: 'li'
 	});

    scrollView.render();
/*
    var content = scrollView.get("contentBox");

    content.delegate("click", function(e) {
        // For mouse based devices, we need to make sure the click isn't fired
        // at the end of a drag/flick. We use 2 as an arbitrary threshold.
        if (Math.abs(scrollView.lastScrolledAmt) < 2) {
            alert(e.currentTarget.getAttribute("click"));
        }
    }, ".ph");

    // Prevent default image drag behavior
    content.delegate("mousedown", function(e) {
        e.preventDefault();
    }, ".ph");
*/
    Y.one('#scrollview-next').on('click', Y.bind(scrollView.pages.next, scrollView.pages));
    Y.one('#scrollview-prev').on('click', Y.bind(scrollView.pages.prev, scrollView.pages));

});