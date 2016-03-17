<?php
$ctx = hash_init('sha256');
hash_update($ctx, 'The quick brown fox ');
hash_update($ctx, 'jumped over the lazy dog.');
echo hash_final($ctx);
?>
