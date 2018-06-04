<?php
/**
 * Enqueue scripts and styles.
 *
 * @since Dumont Website 1.0
 */
function dumont_scripts() {
	// Load our main stylesheet.
	wp_enqueue_style( 'bootstrap-style', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css' );
	wp_enqueue_style( 'dumont-style-dist', get_stylesheet_directory_uri() . '/build/static/css/main.css');
	wp_enqueue_style( 'dumont-style', get_stylesheet_uri() );
    
    wp_enqueue_script( 'dumont-script', get_stylesheet_directory_uri() . '/build/static/js/main.js' , array(), '1.0', true );
	$url = trailingslashit( home_url() );
	$path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );
	wp_scripts()->add_data( 'dumont-script', 'data', sprintf( 'var DumontSettings = %s;', wp_json_encode( array(
		'title' => get_bloginfo( 'name', 'display' ),
		'path' => $path,
		'URL' => array(
			'api_baseURL' => esc_url_raw( get_rest_url( null, '/wp/v2' ) ),
			'domain' => esc_url_raw( $url ),
			'theme_url' => esc_url_raw( get_bloginfo('template_url') ),
		),
	) ) ) );
}
add_action( 'wp_enqueue_scripts', 'dumont_scripts' );
// Add various fields to the JSON output
function celestial_register_fields() {
	// Add Author Name
	register_rest_field( 'post',
		'author_name',
		array(
			'get_callback'		=> 'celestial_get_author_name',
			'update_callback'	=> null,
			'schema'			=> null
		)
	);
	// Add Featured Image
	register_rest_field( 'post',
		'featured_image_src',
		array(
			'get_callback'		=> 'celestial_get_image_src',
			'update_callback'	=> null,
			'schema'			=> null
		)
    );
    // Add Published Date
	register_rest_field( 'post',
        'published_date',
        array(
            'get_callback'		=> 'celestial_published_date',
            'update_callback'	=> null,
            'schema'			=> null
        )
	);
}
add_action( 'rest_api_init', 'celestial_register_fields' );

function be_enable_vcard_upload( $mime_types ){
  $mime_types['vcf'] = 'text/x-vcard';
  return $mime_types;
}
add_filter('upload_mimes', 'be_enable_vcard_upload' );




function celestial_get_author_name( $object, $field_name, $request ) {
	return get_the_author_meta( 'display_name' );
}
function celestial_get_image_src( $object, $field_name, $request ) {
    if($object[ 'featured_media' ] == 0) {
        return $object[ 'featured_media' ];
    }
	$feat_img_array = wp_get_attachment_image_src( $object[ 'featured_media' ], 'thumbnail', true );
    return $feat_img_array[0];
}
function celestial_published_date( $object, $field_name, $request ) {
	return get_the_time('F j, Y');
}
function celestial_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'celestial_excerpt_length' );