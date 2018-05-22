

export default {
	api_baseURL: process.env.REACT_APP_STAGE === 'production'
		? 'http://localhost/wp-json/wp/v2'
		: 'http://sumaweb.com/clientes/dumont/backend-2017/wp-json/wp/v2',
	theme_url: process.env.REACT_APP_STAGE === 'production'
		? 'http://localhost/wp-content/themes/dumont/static'
		: 'http://sumaweb.com/clientes/dumont/backend-2017/wp-content/themes/dumont/static'
}