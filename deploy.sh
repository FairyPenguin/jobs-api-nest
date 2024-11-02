#!/bin/bash
set -e  # Exit on error
set -x  # Enable debugging

# Login to Docker Hub
# echo '${{ secrets.DOCKERHUB_TOKEN }}' | docker login --username ${{ secrets.DOCKERHUB_USERNAME }} --password-stdin
echo "$DOCKERHUB_TOKEN" | docker login --username "$DOCKERHUB_USERNAME" --password-stdin

echo "Starting deployment as user: $(whoami)"

# Remove only the old containers for the nest-backend service

# Pull the latest image
# docker pull greyfighter/prepre:nest-app-v2 

# Navigate to the project directory
cd /opt/projects/backend-nest

# docker compose 
# docker-compose -f docker-compose.yml pull

docker-compose rm -f nest-backend || true

docker-compose rm -f backend-nest_database_1 || true

docker pull greyfighter/prepre:nest-app-v2


# docker-compose -f docker-compose.yml up -d --force-recreate --scale nest-backend=3

# Remove any lingering containers
docker rm -f $(docker ps -a -q -f name=nest-backend) || true
docker rm -f $(docker ps -a -q -f name=backend-nest_database_1) || true

# Remove existing container names to avoid conflicts
docker compose rm -f || true

docker-compose up -d --force-recreate --scale nest-backend=3
# Start fresh with new containers
# docker compose up -d --force-recreate --scale nest-backend=3



# Verify deployment
echo "Verifying deployment..."
sleep 10  # Give containers time to start
docker ps | grep nest-backend || echo "No nest-backend containers running"    echo "Number of running instances:"
docker ps -q -f name=nest-backend | wc -l

sleep 10

# Run the migration after  10 seconds of the container creation 
# docker-compose exec -T nest-backend pnpx prisma migrate deploy
docker-compose exec -T nest-backend sh -c 'export DATABASE_URL=postgresql://postgres:$(cat /run/secrets/database-password)@database:5432/nestdatabase && pnpx prisma migrate deploy'



 
: || {
a or --all: This option tells Docker to remove all unused images, not just the dangling ones. This means it will remove any images that are not currently associated with a container, regardless of whether they have a tag.
f or --force: This option forces the removal of the images without prompting for confirmation. It’s useful for automation or scripts where you don’t want to manually confirm the action.
}

# Remove all unused images (those not in use by any container)
docker image prune -a -f

# sshpass -p "$VPS_PASSWORD" ssh -i ~/.ssh/id_rsa admin@49.13.174.222 'bash -s' 
# cd # Navigate to the project directory # cd #
cd /opt/projects/backend-nest/scripts
echo ${pwd}
sudo rm deploy.sh