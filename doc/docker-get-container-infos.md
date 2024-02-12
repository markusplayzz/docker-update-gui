# Get docker container/image infos with `--format`

## Get a full summary in json-format

### Command

``` bash
# Container
docker container ls -a --format '{{ json . }}'

# Image
docker image ls -a --format '{{ json . }}'
```

### Example Output

``` json
// Container
{"Command":"\"/docker-entrypoint.…\"","CreatedAt":"2024-02-11 17:42:33 +0100 CET","ID":"650e2fd7314c","Image":"phpmyadmin","Labels":"org.opencontainers.image.url=https://github.com/phpmyadmin/docker#readme,org.opencontainers.image.version=5.2.1,com.docker.compose.image=sha256:bb1eaeafd9949e521ac43ef56aafb8fb0b757d62a2eeea486d36d7c9413ec1a7,com.docker.compose.oneoff=False,org.opencontainers.image.authors=The phpMyAdmin Team \u003cdevelopers@phpmyadmin.net\u003e,org.opencontainers.image.documentation=https://github.com/phpmyadmin/docker#readme,org.opencontainers.image.source=https://github.com/phpmyadmin/docker.git,com.docker.compose.config-hash=14814e734cbd7e6ca3ee18ef0eaafa9358791120534b57f05f9a011983d30eda,com.docker.compose.service=phpmyadmin,org.opencontainers.image.description=Run phpMyAdmin with Alpine, Apache and PHP FPM.,com.docker.compose.version=2.24.3,org.opencontainers.image.title=Official phpMyAdmin Docker image,org.opencontainers.image.vendor=phpMyAdmin,com.docker.compose.container-number=1,com.docker.compose.depends_on=,com.docker.compose.project=master,org.opencontainers.image.licenses=GPL-2.0-only,com.docker.compose.project.config_files=/home/markus/nextcloud-docker-dev/docker-compose.yml,com.docker.compose.project.working_dir=/home/markus/nextcloud-docker-dev,desktop.docker.io/wsl-distro=Ubuntu-20.04","LocalVolumes":"0","Mounts":"","Names":"master-phpmyadmin-1","Networks":"master_default","Ports":"","RunningFor":"26 hours ago","Size":"363kB (virtual 562MB)","State":"exited","Status":"Exited (0) 15 minutes ago"}

// Image
{"Containers":"N/A","CreatedAt":"2024-02-01 16:22:59 +0100 CET","CreatedSince":"11 days ago","Digest":"\u003cnone\u003e","ID":"bb1eaeafd994","Repository":"phpmyadmin","SharedSize":"N/A","Size":"562MB","Tag":"latest","UniqueSize":"N/A","VirtualSize":"561.9MB"}
```

## Format the output to needed things only

### Command

> Use the keys from the raw json output within this command. It is useful to format it in json, because then we have the quotation marks.

``` bash
# Container
docker container ls -a --format '{{ json .Names }} {{ json .State }}'

# Image
docker container ls -a --format '{{ json .ID }}'
```

### Example Output

``` json
// Container
"master-phpmyadmin-1" "exited"

// Image
"bb1eaeafd994"
```