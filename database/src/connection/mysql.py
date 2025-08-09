# src/utils/mysql_util.py
import pymysql
from src.config.env_config import MYSQL_CONFIG

def get_mysql_connection():
    return pymysql.connect(
        host=MYSQL_CONFIG.get('HOST', 'localhost'),
        port=int(MYSQL_CONFIG.get('PORT', 3306)),
        user=MYSQL_CONFIG['USERNAME'],
        password=MYSQL_CONFIG['PASSWORD'],
        db=MYSQL_CONFIG['DATABASE'],
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )

