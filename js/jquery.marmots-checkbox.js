(function($) {
	$.widget("marmots.checkbox", {
		
		skins: ['large', 'blue', 'clear', 'fancy'],
		defaultValue: false,

		// default options
		options : {
			position : 'marmots-label-left',
			skin: ''
		},

		// the constructor
		_create : function() {
			var self = this;
			
			// Store default value for reseting
			this.defaultValue = this.element.is(':checked');
			
			// locate label next (right)
			var $label = this.element.next('label[for="' + this.element.attr('id') + '"]');
			// locate label prev (left)
			if ($label.length == 0) {
				$label = this.element.prev('label[for="' + this.element.attr('id') + '"]');
				if ($label.length > 0) {
					this.options.position = 'marmots-label-right';
				}
			}
			// locate label in all doc (default - left)
			if ($label.length == 0) {
				$label = $('label[for="' + self.element.attr('id') + '"]');
			}
			
			// disabled
			if(this.element.is(':disabled')){
				$label.addClass('disabled');
			} else {
				// add on click code
				$label.click(function() {
					if (self._isRadio()) {
						self.uncheckAll();
						self.check();
					} else {
						if (self.isChecked()) {
							self.uncheck();
						} else {
							self.check();
						}
					}
				});
			}
			
			// put element inside label
			$label.append(self.element);

			this._refresh();
		},
		// called when created, and later when changing options
		_refresh : function() {
			var $label = this._label();
			$label.addClass('ui-marmots-label-' + this._type());
			for(i in this.skins){
				$label.removeClass(this.skins[i]);
			}
			$label.addClass(this.options.skin);
			$label.addClass(this.options.position);

			if (this.element.is(':checked')) {
				$label.addClass('on');
			}
		},
		// _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function( key, value ) {
            // prevent invalid color values
            this._super( key, value );
        },
		_type : function() {
			return this.element.attr('type') == 'radio' ? 'radio' : 'check';
		},
		_isRadio : function() {
			return this._type() == 'radio';
		},
		_isCheck : function() {
			return this._type() == 'check';
		},
		_label : function() {
			return this.element.parent();
		},
		_destroy : function() {
			this.element.parent().removeClass('on');
			this.element.parent().removeClass('ui-marmots-label-' + this._type());
		},
		isChecked : function() {
			return this.element.is(':checked');
		},
		checked : function() {
			return this.element.is(':checked');
		},
		check : function() {
			if (this._isRadio()) {
				this.uncheckAll();
			}
			this.element.attr('checked', true);
			this.element.parent().addClass('on');
		},
		uncheck : function() {
			this.element.attr('checked', false);
			this.element.parent().removeClass('on');
		},
		toggle : function() {
			if (this.isChecked()) {
				this.check();
				
			} else {
				this.uncheck();
			}
		},
		uncheckAll : function() {
			var name = this.element.attr('name');
			$('input[name="' + name + '"]').checkbox('uncheck');
		},
		val : function() {
			if (this._isRadio()) {
				var name = this.element.attr('name');
				return $('input[name="' + name + '"]:checked').val();
			} else {
				return this.isChecked() ? this.element.val() : false;
			}
		},
		isRadio: function(){
			return this._isRadio();
		},
		isCheck: function(){
			return this._isCheck();
		},
		reset: function(){
			if (this.defaultValue) {
				this.check();
			} else {
				this.uncheck();
			}
		}
	});
})(jQuery);

$(document).ready(function(){
	$('input:checkbox, input:radio').checkbox();
	
	$(document).on('click', '.checkbox-trigger', function(){
		var $element = $($(this).attr('data-element'));
		var action = $(this).attr('data-action');
		$element.checkbox(action);
		return false;
	});
});