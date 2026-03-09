FROM busybox:1.36

WORKDIR /srv
COPY index.html ./index.html
COPY calculator.html ./calculator.html
COPY index.js ./index.js
COPY style.css ./style.css
COPY Assets ./Assets

EXPOSE 8080
CMD ["httpd", "-f", "-p", "8080", "-h", "/srv"]
