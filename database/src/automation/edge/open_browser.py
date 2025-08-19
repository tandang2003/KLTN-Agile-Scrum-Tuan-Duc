import os
import tempfile
import shutil
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from src.config.env_config import ROOT_DIR

# Path to Edge WebDriver
edge_driver_path = ROOT_DIR / "src" / "automation" / "edge" / "driver" / "msedgedriver.exe"

# Account credentials
accounts = [
  
    ("21130320", "123456"),
    ("21130451", "123123123"),
    ("21130601", "123123123"),
    ("21130363", "123123123"),
    ("22130001", "123123123"),
    ("21130279", "123123123"),
    ("21130335", "123123123"),
    ("20130224", "123123123"),
    ("21130359", "123123123"),
    ("21130371", "123123123"),
]

# Target login page
login_url = "http://192.168.1.59:5173/auth/login"

# Loop through accounts
for i, (username, password) in enumerate(accounts):
    profile_dir = os.path.join(tempfile.gettempdir(), f"edge_profile_{i}")

    # Clean up any previous profile
    if os.path.exists(profile_dir):
        shutil.rmtree(profile_dir, ignore_errors=True)
    os.makedirs(profile_dir, exist_ok=True)

    # Edge options
    options = Options()
    options.add_argument(f"--user-data-dir={profile_dir}")
    options.add_argument("--start-maximized")
    options.add_experimental_option("detach", True)  # Keep browser open after script ends
    # Optional safety flags
    options.add_argument("--disable-background-mode")
    options.add_argument("--disable-popup-blocking")

    # Start Edge browser
    service = Service(str(edge_driver_path))
    driver = webdriver.Edge(service=service, options=options)

    try:
        driver.get(login_url)

        wait = WebDriverWait(driver, 10)  # up to 10 seconds wait
        # Wait until the username input appears
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'input[name="uniId"]')))

        # Fill in login form
        driver.find_element(By.CSS_SELECTOR, 'input[name="uniId"]').send_keys(username)
        driver.find_element(By.CSS_SELECTOR, 'input[name="password"]').send_keys(password)
        driver.find_element(By.CSS_SELECTOR, "button").click()

        print(f"[✓] Logged in as {username}")

    except Exception as e:
        print(f"[✗] Login failed for {username}: {e}")

    # Optional delay before launching next browser
    # time.sleep(1)  # uncomment if needed
