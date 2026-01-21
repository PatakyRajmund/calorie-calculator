FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./index.html /usr/share/nginx/html/
COPY ./styles /usr/share/nginx/html/styles/
COPY ./scripts /usr/share/nginx/html/scripts/

EXPOSE 80

CMD ["nginx","-g","daemon off;"]