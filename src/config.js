

export default {
	domain: process.env.REACT_APP_STAGE === 'production' ?
		'http://dumont.com.mx' :
		'http://sumaweb.com/clientes/dumont/backend-2017',
	api_baseURL: process.env.REACT_APP_STAGE === 'production'
		? 'http://dumont.com.mx/wp-json/wp/v2'
		: 'http://sumaweb.com/clientes/dumont/backend-2017/wp-json/wp/v2',
	theme_url: process.env.REACT_APP_STAGE === 'production'
		? 'http://dumont.com.mx/wp-content/themes/dumont/static'
		: 'http://sumaweb.com/clientes/dumont/backend-2017/wp-content/themes/dumont/static'
}