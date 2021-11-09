<?php
/**
 * Plugin Name: Earthquake Rest API
 * Plugin URI: http://ugurhalil.com
 * Description: Earthquake Rest Api
 * Version: 1.0
 * Author: Halil UĞUR
 * Author URI: http://ugurhalil.com
 */

function earthquake_data() {
    global $wpdb;
    $yourdata = $wpdb->get_results("SELECT * FROM earthquake WHERE is_read_by_device=0 ORDER BY id DESC LIMIT 1");

    return rest_ensure_response( $yourdata );
    header("Content-Type: application/json; charset=UTF-8");
};

function insert_earthquake_data($request) {
    global $wpdb;
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {
        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);
        $newrecord = $wpdb->insert( 'earthquake', array( 'count_of_app_use' => $decoded['count_of_app_use'], 'count_of_send_to_cloud' => $decoded['count_of_send_to_cloud']));
    };
    if($newrecord){
        return rest_ensure_response($newrecord);
    }else{
        return rest_ensure_response('failed');
    };

    header("Content-Type: application/json; charset=UTF-8");
};


function update_earthquake_data($request) {
    global $wpdb;
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if ($contentType === "application/json") {
        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);
        $updatedrecord = $wpdb->update( 'earthquake', array( 'count_of_app_use' => $decoded['count_of_app_use'], 'count_of_send_to_cloud' => $decoded['count_of_send_to_cloud'], 'is_read_by_device' => $decoded['is_read_by_device']), array('id' => $decoded['id']), array( '%s' ));
    };

    if($updatedrecord){
        return rest_ensure_response($updatedrecord);
    }else{
        return rest_ensure_response('failed');
    };

    header("Content-Type: application/json; charset=UTF-8");
};

add_action('rest_api_init', function() {
	register_rest_route('earthquake', 'last', [
		'methods' => 'GET',
		'callback' => 'earthquake_data',
	]);
	
	register_rest_route('earthquake', 'update', [
		'methods' => 'POST',
		'callback' => 'update_earthquake_data',
	]);
	
	register_rest_route('earthquake', 'add', [
		'methods' => 'POST',
		'callback' => 'insert_earthquake_data',
	]);
});