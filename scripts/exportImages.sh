COLOR="\033[1;33m"
NC='\033[0m'
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

echo -e "${COLOR}"
echo "Choose which images you want to export"
read -p "Tommy-Server (y/n): " server
read -p "Tommy-Client (y/n): " client
if [ "$server" == "y" ] || [ "$server" == "Y" ]
then
    read -p "Tommy-Server image tag: " serverimagetag
    echo -e "${NC}"
    cd ${SCRIPTPATH}/../tommy-server/
    docker build . -t tommy-server:$serverimagetag
    cd ..
    docker save -o tommy-server-$serverimagetag.tar tommy-server:$serverimagetag
    echo -e "${COLOR}"
    echo "Tommy-Server image [${tommy-server:$serverimagetag}] was exported to [tommy-server-$serverimagetag.tar]"
    echo -e "${NC}"
fi

if [ "$client" == "y" ] || [ "$client" == "Y" ]
then
    echo -e "${COLOR}"
    read -p "Tommy-Client image tag: " clientimagetag
    echo -e "${NC}"
    cd ${SCRIPTPATH}/../tommy-client/
    docker build . -t tommy-client:$clientimagetag
    cd ..
    docker save -o tommy-client-$clientimagetag.tar tommy-client:$clientimagetag
    echo -e "${COLOR}"
    echo "Tommy-Client image [${tommy-client:$clientimagetag}] was exported to [tommy-client-$clientimagetag.tar]"
    echo -e "${NC}"
fi
echo -e "${COLOR}"
echo "Don't forget to update github :)"
echo -e "${NC}"
sleep 2
exit