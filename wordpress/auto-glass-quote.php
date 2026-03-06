<?php
/**
 * Auto Glass Quote Form - WordPress Integration
 * 
 * SETUP:
 * 1. Clone the GitHub repo and run: npm install && npm run build
 * 2. Copy the dist/ folder contents to: /wp-content/themes/jupiterx/auto-glass-quote/
 * 3. Add this file to your theme: /wp-content/themes/jupiterx/auto-glass-quote.php
 * 4. Add to functions.php: require_once get_template_directory() . '/auto-glass-quote.php';
 * 5. Use shortcode [auto_glass_quote] in any page/post
 */

function auto_glass_quote_shortcode() {
    $base_url = get_template_directory_uri() . '/auto-glass-quote/';
    $base_path = get_template_directory() . '/auto-glass-quote/';
    
    // Find the built CSS and JS files (Vite adds hashes to filenames)
    $css_files = glob($base_path . 'assets/*.css');
    $js_files = glob($base_path . 'assets/*.js');
    
    ob_start();
    
    // Enqueue CSS
    if ($css_files) {
        foreach ($css_files as $css) {
            $css_url = $base_url . 'assets/' . basename($css);
            echo '<link rel="stylesheet" href="' . esc_url($css_url) . '">' . "\n";
        }
    }
    
    // Render container
    echo '<div id="root"></div>' . "\n";
    
    // Enqueue JS
    if ($js_files) {
        foreach ($js_files as $js) {
            $js_url = $base_url . 'assets/' . basename($js);
            echo '<script type="module" src="' . esc_url($js_url) . '"></script>' . "\n";
        }
    }
    
    return ob_get_clean();
}
add_shortcode('auto_glass_quote', 'auto_glass_quote_shortcode');
