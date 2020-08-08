<?php
/**
 * Plugin Name: Agents API
 * Description: Custom Endoints to the WordPress API for "Agents" page, a React app that uses this plugin.
 * Version: 1.0
 * Author: Moshe.N
 * Author URI: https://angular-dummy-project.herokuapp.com/
 */

define('DB_TABLE', $table_prefix . 'agents');
define('ERR_MESSAGE', 'An error occurred while trying to interact with the Database!');

// Will get all agents from the Database. only id, name and image will be given.
function get_agents() {
  global $wpdb;

  $results;
  try {
    $results = $wpdb->get_results('SELECT id, name, imgURL FROM ' . DB_TABLE);
  } catch (Exception $error) {
    return ERR_MESSAGE;
  }
 
  return $results;
}

// Get a spcific agent data from the Database..
function get_agent($params) {
  global $wpdb;
  
  $results;
  try {
    $id = intval(trim($params['id']));

    $query = $wpdb->prepare('SELECT
      name,
      imgURL,
      role,
      biography,
      abilities
    FROM ' . DB_TABLE . ' WHERE id = %d', $id);
    $results = $wpdb->get_row($query);
  
    if (empty($results)) {
      return 'Agent not found';
    }
  } catch (Exception $error) {
    return ERR_MESSAGE;
  }

  return $results;
}

// Add new Agent from the Database..
function add_agent($data) {
  global $wpdb;

  $name = trim($data['name']);
  $imgURL = trim($data['imgURL']);
  $role = trim($data['role']);
  $biography = trim($data['biography']);
  $abilities = json_encode($data['abilities']);

  try {
    $query = $wpdb->prepare('INSERT INTO ' . DB_TABLE . ' (
      name,
      imgURL,
      role,
      biography,
      abilities
    ) VALUES (
      %s,
      %s,
      %s,
      %s,
      %s
    )', $name, $imgURL, $role, $biography, $abilities);
    $wpdb->query($query);

  } catch (Exception $error) {
    return ERR_MESSAGE;
  }

  return 'Agent has been successfully added!';
}

// Edit new Agent from the Database..
function edit_agent($data) {
  global $wpdb;
  
  $name = trim($data['name']);
  $imgURL = trim($data['imgURL']);
  $role = trim($data['role']);
  $biography = trim($data['biography']);
  $abilities = json_encode($data['abilities']);
  
  try {
    $id = intval(trim($data['id']));
    $query = $wpdb->prepare('UPDATE ' . DB_TABLE . ' SET
      name = %s,
      imgURL = %s,
      role = %s,
      biography = %s,
      abilities = %s
      WHERE id = %d'
    , $name, $imgURL, $role, $biography, $abilities, $id);
    $wpdb->query($query);
  
  } catch (Exception $error) {
    return ERR_MESSAGE;
  }
  
  return 'Agent has been successfully modified!';
}

// Delete Agent from the Database..
function delete_agent($params) {
  global $wpdb;
  
  try {
    $id = intval(trim($params['id']));
    $query = $wpdb->prepare('DELETE FROM ' . DB_TABLE . ' WHERE id = %d', $id);
    $wpdb->query($query);
  } catch (Exception $error) {
    return ERR_MESSAGE;
  }
  
  return 'Agent has been successfully deleted';
}

add_action('rest_api_init', function () {

  // get_agents
  register_rest_route('agents-api/v1', 'agents', array(
    'methods' => 'GET',
    'callback' => 'get_agents'
  ));

  // get_agent
  register_rest_route('agents-api/v1', '/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'get_agent',
  ));

  // add_agent
  register_rest_route('agents-api/v1', 'agents', array(
    'methods' => 'POST',
    'callback' => 'add_agent',
  ));

  // edit_agent
  register_rest_route('agents-api/v1', '/(?P<id>\d+)', array(
    'methods' => 'PATCH',
    'callback' => 'edit_agent',
  ));

  // delete_agent
  register_rest_route('agents-api/v1', '/(?P<id>\d+)', array(
    'methods' => 'DELETE',
    'callback' => 'delete_agent',
  ));

});
