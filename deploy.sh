    #!/bin/bash
    set -e  # Exit on error
    set -x  # Enable debugging

    # Login to Docker Hub
    echo '${{ secrets.DOCKERHUB_TOKEN }}' | docker login --username ${{ secrets.DOCKERHUB_USERNAME }} --password-stdin

    echo "Starting deployment as user: $(whoami)"

    # Pull the latest image
    docker pull greyfighter/prepre:nest-app-v2 

    # docker compose 
    docker-compose -f docker-compose.yml pull

    docker-compose -f docker-compose.yml up -d --force-recreate --scale nest-backend=3

    # Remove any lingering containers
    docker rm -f $(docker ps -a -q -f name=nest-backend) || true

    # Remove existing container names to avoid conflicts
    docker compose rm -f || true

    # Start fresh with new containers
    docker compose up -d --force-recreate --scale nest-backend=3

    # Verify deployment
    echo "Verifying deployment..."
    sleep 10  # Give containers time to start
    docker ps | grep nest-backend || echo "No nest-backend containers running"    echo "Number of running instances:"
    docker ps -q -f name=nest-backend | wc -l

    sshpass -p "${{ secrets.VPS_PASSWORD }}" ssh -i ~/.ssh/id_rsa admin@49.13.174.222 'bash -s' < deploy.sh
    rm deploy.sh