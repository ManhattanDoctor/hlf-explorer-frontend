{{ define "nginx_conf" -}}
worker_processes 1;
daemon off;
include /etc/nginx/modules-enabled/*.conf;
error_log /dev/stderr;

events {
  worker_connections 1024;
  multi_accept on;
  use epoll;
}

http {
    log_format json_combined escape=json '{ "time_local": "$time_local", '
     '"host": "$host", '
     '"remote_addr": "$remote_addr", '
     '"remote_user": "$remote_user", '
     '"request": "$request", '
     '"status": "$status", '
     '"body_bytes_sent": "$body_bytes_sent", '
     '"request_time": "$request_time", '
     '"http_referrer": "$http_referer", '
     '"http_user_agent": "$http_user_agent" }';
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    set_real_ip_from 192.168.0.0/16;
    set_real_ip_from 10.0.0.0/8;
    set_real_ip_from 172.16.0.0/12;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    ssl_prefer_server_ciphers on;

    access_log /dev/stdout json_combined;
    error_log /dev/stderr;

    gzip on;
    gzip_disable "msie6";

    server {
        server_name _;
        listen 80;
        charset UTF-8;
        client_max_body_size 32M;

        access_log /dev/stdout json_combined;

        set_real_ip_from 0.0.0.0/0;
        root /app;
        try_files $uri $uri/ =404;
        index index.html;

        resolver {{ pluck .Values.global.env .Values.infra.kube_dns_resolver | first | default .Values.infra.kube_dns_resolver._default }};

        location /healthz {
            access_log off;
            return 200 "healthy\n";
        }

        location / {
            try_files $uri /index.html;
        }
    }
}
{{ end }}
