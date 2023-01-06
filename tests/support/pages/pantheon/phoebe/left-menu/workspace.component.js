
import Page from '../../../page';

export class WorkspaceComponent extends Page {
    get runtimePATH() { return $(this.runtimeSelect["updateSelector"]); }
    get workspaceButtonCSS() { return $("button[aria-label='Toggle global context menu']"); }
    get workspaceButtonXPATH() { return $("//*[@id=‘menu-button--menu’]/div/div"); }

    runtimeSelect = {
        'updateSelector': '',
    };


    /**
     * Navigating from personal workspace to professional workspace.
     * @param {*} workspaceName: Name of the worksapce  
     */
    async goto(workspaceName) {
        await this.driver.awaitIsDisplayed(await this.workspaceButtonCSS);
        await this.driver.click(await this.workspaceButtonCSS);
        this.runtimeSelect['updateSelector'] = `//span[text()='${workspaceName}']`;
        await this.driver.awaitIsDisplayed(await this.runtimePATH);
        await this.driver.isDisplayed(await this.runtimePATH);
        await this.driver.click(await this.runtimePATH);
        await this.driver.refreshPage(await this.runtimePATH);
    }

    /**
     * return the title of the workspace
     * */
    async getWorkspaceTitle() {
        await this.driver.awaitIsDisplayed(await this.driver.getTitle(), 5000);
        return await this.driver.getTitle();
    }

}