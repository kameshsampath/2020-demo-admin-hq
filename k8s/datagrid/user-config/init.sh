#!/usr/bin/env bash
set -e 

until [ -f /opt/infinispan/server/log/server.log ]
do
 printf "\n Waiting for Infinispan logs"
 sleep 3
done

( tail -f -n1 /opt/infinispan/server/log/server.log & ) | grep -q 'Infinispan Server 10.1.3.Final started' 

# tail -n1 -f /opt/infinispan/server/log/server.log | grep -q 'Infinispan Server 10.1.1.Final started' 

printf "\n\n######## Initializing Caches ########\n"

/opt/infinispan/bin/cli.sh -c "http://${HOSTNAME}:11222" --file=/user-config/batch

curl -v -d '{"id": "uuidv4", "state": "lobby"}' -H application/json "http://${HOSTNAME}:11222/rest/game/current-game"

printf "\n\n######## Cache Init Complete ########\n"

# Dont exit keep running
tail -f /dev/null