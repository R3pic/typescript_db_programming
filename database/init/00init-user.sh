#!/bin/bash

psql -U "$POSTGRES_USER" -tc "SELECT 1 FROM pg_roles WHERE rolname = '$DB_USER'" | grep -q 1 || psql -U "$POSTGRES_USER" -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
psql -U "$POSTGRES_USER" -tc "SELECT 1 FROM pg_database WHERE datname = 'exercise'" | grep -q 1 || psql -U "$POSTGRES_USER" -c "CREATE DATABASE exercise WITH OWNER = $DB_USER ENCODING='UTF8' LC_COLLATE='C' LC_CTYPE='C' TEMPLATE=template0;"
psql -U "$POSTGRES_USER" -tc "SELECT 1 FROM pg_database WHERE datname = 'entertainment'" | grep -q 1 || psql -U "$POSTGRES_USER" -c "CREATE DATABASE entertainment WITH OWNER = $DB_USER ENCODING='UTF8' LC_COLLATE='C' LC_CTYPE='C' TEMPLATE=template0;"
psql -U "$POSTGRES_USER" -c "GRANT ALL ON DATABASE exercise TO $DB_USER GRANTED BY $POSTGRES_USER;"
psql -U "$POSTGRES_USER" -c "ALTER DATABASE exercise OWNER TO $DB_USER";
psql -U "$POSTGRES_USER" -c "GRANT ALL ON DATABASE entertainment TO $DB_USER GRANTED BY $POSTGRES_USER;"
psql -U "$POSTGRES_USER" -c "ALTER DATABASE entertainment OWNER TO $DB_USER";