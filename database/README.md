# Pre install

- [Mongo database tool](https://gist.github.com/iambryancs/4a06032d582b885edeb66ae14228ce8b)
- [Mysql cli](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install-linux-quick.html)

## Makefile Usage Guide

The Makefile provides easy commands to manage Python environment setup and database operations for MySQL and MongoDB.

### Setup Commands

| Target    | Description                                                  | Usage Example           |
| --------- | ------------------------------------------------------------ | ----------------------- |
| `env`     | Create a Python virtual environment and show activation info | `make env`              |
| `install` | Install Python dependencies from `requirements.txt`          | `make install`          |
| `add`     | Install a new Python package and update `requirements.txt`   | `make add name=package` |
| `freeze`  | Save current Python packages to `requirements.txt`           | `make freeze`           |

---

### MySQL Commands

| Target               | Description                                                     | Notes                                                |
| -------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| `dump-mysql`         | Dump the MySQL database backup                                  | Uses environment variables for connection parameters |
| `restore-mysql`      | Restore MySQL from a backup folder into current database (.env) | Prompts for timestamp or `last` to use latest backup |
| `restore-mysql-into` | Restore MySQL backup into a different database                  | Prompts for timestamp and target DB name             |

---

### MongoDB Commands

| Target               | Description                                                       | Notes                                                |
| -------------------- | ----------------------------------------------------------------- | ---------------------------------------------------- |
| `dump-mongo`         | Dump the MongoDB database backup                                  | Uses environment variables for connection parameters |
| `restore-mongo`      | Restore MongoDB from a backup folder into current database (.env) | Prompts for timestamp or `last` to use latest backup |
| `restore-mongo-into` | Restore MongoDB backup into a specified database                  | Prompts for timestamp and target DB name             |

---

### Important Notes

- Backup folders are organized as:  
  `root/data/mysql/<timestamp>/` and `root/data/mongo/<timestamp>/`
- Typing `last` when prompted will select the latest backup folder automatically.
- Ensure database credentials are set via environment variables before dumping/restoring.
- Restore scripts will create the database if it doesn't already exist.
- After running `make env`, activate the virtual environment with:  
  `source venv/bin/activate`
