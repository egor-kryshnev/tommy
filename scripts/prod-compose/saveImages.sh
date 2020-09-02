#!/bin/bash
declare -a repos=(
"alphawolfsforce/tommy-client:latest"
"alphawolfsforce/tommy-server:latest"
"alphawolfsforce/access-token-service:latest"
"alphawolfsforce/rabbitmq:latest"
"redis:latest"
"docker.elastic.co/elasticsearch/elasticsearch:7.8.0"
"docker.elastic.co/kibana/kibana:7.8.0"
"docker.elastic.co/logstash/logstash:7.8.0"
"docker.elastic.co/beats/filebeat:7.8.0"
)


PARENT_DIR="images"
IMAGES=""


if [ -d $PARENT_DIR ]; then
    cd $PARENT_DIR
else
    mkdir $PARENT_DIR
    cd $PARENT_DIR
fi

for repo in "${repos[@]}";
    do
		tmp=${repo##*/}
        DIRECTORY=${tmp%:*}
        IMAGES="${IMAGES} ${repo}"
        echo $IMAGES
        echo "Pulling ${repo}"
        docker pull $repo
	done
docker image save $IMAGES -o "./images.tar"

unamestr='not Linux'
if [[ "$unamestr" == 'Linux' ]]; then 
	7z a -t7z -r "./images.7z" "./*"
else 
	'C:\Program Files\7-Zip\7z' a -t7z -r "./images.7z" "./*"
fi
