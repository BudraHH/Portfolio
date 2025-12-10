import { SKILLS } from "../../constants/skills.js";

// Internal Installation Log (The one that runs in the child terminal)
const generateInternalInstallerLog = () => {
    let script = `#
# ==========================================
#      SKILLS PACKAGE MANAGER v2.4.0
# ==========================================
#
echo "[INSTALLER] Initializing environment..."
echo "[INSTALLER] Loading dependency tree..."
echo ""
`;

    Object.entries(SKILLS).forEach(([category, skills]) => {
        script += `echo "┌── [${category.toUpperCase()}]"\n`;
        skills.forEach((skill, index) => {
            const isLast = index === skills.length - 1;
            const prefix = isLast ? '└──' : '├──';
            script += `echo "│   ${prefix} ${skill.name} ${skill.version ? '@' + skill.version : ''}"\n`;
            script += `sleep 200\n`; // Artificial delay marker for terminal parser
        });
        script += `echo "│"\n`;
    });

    script += `echo "└── [DONE]"
echo ""
echo "All packages installed successfully."
echo "System ready."
`;
    return script;
};

// Visible Launcher Script (The one seen via cat)
const generateLauncherScript = () => {
    return `#!/bin/bash
# install-skills-packages.sh
# -----------------------------
# Launches the specialized skills installer in a
# detached child process to prevent main thread blocking.

TARGET_SCRIPT=".internal/skills_manifest.sh"
LOG_FILE="/var/log/install.log"

echo "[INIT] Requesting elevated permissions..."
echo "[INIT] Spawning child process..."

# Spawn terminal with the installer logic
# The '&' ensures it runs in background
gnome-terminal --title="Package Installer" -- bash -c "source $TARGET_SCRIPT" &

echo "[SUCCESS] Installer spawned."
echo "Please monitor the new window for progress."
`;
};

