YUI().use('scrollview', 'scrollview-paginator', function(Y) {
    Y.one('.photo').addClass('on'); 

    //FastClick.attach(document.body);   

    var e_width = Y.one('.photo').get('offsetWidth'),
	    scrollView = new Y.ScrollView({
            id: "scrollview",
            srcNode : '#scrollview-content',
            width : e_width,
            flick: {
                minDistance:10,
                minVelocity:0.8,
                axis: "x"
            }
        });

        console.log(e_width);

	scrollView.plug(Y.Plugin.ScrollViewPaginator, {
        selector: 'li'
 	});

    scrollView.render();

    Y.one('#scrollview-next').on('click', Y.bind(scrollView.pages.next, scrollView.pages));
    Y.one('#scrollview-prev').on('click', Y.bind(scrollView.pages.prev, scrollView.pages));

});