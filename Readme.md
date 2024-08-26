# Parking homework

Parking garage simulator

## System requirements to run
- Docker
- Docker file system access to current folder in order to mount the db volume. This can be disabled by commenting out the volume mount in `compose.yaml` to keep the data within the container.
- Port 9000 available. This can also be changed in `compose.yaml`

## System requirements to dev
- Docker or a MongoDB instance
- Node (v20)
- yarn

## Running

Run the stack from the root folder:
```
docker-compose up
```

When all containers are running, point your browser to (http://localhost:9000)
