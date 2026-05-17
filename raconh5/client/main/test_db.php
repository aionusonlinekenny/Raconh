<?php
$conn = mysqli_connect("127.0.0.1", "root", "root", "cw02_game1");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully\n";
$res = mysqli_query($conn, "SELECT count(*) FROM t_role_data");
$row = mysqli_fetch_array($res);
echo "Total roles: " . $row[0];
?>
