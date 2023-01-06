/**
 * Home Tab on left menu on Phoebe Dashboard
 */
import Page from '../../../page';

export class  HomeComponent extends Page {

    get personalWorkspaceXPATH() { return $("//h2[text()='Personal Workspace']"); }
    get homeTabXPATH(){return $("//div[text()='Home']")}

    /**Get text for personal workspace and 
     * @return string type personal workspace text 
     * */
    async getPersonalWorspaceText(){
        await this.driver.awaitIsDisplayed(await this.personalWorkspaceXPATH);
        await this.driver.isDisplayed(await this.personalWorkspaceXPATH);
        return await this.driver.textOf(await this.personalWorkspaceXPATH);
    }
}