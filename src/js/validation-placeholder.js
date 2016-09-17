/**
 * Author: Nutlee
 * Date: 20160917
 * 兼容性 placeholder 及 valudation 验证接口
 * 
 */
;(function($) {
		var defaults = {
			'warn': false,
			'warnText': '错误',
			'warnClass': 'warn',
			'text': ''
		};
		function isSupportPlaceholder() {
			return 'placeholder' in document.createElement('input');
		}
		function initShow(data) {
			var $target = data.target,
				$placeholder = data.placeholderTarget,
				warnClass = data.warnClass,
				targetValue = $target.val(),
				$parent = $target.parent();

        	if ( !data.warn) {
            	if ( !targetValue ) {
            		// $placeholder.text(data.text);
	            	methods.show.call($target[0]);
            	}
            	// $target.val('');
        	} else if ( !$parent.hasClass(warnClass) ) {
        		data.targetValue = targetValue;
        		if (data.isSupportPlaceholder) {
        			$target.attr('placeholder', '');
        		}
        		$target.val('').parent().addClass(warnClass);
          		$placeholder.text(data.warnText);
        		methods.show.call($target[0]);
        	}	
        	
        	console.log(data.text+'隐藏时',targetValue);
        			
		}
		function initHide(data) {
			var className = data.warnClass,
				$target = data.target,
				targetValue = data.targetValue;

			if ( !$target.val() ) {
				$target.val(targetValue);
			} else {
				data.targetValue = $target.val();
			}
			if (data.isSupportPlaceholder) {
				$target.attr('placeholder', data.text);
			}
	    	$target.parent().removeClass(className);
	    	methods.hide.call($target);
	    	// $target.focus();
	    	
	    	console.log(data.text+'显示时', targetValue);
		}

		function setPlaceHolderOnIE(options) {
            var that = this,
            	data = $(this).data('placeholder'),
            	$parent = $(this).parent(),
            	$placeholder = data.placeholderTarget = $('<span>', {
                	'text': options.text,
               		'class': options.className
            	});
            // console.log($(this).data('placeholder'));


            methods.reposition.call($(this));
            $parent.append($placeholder).on('click.placeholder', function(event) {

            	initHide(data);
            }).on('blur.placeholder', 'input', function(event) {
            	initShow(data);
            	// methods.show.call(that);
            });
            return this;
		}
		function setPlaceHolderOnModern(placeholderText) {
			if (this.placeholder === '') {
				this.placeholder = placeholderText ;
			}
			// console.log(this.placeholder);
		}
		function setText($placeholder,text) {

		}
		function initData(options,isSupPlaceholder) {
			var $this = $(this);
    	    $this.data('placeholder', $.extend({},{
	        	'target': $this,
	        	'text': options.text,
	        	'isSupportPlaceholder': isSupPlaceholder
    	    },options));			
		}
        var methods = {
            init: function(options) {
            	options = $.extend({},defaults,options);
                return this.each(function() {
                	var $this = $(this),
                		data = $this.data('placeholder'),
                		placeholderText = options.text,
                		isSupPlaceholder = isSupportPlaceholder();

                	// console.log(this);
                	if (!data) {
                	   	initData.call(this,options,isSupPlaceholder);
                	} 
                	if ( isSupPlaceholder ) {
                		setPlaceHolderOnModern.call(this,placeholderText);
                	} else {
                		setPlaceHolderOnIE.call(this,options);
                	}
                });
            },
            destroy: function() {
                return this.each(function() {
                    var $this = $(this),
                        data = $this.data('placeholder');
                    if ( !data.isSupPlaceholder ) {
	                    data.target.parent().off('.placeholder');
	                    data.placeholderTarget.remove();
	                    $this.removeData('placeholder');
                    };
                });

            },
            reposition: function() { 
            	return this.each(function(index, el) {
            		var data = $(this).data('placeholder');
            		// console.log(data);
            
	            	if ( data && data.placeholderTarget) {
	            		
	            		var $placeholder = data.placeholderTarget,
	            			$target = data.target,
	            			$parent = $target.parent();

                        if ($parent.css('position') !== 'relative') {
                            $parent.css('position','relative');
                        }
	            		var	placeStyle = {
			            		"position": "absolute",
			            		"left": (function() {
			            			return $target[0].offsetLeft + ( (parseInt($target.css('margin-left'))) || 0) + ((parseInt($target.css('padding-left')))||0);
			            		})(),
			            		"top": (function() {
                                     return $target[0].offsetTop + ($target.outerHeight() - parseInt($target.css('font-size')) || 0)/2;
			            		})(),
			            		"color": "#666",
		            		};
		            	// console.dir( );
		            	// console.log( (parseInt($target.css('padding-left'))) || 0 );
		            	$placeholder.css(placeStyle);
	            	};
            	});
            },
            show: function() {
            	$(this).data('placeholder').placeholderTarget.show();
            },
            hide: function() {
            	$(this).data('placeholder').placeholderTarget.hide();
            },
           	updateHolderText: function(content) { 
           		return this.each(function(index, val) {
           			var $this = $(this),
           			    data = $this.data('placeholder');
           				$placeholder = data.placeholderTarget;
           			$placeholder.text(content);
           		});
           	},
           	showWarn: function(content) {
           		return this.each(function(index, val) {
           			var $this = $(this),
           			    data = $this.data('placeholder');
           				$placeholder = data.placeholderTarget;
           			data.warnText = content || data.warnText;
     				data.warn = true;
     				if ( data.isSupportPlaceholder && !data.placeholderTarget) {
     					$placeholder = data.placeholderTarget = $('<span>', { 'class': data.className});
     					data.target.parent().append($placeholder).on('click.placeholder', function(event) {
     						initHide(data);
     					}).on('blur.placeholder', 'input', function(event) {
     						initShow(data);
     						// methods.show.call(that);
     					});
     				};
     				methods.reposition.call($(this));
     				initShow(data);
           			// methods.show.call(this);
           		});           		
           	},
           	removeWarn: function() {
	      		return this.each(function(index, val) {
	      			var $this = $(this),
	      			    data = $this.data('placeholder');
	      				$placeholder = data.placeholderTarget;
	      			if (!data.warn) {
	      				return;
	      			};
					initHide(data);
	      			// methods.hide.call(this);
					data.warn = false;
	      		});    
           	}
        };

        $.fn.placeholder = function(method) {

            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.placeholder');
            }

        };
})(jQuery);
