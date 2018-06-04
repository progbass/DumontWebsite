<?php
/**
 * The main template file
 *
 * @package WordPress
 * @subpackage Dumont Mexico
 * @since Dumont Mexico
 */
 ?>
 <!DOCTYPE html>

 <html <?php language_attributes(); ?> class="no-js">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
        <title>DBB Dumont :: México</title>
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <div id="page" class="hfeed site">
            <div id="root">
            </div>
            <?php wp_footer(); ?>
        </div>			
    </body>
</html>