<?php
/**
 * Plugin Name:       Team Member Slider Block
 * Description:       A team members slider gutenberg block.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Krunal Bhimajiyani
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       team-members
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_team_member_slider_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_team_member_slider_block_block_init' );

add_action(
	'wp_enqueue_scripts',
	function () {

		wp_enqueue_script( 'tmsb-slickerjs', plugins_url( 'assets/js/slick.js', __FILE__ ), array(), null, true );

		wp_enqueue_script( 'tmsb-slickerminjs', plugins_url( 'assets/js/slick.min.js', __FILE__ ), array(), null, true );

		wp_enqueue_style( 'tmsb-slickercss', plugins_url( 'assets/css/slick.css', __FILE__ ), array(), false, 'all' );

		wp_enqueue_style( 'tmsb-slickerthemecss', plugins_url( 'assets/css/slick-theme.css', __FILE__ ), array(), false, 'all' );

		wp_enqueue_script( 'tmsb-sliderjs', plugins_url( 'assets/js/slickerslider.js', __FILE__ ), array( 'jquery' ), '1.0.0', true );
	}
);
add_action(
	'admin_enqueue_scripts',
	function () {

		wp_enqueue_style( 'tmsb-slickercss', plugins_url( 'assets/css/slick.css', __FILE__ ), array(), false, 'all' );

		wp_enqueue_style( 'tmsb-slickerthemecss', plugins_url( 'assets/css/slick-theme.css', __FILE__ ), array(), false, 'all' );

		wp_enqueue_script( 'tmsb-slickerjs', plugins_url( 'assets/js/slick.js', __FILE__ ), array(), null, true );

		wp_enqueue_script( 'tmsb-slickerminjs', plugins_url( 'assets/js/slick.min.js', __FILE__ ), array(), null, true );

	}
);
