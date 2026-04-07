$port = $args[0]
if (-not $port) { $port = 5173 }
$root = "F:\V"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port"
while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $path = $req.Url.LocalPath
    if ($path -eq '/' -or $path -eq '') { $path = '/standalone.html' }
    $file = Join-Path $root $path.TrimStart('/')
    if (Test-Path $file -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $ext = [System.IO.Path]::GetExtension($file)
        $mime = switch ($ext) {
            '.html' { 'text/html' }
            '.js'   { 'application/javascript' }
            '.css'  { 'text/css' }
            default { 'application/octet-stream' }
        }
        $res.ContentType = $mime
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $res.StatusCode = 404
    }
    $res.OutputStream.Close()
}
