import psutil

def is_our_profile(cmdline):
    for arg in cmdline:
        if "edge_profile_" in arg:
            return True
    return False

def close_edge_instances():
    closed = 0
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            if proc.info['name'] in ('msedge.exe', 'msedgedriver.exe'):
                if is_our_profile(proc.info['cmdline']):
                    proc.terminate()
                    closed += 1
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    print(f"[✓] Closed {closed} Edge processes linked to temporary profiles.")

if __name__ == "__main__":
    close_edge_instances()
