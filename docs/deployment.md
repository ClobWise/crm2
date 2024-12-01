# Dokku Deployment

## Docker image building

```bash
docker build -t crm .
docker build --platform linux/amd64 -t crm .
```

## App setup

```bash
dokku apps:create clobwise
```

### Database setup

```bash
# Create a backing database.
dokku postgres:create clobwise-db --image "postgres" --image-version "16.4"

# Link postgres to clobwise.
dokku postgres:link clobwise-db clobwise

```

### Environment variables

```bash
dokku config:set clobwise APP_HOST="http://localhost:4000"
dokku config:set clobwise API_HOST="http://localhost:4001"
dokku config:set clobwise SESSION_SECRET="SOME_RANDOM_VALUE"
```

### Deployment

```bash
dokku git:from-image clobwise mistyharsh/clobwise:0.2.0
```

### SSL setup

```bash
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git

# Onetime setup
dokku letsencrypt:set --global email app@clobwise.com

# Link app to the domain
dokku domains:set clobwise app.clobwise.com

# Setup letsencrypt
dokku letsencrypt:enable clobwise
dokku letsencrypt:cron-job --add
```
