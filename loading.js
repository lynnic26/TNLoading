/*
 * Created with Sublime Text 3.
 * github: https://github.com/lynnic26/TNLoading
 * Author: Lynnic
 * Date: 2016-10-13
 * Contact: webfrontend@outlook.com
 */
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
        this.$loadingEl = null;
    } 
    Loading.prototype = {
    	renderUI: function() {
            this.$loadingEl = $(
                                    '<div class="loading-content">' + 
                                       '<img src="http://img4.tuniucdn.com/img/20160315/hotel_2016/common/loading_new.gif"></img><br>' + 
                                       '<span class="loading-text">' + this.cfg.text + '</span>' + 
                                    '</div>'
                                );
            if(this.cfg.target) {
                $(this.cfg.target).append(this.$loadingEl);
            } else {
                this.$mask = $('<div class="loading-mask"></div>');
                $('body').append(this.$mask).append(this.$loadingEl);
            }
        },
    	syncUI: function() {	
            if(this.cfg.target) {
                this.$loadingEl.css({
                    'text-align': 'center',
                    'width': '100%'
        		});
            } else {
                this.$mask.css({
                    'height': '100%',
                    'width': '100%',
                    'background-color': '#000',
                    'opacity': .1,
                    'position': 'fixed',
                    'left': 0,
                    'top': 0
                });
                this.$loadingEl.css({
                    'text-align': 'center',
                    'width': '100%',
                    'position': 'fixed',
                    'top': '50%',
                    'transform': 'translateY(-50%)'
                });
            }
    		this.$loadingEl.find('.loading-text').css({
                'color': 'green',
                'display': 'inline-block',
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
            if(this.cfg.target) {
                $(this.cfg.target).remove();
            }else {
                this.$mask.remove();
                this.$loadingEl.remove();
            }
        }
    }
    return Loading;
});
