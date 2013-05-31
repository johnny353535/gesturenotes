$(document).ready(function(){
    $('.slides>li').hammer({drag_lock_to_axis: true}).on('dragleft dragright dragdown release', handleGestures);

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

        case 'dragdown':
            if(_this.is(':first-child') || _this.is(':last-child')) break;

            console.log('dragdown');

            if(ev.gesture.deltaY < 60) _this.css('-webkit-transform', 'translate3d(0,'+ev.gesture.deltaY+'px,0)');

            break;

        case 'release':
            if(ev.gesture.deltaY === 0 && ev.gesture.deltaY === 0) break; // No gesture performed

            console.log('release');
            $('.slides>li').removeClass('noAnimation');
            // more then 50% moved, navigate

            if(ev.gesture.direction == 'right') {
                prev(_this);
            } else if(ev.gesture.direction == 'left') {
                next(_this);
            } else {
                resetPosition(_this);
            }

            break;
    }
}

function next(elem){
    elem.css('-webkit-transform', 'translate3d(-'+elem.outerWidth()+'px,0,0)');
}

function prev(elem){
    elem.next().show().css('-webkit-transform', 'translate3d(0,0,0)');
}

function resetPosition(elem){
    elem.css('-webkit-transform', 'translate3d(0,0,0)');
}