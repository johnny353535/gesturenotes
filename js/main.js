$(document).ready(function(){

    $('.slides>li').hammer().on('dragleft dragright dragdown swipeleft swiperight release', handleGestures);

})

function handleGestures(ev){
    
    var _this = $(this);

    // disable browser scrolling
    ev.gesture.preventDefault();

    switch(ev.type) {
        case 'dragright': // o-->
            if(_this.is(':last-child')) break;
            _this.next().addClass('noAnimation');

            console.log('dragright')

            var offset = -(_this.outerWidth()-ev.gesture.deltaX);
            _this.next().show().css('-webkit-transform', 'translate3d('+offset+'px,0,0)');

            break;

        case 'dragleft': // <--o
            if(_this.is(':first-child')) break;
            _this.addClass('noAnimation');

            console.log('dragleft');

            _this.css('-webkit-transform', 'translate3d('+ev.gesture.deltaX+'px,0,0)');

            break;

        case 'swiperighta': // o-->
            if(_this.is(':last-child')) break;

            console.log('swiperight');

            prev(_this);
            ev.gesture.stopDetect();

            break;

        case 'swipelefta': // <--o
            if(_this.is(':first-child')) break;

            console.log('swipeleft');

            next(_this);
            ev.gesture.stopDetect();

            break;

        case 'dragdown':
            if(_this.is(':first-child') || _this.is(':last-child')) break;

            if(ev.gesture.deltaY < 60) _this.css('-webkit-transform', 'translate3d(0,'+ev.gesture.deltaY+'px,0)');

            break;
        case 'release':
            console.log('release');
            $('.slides>li').removeClass('noAnimation');
            // more then 50% moved, navigate

            if(ev.gesture.direction == 'right') {
                prev(_this);
            } else {
                next(_this);
            }

            /*
            if(Math.abs(ev.gesture.deltaX) > _this.outerWidth()/5) {
                if(ev.gesture.direction == 'right') {
                    prev(_this);
                } else {
                    next(_this);
                }
            }
            else { // reset
                if(ev.gesture.direction == 'right') {
                    _this.next().css('-webkit-transform', 'translate3d(-'+_this.outerWidth()+'px,0,0)');
                } else {
                    _this.css('-webkit-transform', 'translate3d(0,0,0)');
                }
            }
            */


            break;
    }
}

function next(elem){
    elem.removeClass('noAnimation').css('-webkit-transform', 'translate3d(-'+elem.outerWidth()+'px,0,0)');
}

function prev(elem){
    elem.next().show().removeClass('noAnimation').css('-webkit-transform', 'translate3d(0,0,0)');
}