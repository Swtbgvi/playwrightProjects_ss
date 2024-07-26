Playwright-Web-UI-automation
this Repository uses Playwright Automation tool with Javascript programming Language.

Command to run the Scripts 
- Open terminal
- npx playwright test tc02api.test.js
- npx playwright test searchAir.spec.js

What the project does:
- UI automation
- API automation 

- PROJECT 1
- \playwrightProjects_ss\tests\searchAir.spec.js
The Project is to Launch the home Page of Airalo website.
Search for country and select the country from the dynamic Drop down.
Navigate to the Next page with the esim options available
Select the first Package available
Validate the contents of the package.

- PROJECT2 
- tests\tc02api.test.js
Place an order for 6 sims with package id and retrieve the 6 sims through POST and GET requests using Oauth2 barer token.

Open Cmd in desired Location
install node.js
run the cammand : npm init playwright@latest;
Need to install the following packages: create-playwright@1.17.133


Initializing project in

√ Do you want to use TypeScript or JavaScript? ·---> JavaScript

√ Where to put your end-to-end tests? ----> tests