export const fileSystemTree = {
    name: "root",
    type: "folder",
    children: {
        "home": {
            // ... rest matches structure
            // ... (rest of the file remains, but we need to insert the function result in the tree)

            name: "home",
            type: "folder",
            children: {
                "dev": {
                    name: "dev",
                    type: "folder",
                    children: {
                        "Desktop": {
                            name: "Desktop",
                            type: "folder",
                            children: {
                                "Project Alpha": { name: "Project Alpha", type: "folder", children: {} }, // Assumed empty or populate if needed
                                "Todo.txt": { name: "Todo.txt", type: "text", size: "2 KB" }
                            }
                        },
                        "Documents": {
                            name: "Documents",
                            type: "folder",
                            children: {
                                "Resume.pdf": { name: "Resume.pdf", type: "pdf", size: "2.4 MB" },
                                "Budget.xlsx": { name: "Budget.xlsx", type: "excel", size: "15 KB" },
                                "Notes.txt": { name: "Notes.txt", type: "text", size: "1 KB" }
                            }
                        },
                        "Downloads": {
                            name: "Downloads",
                            type: "folder",
                            children: {
                                "installer.dmg": { name: "installer.dmg", type: "unknown", size: "140 MB" },
                                "image.png": { name: "image.png", type: "image", size: "3 MB" }
                            }
                        },
                        "Music": {
                            name: "Music",
                            type: "folder",
                            children: {
                                "Song1.mp3": { name: "Song1.mp3", type: "audio", size: "4 MB" },
                                "Song2.mp3": { name: "Song2.mp3", type: "audio", size: "5 MB" }
                            }
                        },
                        "Pictures": {
                            name: "Pictures",
                            type: "folder",
                            children: {
                                "Vacation.jpg": { name: "Vacation.jpg", type: "image", size: "2 MB" },
                                "Profile.png": { name: "Profile.png", type: "image", size: "1.2 MB" }
                            }
                        },
                        "Projects": {
                            name: "Projects",
                            type: "folder",
                            children: {
                                "Portfolio": {
                                    name: "Portfolio",
                                    type: "folder",
                                    children: {
                                        "CareerJourney": {
                                            name: "CareerJourney",
                                            type: "folder",
                                            children: {
                                                "career-journey.sh": { name: "career-journey.sh", type: "shell", size: "4 KB" }
                                            }
                                        },
                                        "Contact": {
                                            name: "Contact",
                                            type: "folder",
                                            children: {
                                                "contact-info.sh": { name: "contact-info.sh", type: "shell", size: "2 KB" }
                                            }
                                        },
                                        "Hero": {
                                            name: "Hero",
                                            type: "folder",
                                            children: {
                                                "profile_init.sh": {
                                                    name: "profile_init.sh",
                                                    type: "shell",
                                                    size: "3 KB",
                                                    content: `#!/bin/bash
# profile_init.sh - User Context Initializer
# ---------------------------------------------
# Bootstraps the visual profile environment.
# Loads shared libraries and rendering context.

APP_ID="Hero"
RENDER_MODE="accelerated"

echo "[BOOT] Starting profile sequence..."
echo "[INFO] Loading assets for $APP_ID..."
sleep 0.4

if [ "$RENDER_MODE" = "accelerated" ]; then
    echo "[OK] GPU Acceleration: ENABLED"
else
    echo "[WARN] GPU Acceleration: DISABLED"
fi

echo "[EXEC] mounting component..."
open "Hero"
echo "[SUCCESS] Profile loaded successfully (PID: __PID__)."
`
                                                }
                                            }
                                        },
                                        "Info": {
                                            name: "Info",
                                            type: "folder",
                                            children: {
                                                "info-run.sh": {
                                                    name: "info-run.sh",
                                                    type: "shell",
                                                    size: "5 KB",
                                                    content: `#!/bin/bash
# info-run.sh - Portfolio Information Viewer
# ---------------------------------------------
# Initializes a detached browser session to display
# user profile and biographical data.

BROWSER="firefox"
TARGET_URL="https://portfolio.com/info"

echo "[INIT] checking display server..."
echo "[OK] Wayland session detected."

echo "[INIT] Verifying browser dependencies..."
if command -v $BROWSER &> /dev/null; then
    echo "[OK] Firefox core found."
else
    echo "[ERROR] Browser not found."
    exit 1
fi

echo "[LAUNCH] Opening https://portfolio.com/info..."
sleep 0.5
firefox "https://portfolio.com/info"
echo "[SUCCESS] Session started (PID: $$)."
`
                                                }
                                            }
                                        },
                                        "Projects": {
                                            name: "Projects",
                                            type: "folder",
                                            children: {
                                                "projects-list.sh": {
                                                    name: "projects-list.sh",
                                                    type: "shell",
                                                    size: "6 KB",
                                                    content: `#!/bin/bash
# projects-list.sh - Remote Repository Fetcher
# ---------------------------------------------
# Connects to version control to retrieve project index.
# Launches graphical viewer for portfolio items.

API_ENDPOINT="api.github.com/users/budrahh/repos"
VIEWER="firefox"

echo "[INIT] Connecting to GitHub API..."
echo "[INFO] Authenticating session..."
sleep 0.3
echo "[SUCCESS] Token verified."

echo "[NET] Fetching public repositories from $API_ENDPOINT..."
sleep 0.6
echo "[DATA] Download complete: 12 objects, 4.2MiB received."

echo "[LAUNCH] Opening Project Viewer..."
firefox "https://portfolio.com/projects"
echo "[SUCCESS] Viewer active (PID: __PID__)."
`
                                                }
                                            }
                                        },
                                        "Resume": {
                                            name: "Resume",
                                            type: "folder",
                                            children: {
                                                "resume-download.sh": { name: "resume-download.sh", type: "shell", size: "12 KB" }
                                            }
                                        },
                                        "Skills": {
                                            name: "Skills",
                                            type: "folder",
                                            children: {
                                                "install-skills-packages.sh": {
                                                    name: "install-skills-packages.sh",
                                                    type: "shell",
                                                    size: "4 KB",
                                                    content: generateLauncherScript(),
                                                    internalScript: generateInternalInstallerLog()
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "Videos": {
                            name: "Videos",
                            type: "folder",
                            children: {
                                "Demo.mp4": { name: "Demo.mp4", type: "video", size: "45 MB" }
                            }
                        }
                    }
                }
            }
        },
        "trash": {
            name: "trash",
            type: "folder",
            children: {
                "Old_Draft.doc": { name: "Old_Draft.doc", type: "doc", size: "25 KB" }
            }
        }
    }
};

/**
 * Traverses the file system tree to find a node at the given path array.
 * @param {string[]} pathArray - Array of directory names, e.g., ["home", "dev", "Projects"]
 * @returns {object|null} The node if found, or null.
 */
export function getNode(pathArray) {
    let current = fileSystemTree;
    for (const segment of pathArray) {
        if (!current.children || !current.children[segment]) {
            return null;
        }
        current = current.children[segment];
    }
    return current;
}

/**
 * Resolves a target path string relative to a current path array.
 * Handles ".", "..", and absolute paths.
 * @param {string[]} currentPathArray - e.g. ["home", "dev"]
 * @param {string} targetPathStr - e.g. "../Desktop" or "/home/dev" or "Projects"
 * @returns {string[]} The resolved path array.
 */
export function resolvePath(currentPathArray, targetPathStr) {
    if (!targetPathStr) return currentPathArray;

    let newPath = targetPathStr.startsWith('/') ? [] : [...currentPathArray];

    // Split key by slash, filter empty to ignore multiple slashes or leading/trailing
    const segments = targetPathStr.split('/').filter(Boolean);

    for (const segment of segments) {
        if (segment === '.') continue;
        if (segment === '..') {
            if (newPath.length > 0) newPath.pop();
        } else {
            newPath.push(segment);
        }
    }
    return newPath;
}

/**
 * Formats a path array into a string prompt.
 * Replaces /home/dev with ~
 * @param {string[]} pathArray 
 * @returns {string} e.g. "~/Projects"
 */
export function formatPath(pathArray) {
    const fullPath = '/' + pathArray.join('/');
    if (fullPath.startsWith('/home/dev')) {
        return '~' + fullPath.substring('/home/dev'.length);
    }
    return fullPath;
}
