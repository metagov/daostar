# How to Add a New Member Logo to the DAOstar Website

This guide will walk you through the process of adding a new member logo to the DAOstar website.

## Step 1: Download the Repository

First, clone the DAOstar repository from GitHub:

```shell
git clone https://github.com/metagov/daostar
```

## Step 2: Create a New Branch

Navigate to the cloned repository, and create a new branch for your changes. Replace memberName with the name of the member you are adding.

```
cd daostar-website
git branch add-memberName-logo
git checkout add-memberName-logo
```

## Step 3: Add the Logo Image
Place the logo image in the following directory:

```
daostar-website/src/img/logos
```

Make sure that the image is in an appropriate web format (like JPEG or PNG) and optimized for the web.

## Step 4: Update membersLogo.js
Now, you need to import the logo in the membersLogo.js file and add it to the page. Here is an example of how you can do this:

Open the file at:

daostar-website/src/components/Homepage/MemberLogos/MemberLogos.js

Import the new logo at the top of the file:


`import memberNameLogo from '../../../img/logos/memberNameLogo.png';`

Add the logo to the component's render method:


```
<a href="[Member's URL]" target="_blank">
  <img src={memberNameLogo} alt="[Member Name]" />
</a>
```
Replace [Member's URL] and [Member Name] with the appropriate values.

## Step 5: Test Your Changes
Before submitting your changes, test them locally:

Start the development server:


```
pnpm run start
```
Verify that the logo appears correctly on the website.

Build the project to ensure there are no build errors:

```
pnpm run build
```
## Step 6: Submit a Pull Request
Once you have verified your changes:

Push your branch to GitHub:


```
git push -u origin add-memberName-logo
```
Go to the DAOstar GitHub repository and open a new pull request with your branch.

Fill in the pull request details, explaining the changes you made.

After submitting the pull request, wait for the repository maintainers to review and merge your changes.

