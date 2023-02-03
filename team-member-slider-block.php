<?php
/**
 * Plugin Name:       Team Member Slider Block
 * Description:       A team member's gutenberg block with column and slider layout.
 * Requires at least: 5.9.3
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Krunal Bhimajiyani
 * Author URI:        https://profiles.wordpress.org/krunal265/
 * License:           GPL v2
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       team-members
 *
 * @package           Team Member Slider Block
 */

/**
 * Registering Block.
 */
function tmsb_create_block_team_member_slider_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'tmsb_create_block_team_member_slider_block_block_init' );

/**
 * Enqueue files for frontend.
 */
add_action(
	'wp_enqueue_scripts',
	function () {

		wp_enqueue_script( 'tmsb-slickerjs', plugins_url( 'assets/js/slick.js', __FILE__ ), array(), '1.0.0', true );

		wp_enqueue_script( 'tmsb-slickerminjs', plugins_url( 'assets/js/slick.min.js', __FILE__ ), array(), '1.0.0', true );

		wp_enqueue_style( 'tmsb-slickercss', plugins_url( 'assets/css/slick.css', __FILE__ ), array(), '1.0.0', 'all' );

		wp_enqueue_style( 'tmsb-slickerthemecss', plugins_url( 'assets/css/slick-theme.css', __FILE__ ), array(), '1.0.0', 'all' );

		wp_enqueue_script( 'tmsb-sliderjs', plugins_url( 'assets/js/slickerslider.js', __FILE__ ), array( 'jquery' ), '1.0.0', true );

		wp_enqueue_style( 'dashicons' );
	}
);

/**
 * Enqueue files for backend.
 */
add_action(
	'admin_enqueue_scripts',
	function () {

		wp_enqueue_style( 'tmsb-slickercss', plugins_url( 'assets/css/slick.css', __FILE__ ), array(), '1.0.0', 'all' );

		wp_enqueue_style( 'tmsb-slickerthemecss', plugins_url( 'assets/css/slick-theme.css', __FILE__ ), array(), '1.0.0', 'all' );

		wp_enqueue_script( 'tmsb-slickerjs', plugins_url( 'assets/js/slick.js', __FILE__ ), array(), '1.0.0', true );

		wp_enqueue_script( 'tmsb-slickerminjs', plugins_url( 'assets/js/slick.min.js', __FILE__ ), array(), '1.0.0', true );

	}
);
