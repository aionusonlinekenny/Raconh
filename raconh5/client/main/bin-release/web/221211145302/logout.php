<?php
/**
 * logout.php — destroy session and return to login
 * Place at: C:\xampp\htdocs\game\logout.php
 */
session_start();
session_unset();
session_destroy();
header('Location: login.php');
exit;
