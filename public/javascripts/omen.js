YUI().use('justangon-lib', function(Y) {
    Y.one('.photo').addClass('on'); 

    //FastClick.attach(document.body);   

    var e_width = Y.one('.photo').get('offsetWidth');
    
    new Y.justangon.OwlCarousel({
        sliderNode: Y.one("#scrollview-content"),
        lazyLoad : true,
        navigation : true,
        singleItem: true,
        pagination: false
      });

        console.log(e_width);
/*
	scrollView.plug(Y.Plugin.ScrollViewPaginator, {
        selector: 'li'
 	});

    scrollView.render();

    Y.one('#scrollview-next').on('click', Y.bind(scrollView.pages.next, scrollView.pages));
    Y.one('#scrollview-prev').on('click', Y.bind(scrollView.pages.prev, scrollView.pages));
*/
});