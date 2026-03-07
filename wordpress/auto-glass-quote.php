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

// Handle POST submission early (before any output)
add_action('wp', function () {
    if (
        $_SERVER['REQUEST_METHOD'] === 'POST'
        && isset($_POST['auto_glass_quote'])
        && $_POST['auto_glass_quote'] === '1'
    ) {
        // Sanitize all fields
        $data = array(
            'vehicle_type'      => sanitize_text_field($_POST['vehicle_type'] ?? ''),
            'year'              => sanitize_text_field($_POST['year'] ?? ''),
            'make'              => sanitize_text_field($_POST['make'] ?? ''),
            'model'             => sanitize_text_field($_POST['model'] ?? ''),
            'glass_type'        => sanitize_text_field($_POST['glass_type'] ?? ''),
            'date'              => sanitize_text_field($_POST['date'] ?? ''),
            'time'              => sanitize_text_field($_POST['time'] ?? ''),
            'vin'               => sanitize_text_field($_POST['vin'] ?? ''),
            'first_name'        => sanitize_text_field($_POST['first_name'] ?? ''),
            'last_name'         => sanitize_text_field($_POST['last_name'] ?? ''),
            'email'             => sanitize_email($_POST['email'] ?? ''),
            'phone'             => sanitize_text_field($_POST['phone'] ?? ''),
            'postal_code'       => sanitize_text_field($_POST['postal_code'] ?? ''),
            'preferred_contact' => sanitize_text_field($_POST['preferred_contact'] ?? ''),
            'insurance_claim'   => sanitize_text_field($_POST['insurance_claim'] ?? ''),
            'notes'             => sanitize_textarea_field($_POST['notes'] ?? ''),
        );

        // --- EMAIL NOTIFICATION ---
        $to = get_option('admin_email'); // Change to your preferred email
        $subject = 'New Auto Glass Quote Request - ' . $data['first_name'] . ' ' . $data['last_name'];

        $body = "New Auto Glass Quote Request\n";
        $body .= "================================\n\n";
        $body .= "Vehicle: {$data['year']} {$data['make']} {$data['model']} ({$data['vehicle_type']})\n";
        $body .= "Glass Needed: {$data['glass_type']}\n";
        $body .= "VIN: {$data['vin']}\n\n";
        $body .= "Preferred Date: {$data['date']}\n";
        $body .= "Preferred Time: {$data['time']}\n\n";
        $body .= "Name: {$data['first_name']} {$data['last_name']}\n";
        $body .= "Email: {$data['email']}\n";
        $body .= "Phone: {$data['phone']}\n";
        $body .= "Postal Code: {$data['postal_code']}\n";
        $body .= "Preferred Contact: {$data['preferred_contact']}\n";
        $body .= "Insurance Claim: {$data['insurance_claim']}\n\n";
        $body .= "Notes:\n{$data['notes']}\n";

        wp_mail($to, $subject, $body);

        // --- OPTIONAL: Save to database ---
        // global $wpdb;
        // $wpdb->insert($wpdb->prefix . 'glass_quotes', $data);

        // Return a simple response for the XHR
        wp_send_json_success(array('message' => 'Quote request received.'));
        exit;
    }
});

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
