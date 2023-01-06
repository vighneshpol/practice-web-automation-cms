import login from '../../support/pages/pantheon/login.page';
import phoebe from '../../support/pages/pantheon/phoebe.page';
import { given, then, and, when } from '../../support/utils/bdd-steps';

var addCusDmnDsc = 'This domain will be assigned to the production deployments for your site "Wordpress_edrt". Domains like "www.example.com" and bare domains like "example.com" must be added separately.';

before('Open Login Page', async function () {
  await given('logging in via session token', async function () {
    await login.loginPage.login('edrt-env-test');
    expect(await login.loginPage.isLoggedIn(),
      "Not able to login to pantheon dashboard").to.be.true;
  });

  await then('Go to new Dashboard', async function () {
    await login.loginPage.gotoNewDashboard();
    await phoebe.workspaceComponent.goto('Personal Workspace');
    expect(await phoebe.home.getPersonalWorspaceText(),
      'Could not navigate to personal workspace').to.be.equal('Personal Workspace');
  });

  await and('Navigate to personal workspace', async function () {
    await phoebe.workspaceComponent.goto('EDRT QA');
    expect(await phoebe.workspaceComponent.getWorkspaceTitle(),
      'Could not navigate to correct workspace').to.be.equal('EDRT QA | Pantheon Dashboard');
    await phoebe.leftMenuBar.navigateTo('Sites');
    expect(await phoebe.sites.getSiteHeading(),
      'Not navigated to Sites page').to.be.equal('Sites');
  });
});

after('Logout', async function () {
  await phoebe.workspaceComponent.goto('Personal Workspace');
  await login.loginPage.logout();
});



