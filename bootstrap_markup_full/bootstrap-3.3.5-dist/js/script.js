$(function() {
	var BlockView = Backbone.View.extend({
		className: 'row',
		template: _.template( $('#blockTpl').html() ),
		initialize: function() {
			this.render();
		},
		events: {
			'click .createList' : 'createList',
			'click .setUnits' : 'setUnits',
			'click .delete-block' : 'delete'
		},
		createList: function() {
			var $result = this.$el.find('.result');
			var from = parseFloat( this.$el.find('.fromHour').val() )*60;
			var till = parseFloat( this.$el.find('.tillHour').val() )*60;
			if (till < from) {
				till += 1440;
			}
			var hourUnit = 60/parseFloat( this.$el.find('.hourUnit').val() );
			
			$result.html('');
			
			for (var i = from, j = 1; i < till; i += hourUnit, j++) {
				
				var hoursFrom = Math.floor(i/60);
				if (hoursFrom > 23) hoursFrom -= 24;
				if (hoursFrom < 10) hoursFrom = '0' + hoursFrom;

				var minutesFrom = i%60;
				if (minutesFrom < 10) minutesFrom = '0' + minutesFrom;

				var textFrom = hoursFrom + ' : ' + minutesFrom;

				var hoursTill = Math.floor((i + hourUnit)/60);
				if (hoursTill > 23) hoursTill -= 24;
				if (hoursTill < 10) hoursTill = '0' + hoursTill;

				var minutesTill = (i + hourUnit)%60;
				if (minutesTill < 10) minutesTill = '0' + minutesTill;

				var textTill = hoursTill + ' : ' + minutesTill;

				var $intButton = $('<a>').addClass('btn btn-block btn-success');
				$intButton.text(j + ')  ' + textFrom + ' - ' + textTill);
				
				$result.append($intButton);
			}
			//this.$el.find('.panel-primary input').val('');
		},
		setUnits: function() {
			var $result = this.$el.find('.result');
			console.log($result);
			if ($result.find('a').length === 0) return;
			var values = this.$el.find('.appoint_string').val().split(',');
			if (values.length > 0) {
				values.forEach(function(item) {
					var index = parseFloat(item);
					$result.find('a').eq(index-1)
									.removeClass('btn-success')
									.addClass('btn-danger');
				});
			}
		},
		delete: function() {
			this.remove();
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});
	$('.container').append(new BlockView({$el: $('.row')}).el);
	$('.add-block').click(function() {
		var blockView = new BlockView({$el: $('.row')});
		$('.container').append(blockView.el);
	});
});