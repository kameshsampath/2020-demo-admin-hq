# 2020-demo-admin-hq

For all settings, configure the variables in a .env folder, similar to the [.env.example](.env.example)

### DEV - run apps locally for development

`make dev-server`

`make dev-ui`

### BUILD - build images locally using s2i

`make build-server`

`make build-ui`

`make build`

### PUSH - push images to repository

`make push-server`

`make push-ui`

`make push`

### Minkube install

Data Grid:

<https://infinispan.org/infinispan-operator/1.1.x/operator.html>

kubectl get secret gamecache-infinispan-generated-secret \
  -o jsonpath="{.data.identities\.yaml}" | base64 --decode
