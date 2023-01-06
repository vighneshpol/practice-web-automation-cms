import Page from "../page";

import { LeftMenubarComponent } from "./phoebe/left-menubar.component";
import { SitesComponent } from "./phoebe/left-menu/sites.component";
import { HomeComponent } from "./phoebe/left-menu/home.component";
import { WorkspaceComponent } from "./phoebe/left-menu/workspace.component"
import { FrontEndComponent } from "./phoebe/Front-end-Site/front-end.component"
import {DomainComponent} from "./phoebe/Front-end-Site/domain.component"
import {AddCustomDomain} from "./phoebe/Front-end-Site/add-domain.component"

class PhoebePage extends Page {
    constructor() {
        super();
        this.leftMenuBar = new LeftMenubarComponent();
        this.sites = new SitesComponent();
        this.home = new HomeComponent();
        this.workspaceComponent = new WorkspaceComponent();
        this.frontEnd = new FrontEndComponent();
        this.domain =new DomainComponent();
        this.addDomain = new AddCustomDomain();
    }
}
export default new PhoebePage;