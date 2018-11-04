# Kommunity Backend Server
Kommunity is an online app for creating & joining communities. This is the backend app.

Check product [documentation](https://docs.google.com/document/d/1P9znOKfQIHDP3BVS5ptvFgzSLmL0vo4WTAZrcKatFBA) for more details.

# Instructions
1. Fork this repo
2. Click on `Clone or download` button and copy url
3. Run the following command:
```bash
# Replace FORK_URL with what you just copied
git clone FORK_URL
```

## 1. Install dependencies
``` bash
cd kommunity-backend
npm install
```

## 2. Install XAMPP 
Download and install MAMP
- macOS v7.2.11: https://sourceforge.net/projects/xampp/files/XAMPP%20Mac%20OS%20X/7.2.11/
- Windows v7.2.11: https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/7.2.11/

Once you install, open the XAMPP app and **make sure APACHE and MYSQL server is started** (green box).

You can visit http://localhost/phpmyadmin/ to see the tables, etc.

## 3. Install Node.js
Go to [node.js v8.11.4 installation page](https://nodejs.org/en/blog/release/v8.11.4/). Pick either macOS 64-bit installer or Windows Installer depending on your operation system.

### Optional
NVM really makes it easier to switch between node.js versions. If you are working on other projects that require different versions of node/npm, then you can install `nvm` from here:
- Windows: https://github.com/coreybutler/nvm-windows/releases
- Mac: https://github.com/creationix/nvm/blob/master/README.md#installation

Once you install NVM, 
```bash
nvm install 8.11.4
nvm use 8.11.4
```

#### Fix NVM issue
There is a bug in nvm codebase, and it breaks on **windows** machines.

Do the following if you are experiencing issues:
- open `node_modules/pre-push/index.js`
- find `if (!this.npm)`
- right after if block, put: `this.npm += ".cmd";`

## 4. Import sample database and data
```bash
npm run db-setup
```

## 5. Start backend server
```bash
npm run start
```

# Git instructions for developing new features

```bash
cd kommunity-backend

# Replace FORK_URL with your remote fork url
$ git remote add my-fork FORK_URL

# Create a new feature branch
git checkout -b BRANCH_NAME

# Make changes in the code base ...

# Check for formatting
npm run lint

# Check for flow types
npm run flow

# Run unit tests
npm run test

# If all checks (lint, flow, test) are passing, add updated files to staging
git add src/server.js

# Commit your changes
git commit -m "your commit message"

# When you are ready to create a PR, push your changes to your fork
git push -u my-fork BRANCH_NAME

# THEN:
# Go to github, open your forked repository page
# Click on `New pull request` button
# Make sure you see base: dev, and original repo name on the left
#   And BRANCH_NAME, and your fork's name on the right.
# Hit `Create pull request` button

# Once PR is created, make sure Travis build passes. Then ask other developers to review your code.
```

## Flow
We are using flow for static type checking.

#### Adding new flow type definition
In order to avoid flow type errors, you can fetch definitions for popular modules from flow-typed.

```bash
npm run flow-typed-add express@4
```
