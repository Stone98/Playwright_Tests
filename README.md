
# [See The Bottom of this Guide for Installation Setup](#playwright-tests-setup-guide)

# Tips 
When Running Tests, The Test Results Report and Videos (if enabled) will be in the playright-report folder, not the test-results folder. This confuses some people.

Video recording of tests can be turned on or off by going to `playwright.config.ts` and setting the video option to 'on' or 'off'.

When running tests, if you find it annoying to see the browser windows you can make the them non visible by going to `playwright.config.ts` and setting the headless option to headless: true

Make sure your MCP server is running by
hitting `Ctrl+Shift+P` and typing "MCP" and clicking "MCP: List Servers".

When asking a chat agent to generate a test for you, include the file [.github/workflows/prompts/generate_test.prompt.md](.github/workflows/prompts/generate_test.prompt.md) as part of the context of your chat.
You can do this by clicking the **Attach** button and ensuring your chat is using Agent mode.

Logging in using the UI can be repetitive. Suggest you use a api call to log users in where possible.


# Playwright Tests Setup Guide

This guide will help you set up your environment to run the Playwright tests in this repository on Windows.

## 1. Prerequisite Software Installation for Windows

Please install the following software in order.

1. **Git**: Download and install from [git-scm.com](https://git-scm.com/).
   - Click the "Download for Windows" link.
2. **GitHub Desktop**: Download and install from [desktop.github.com](https://desktop.github.com/).
   - Click the "Download for Windows" link.
3. **VLC Media Player**: Download and install from [videolan.org](https://www.videolan.org/vlc/download-windows.html).
   - This is useful for viewing `.webm` movie files recording during tests.
   - *Note: Be careful to download from the official site to avoid ads.*
4. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/en/download).
   - Click the Windows Installer (`.msi`) link. This is required to run Playwright.
5. **VS Code (or VS Code Insiders)**:
   - Download and install.
   - **Important**: During installation, ensure you check the boxes for "Add 'Open with Code' action to Windows Explorer file/directory context menu".
6. **TypeScript** (Global Install):
   - Open a terminal (Command Prompt or PowerShell) and run the following command:
     ```powershell
     npm install -g typescript
     ```

> **Recommendation**: It is a good idea to reboot your computer after installing these prerequisites before continuing.

## 2. Configuring VS Code

### Installing Recommended Extensions

To get the best experience, you should install specific extensions in VS Code.

**How to Install Extensions (For Novice Users):**
1. Open Visual Studio Code.
2. Click on the **Extensions** icon in the Activity Bar on the left side of the window (it looks like four squares with one detached). Alternatively, press `Ctrl+Shift+X`.
3. In the "Search Extensions in Marketplace" box, type the name of the extension you want to install.
4. Click the **Install** button next to the correct extension in the list.

**Recommended Extensions List:**

*   **[Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)** (`ms-playwright.playwright`): Essential for running and debugging Playwright tests directly from the editor.
*   **[JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)** (`ms-vscode.vscode-typescript-next`): Assisting in editing script files with the latest features.
*   **[Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)** (`ms-vscode.live-server`): Useful for viewing the HTML test report files.
*   **[Open In External App](https://marketplace.visualstudio.com/items?itemName=djunh1.open-in-external-app)** (`djunh1.open-in-external-app`): Allows opening test result `.webm` movies in VLC Media Player directly from VS Code.
*   **[GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)** (`GitHub.copilot-chat`): AI setup companion (may be installed already).



## 3. Clone and Initialize the Repository

1. Clone this repository using **GitHub Desktop** or the command line.
2. Open the cloned folder in VS Code.
3. Open a terminal in VS Code (`Ctrl+` `) and install the project dependencies:
   ```powershell
   npm install
   npx playwright install
   ```
4. Setup Playwright agent by  running this command
   ```powershell
   npx playwright init-agents --loop=vscode
   ```



## 4. Environment Setup

### 4.1 Local Environment Setup

To run tests locally, you need to configure your user credentials.

1.  Create a file named `users.env` in the root of the project (if it doesn't already exist).
2.  Add the following variables to `users.env`. You can copy this template:

    ```env
    LOGINS_GUEST_LOGIN=GUEST_Login
    LOGINS_GUEST_PASSWORD=GUEST_Password
    LOGINS_GUEST_BASEURL=https://example.com

    LOGINS_ADMIN_LOGIN=ADMIN_Login
    LOGINS_ADMIN_PASSWORD=ADMIN_Password
    LOGINS_ADMIN_BASEURL=https://example.com

    LOGINS_SUPERUSER_LOGIN=SU_Login
    LOGINS_SUPERUSER_PASSWORD=SU_Password
    LOGINS_SUPERUSER_BASEURL=https://example.com
    ```

    *Note: Replace the values with your actual test credentials.*

### 4.2 GitHub Actions (CI/CD) Setup

For the tests to run successfully in GitHub Actions, you must set up **Repository Secrets** so the workflow can access these values securely.

1.  Go to your GitHub repository.
2.  Navigate to **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  For each of your users, Add each of the following secrets (names must match exactly):

    *   `LOGINS_GUEST_LOGIN`
    *   `LOGINS_GUEST_PASSWORD`
    *   `LOGINS_GUEST_BASEURL`

The `.github/workflows/playwright.yml` file has been configured to map these secrets to the environment variables required by the tests.



