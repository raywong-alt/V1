use HTTP::Daemon;
use HTTP::Status;
use File::Spec;

my $port = $ARGV[0] || 5173;
my $root = 'F:/V';

my $d = HTTP::Daemon->new(LocalPort => $port, ReuseAddr => 1) or die "Cannot start: $!";
print "Serving $root on http://localhost:$port\n";
$| = 1;

while (my $c = $d->accept) {
    while (my $r = $c->get_request) {
        my $path = $r->uri->path;
        $path = '/standalone.html' if $path eq '/' || $path eq '';
        $path =~ s|^/||;
        my $file = "$root/$path";
        if (-f $file) {
            my $ct = 'text/html';
            $ct = 'application/javascript' if $file =~ /\.js$/;
            $ct = 'text/css' if $file =~ /\.css$/;
            open my $fh, '<:raw', $file or next;
            local $/;
            my $body = <$fh>;
            close $fh;
            $c->send_response(HTTP::Response->new(200, 'OK', ['Content-Type' => $ct], $body));
        } else {
            $c->send_error(RC_NOT_FOUND);
        }
    }
    $c->close;
}
