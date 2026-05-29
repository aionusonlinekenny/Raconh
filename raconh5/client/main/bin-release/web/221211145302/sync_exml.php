<?php
/**
 * sync_exml.php
 * Embeds all EXML file contents into default.thm.json
 * Run via: php sync_exml.php  (from this directory)
 * Or access via browser: http://localhost/sync_exml.php
 */

$base    = __DIR__;
$thmPath = $base . '/resource/default.thm.json';

if (!file_exists($thmPath)) {
    die("ERROR: default.thm.json not found at $thmPath\n");
}

$data = json_decode(file_get_contents($thmPath), true);
if (!$data) {
    die("ERROR: Failed to parse default.thm.json\n");
}

$ok      = 0;
$missing = [];

foreach ($data['exmls'] as &$entry) {
    $filePath = $base . '/' . $entry['path'];
    if (file_exists($filePath)) {
        $entry['content'] = file_get_contents($filePath);
        unset($entry['gjs']);
        $ok++;
    } else {
        $missing[] = $entry['path'];
    }
}
unset($entry);

$json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
file_put_contents($thmPath, $json);

echo "✓ Synced $ok EXML files into default.thm.json\n";
if ($missing) {
    echo "⚠ Missing files (" . count($missing) . "):\n";
    foreach (array_slice($missing, 0, 5) as $m) echo "  - $m\n";
}
echo "Done! Refresh the browser to see changes.\n";
