var Button = React.createClass({

	render: function() {
		return this.renderByType();
	},

	renderByType: function(){
		switch(this.props.type){
			case 'send-code':
				return this.renderButtonSendCode();
				break;
			case 'submit':
				return this.renderButtonSubmit();
				break;
		}
	},

	renderButtonSubmit: function(){

		var props = {
			type: "button",
			className: "btn " + this.props.data.className + " submit",
			onClick: this.eventSubmit
		}

		return(
			<button {...props}>
				{ this.props.data.text }
			</button>
		);
	},

	renderButtonSendCode: function(){

		var props = {
			className: "btn btn-info",
			type: "button",
			style: {
				padding: '10px 12px'
			},
			onClick: this.eventSendCode
		}

		return (
			<button {...props}>发送</button>
		);
	},

	// event

	eventSubmit: function(event){


		this.baseAjax(
			event,
			this.props.data.url,
			this.props.requestData(this.requestDataExtra()),
			this.props.data.callback
		)

	},

	eventSendCode: function(event){

		this.baseAjax(
			event,
			Url().auth.code,
			{
				phone: this.state.phone,
				type: type.props.data.typeSendCode
			},
			null
		);

	},

	// Tool

	requestDataExtra: function(){

		var data = {};

		// if special method
		if(this.props.data.method){
			data['_method'] = this.props.data.method;
		}

		return data;
	},

	baseAjax: function(event, url, data, callback){

		var button = $(event.target)

		button.attr('disabled', 'disabled');

		$.ajax({
			url: 	url,
			data: 	data,
			success: function(data, status, jqXHR){

				if(callback){
					callback(data, status, jqXHR);
				}

				Util.responseToHtmlSuccess(jqXHR);
			}.bind(this),
			complete: function(){
				button.removeAttr('disabled');
			},
		});
	},
});

module.exports = Button;