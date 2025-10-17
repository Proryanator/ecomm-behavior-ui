# ecomm-behavior-ui

UI for uploading and viewing data about ecomm user behavior.

Data is modeled after a Kaggle dataset found [here](https://www.kaggle.com/datasets/mkechinov/ecommerce-behavior-data-from-multi-category-store?resource=download&select=2019-Oct.csv).

## Dev Setup

- Create an `.env` file that has the following:

```shell
# these will be picked up by docker compose
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=ecomm_user_behavior

# API key used to hit the API server
NEXT_PUBLIC_SERVER_API_KEY=
```

- Download some sample .csv data files from [here](https://www.dropbox.com/scl/fo/vsgcp8y8x4p901j6pd9bt/AAjjBpCxV7OFcXgU4jXbDOg?rlkey=agi1xru5hyuq44nspmexisf7r&st=qq0fz9rr&dl=0) to test uploading (note: the 10 million upload won't work with the API running in docker)
## Running everything via docker

- Run `docker compose --profile "*" up`

API and DB code can be
found [here.](https://gitlab.com/heb-engineering/teams/platform-engineering/quality-engineering/ecomm-behavior-api