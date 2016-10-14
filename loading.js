;
(function(root, factory) {

    //amd 
    if(typeof define === 'function' && define.amd) {
        define(['$'], factory);
    } else if(typeof exports === 'object') { //CommonJS

        // Node, CommonJS之类的
        module.exports = factory(require('$'));
    } else {

        // 浏览器全局变量(root 即 window)
        root.Loading = factory(root.Zepto || root.jQuery || $);
    }
})(this, function($) {
    var Loading = function(CFG) {
        this.cfg = {
            target: CFG.target || null,
            text: '请稍微等候一下，牛牛正在努力加载中'
        }
        this.loadingTpl = '<div class="loading-content">' + 
                              '<img src="http://img4.tuniucdn.com/img/20160315/hotel_2016/common/loading_new.gif"></img>' + 
                              '<span class="loading-text">' + this.cfg.text + '</span>' + 
                          '</div>';
    } 
    Loading.prototype = {
    	renderUI: function() {
            $(this.cfg.target).append($(this.loadingTpl));
    	},
    	syncUI: function() {	
    		$(this.cfg.target).css({
                'position': 'relative',
                'text-align': 'center'
    		});
    		$(this.loadingTpl).css({
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50% -50%)' 
    		});
    		$(this.loadingTpl).find('img').css({
    			'display': 'block',
                'width': '120px',
                'height': '120px'
    		}); 
    		$('.loading-text').css({
                'color': 'green',
                'display': 'block',
                'margin-top': '20px',
                'font-size': '12px'
    		});
    	},
    	render: function() {
            this.renderUI();
    	    this.syncUI();
        },
        start: function() {
        	this.render();
        },
        destroy: function() {
            $(this.cfg.target).remove();
        }
    }
    return Loading;
});
