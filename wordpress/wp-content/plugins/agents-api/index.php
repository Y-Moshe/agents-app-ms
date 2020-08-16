<?php
/**
 * Plugin Name: Agents API
 * Description: Custom Endoints to the WordPress API for "Agents" page, a React app that uses this plugin.
 * Version: 1.0
 * Author: Moshe.N
 * Author URI: https://angular-dummy-project.herokuapp.com/
 */

define('DB_TABLE', 'wp_agents');
define('ERR_MESSAGE', 'An error occurred while trying to interact with the Database!');

// Will get all agents from the Database. only id, name and image will be given.
function get_agents($queryParams) {
  global $wpdb;

  $columns = 'id, name';
  if ( isset($queryParams['for']) && $queryParams['for'] == 'ms') {
    $columns = 'id, name, imgURL, locked';
  }

  $results;
  try {
    $results = $wpdb->get_results('SELECT ' . $columns . ' FROM ' . DB_TABLE);
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
      abilities,
      locked
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
  $isLocked = (int)trim($data['locked']);

  try {
    $query = $wpdb->prepare('INSERT INTO ' . DB_TABLE . ' (
      name,
      imgURL,
      role,
      biography,
      abilities,
      locked
    ) VALUES (
      %s,
      %s,
      %s,
      %s,
      %s,
      %d
    )', $name, $imgURL, $role, $biography, $abilities, $isLocked);
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
  $isLocked = (int)trim($data['locked']);
  
  try {
    $id = (int)trim($data['id']);
    if (isAgentLocked($id)) {
      return new WP_Error(403, 'Agent Locked, please contact admin to unlock agent.');
    }

    $query = $wpdb->prepare('UPDATE ' . DB_TABLE . ' SET
      name = %s,
      imgURL = %s,
      role = %s,
      biography = %s,
      abilities = %s,
      locked = %d
      WHERE id = %d'
    , $name, $imgURL, $role, $biography, $abilities, $isLocked, $id);
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
    $id = (int)trim($params['id']);
    if (isAgentLocked($id)) {
      return new WP_Error(403, 'Agent Locked, please contact admin to unlock agent.');
    }

    $query = $wpdb->prepare('DELETE FROM ' . DB_TABLE . ' WHERE id = %d', $id);
    $wpdb->query($query);
  } catch (Exception $error) {
    return ERR_MESSAGE;
  }
  
  return 'Agent has been successfully deleted';
}

// Will check aginst the database if the specified agent is locked
// returns a boolean (locked == 1)
function isAgentLocked($id) {
  // if admin lvl is 10, return false, means allow to change agent/delete
  if (_wp_get_current_user()->allcaps["level_10"]) {
    return false;
  }

  global $wpdb;

  $query = $wpdb->prepare('SELECT locked FROM ' . DB_TABLE . ' WHERE id = %d', $id);
  $results = $wpdb->get_results($query);

  return $results[0]->locked == 1;
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
    'callback' => 'get_agent'
  ));

  // add_agent
  register_rest_route('agents-api/v1', 'agents', array(
    'methods' => 'POST',
    'callback' => 'add_agent',
    'permission_callback' => function () {
      return current_user_can( 'edit_others_posts' );
    }
  ));

  // edit_agent
  register_rest_route('agents-api/v1', '/(?P<id>\d+)', array(
    'methods' => 'PATCH',
    'callback' => 'edit_agent',
    'permission_callback' => function () {
      return current_user_can( 'edit_others_posts' );
    }
  ));

  // delete_agent
  register_rest_route('agents-api/v1', '/(?P<id>\d+)', array(
    'methods' => 'DELETE',
    'callback' => 'delete_agent',
    'permission_callback' => function () {
      return current_user_can( 'edit_others_posts' );
    }
  ));

});

add_filter('jwt_auth_token_before_dispatch', 'add_user_info_jwt', 5, 2);

function add_user_info_jwt($data, $user) {

    // adding isLevel10 property to the return success object of jwt auth
    $data['isLevel10'] = $user->allcaps["level_10"];

    return $data;
}
