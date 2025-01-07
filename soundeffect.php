<?php
/**
 * Plugin Name: Image Soundeffect
 * Plugin URI: https://github.com/stefangilgen/soundeffect
 * Description: Fügt Hover-Soundeffekte zu Bildern hinzu (DE, EN, FR, IT)
 * Version: 1.2.0
 * Requires at least: 5.0
 * Requires PHP: 7.2
 * Author: Stefan Gilgen
 * Author URI: https://stefangilgen.ch
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: soundeffect
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

// Debug-Ausgabe
error_log('Soundeffect Plugin wird geladen');

function soundeffect_register_block_assets() {
    wp_enqueue_script(
        'soundeffect-editor-script',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor')
    );

    // Debug-Ausgabe
    error_log('Editor Assets wurden registriert');
}
add_action('enqueue_block_editor_assets', 'soundeffect_register_block_assets');

function soundeffect_frontend_assets() {
    wp_enqueue_script(
        'soundeffect-frontend-script',
        plugins_url('js/frontend.js', __FILE__),
        array(),
        '1.0.1',
        true
    );
}
add_action('wp_enqueue_scripts', 'soundeffect_frontend_assets');

// Aktivierungshook hinzufügen
register_activation_hook(__FILE__, 'soundeffect_activate');

function soundeffect_activate() {
    // Debug-Ausgabe
    error_log('Soundeffect Plugin wurde aktiviert');
} 