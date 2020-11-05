#!/bin/bash

IMAGE_NAME="aiotlabportal.azurecr.io/portal/app-frontend"
ENV=$1

if [ "$ENV" != 'stage' ] && [ "$ENV" != 'prod' ] && [ "$ENV" != 'sony-prod' ]; then
  echo "'stage' or 'prod' or 'sony-prod' environment only"
  exit 0
fi

IMAGE="${IMAGE_NAME}:${ENV}"

npm ci
npm run build-${ENV}
npm ci --production

docker build \
  --no-cache \
  --target production \
  --tag ${IMAGE} \
  .

docker login -u aiotlabportal aiotlabportal.azurecr.io
docker push ${IMAGE}