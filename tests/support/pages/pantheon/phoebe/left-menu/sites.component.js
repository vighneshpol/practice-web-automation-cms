/**This Page objects file contains sites tab related locators and methods
 * */

import Page from '../../../page';

export class SitesComponent extends Page {

  get sitesCSS() { return $('h1[id="workspace-site-list-heading"]'); }
  get runtimePATH() { return $(this.runtimeSelect['updateSelector']); }
  runtimeSelect = {
    'updateSelector': '',
  };

  /**
     * Returns the Sites heading
     * @return Site heading
     */
  async getSiteHeading() {
    await this.driver.awaitIsDisplayed(await this.sitesCSS);
    await this.driver.isDisplayed(await this.sitesCSS);
    return await this.driver.textOf(await this.sitesCSS);
  }

}
