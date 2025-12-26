import { RESOURCES } from "../data/ressources";
import { IResource } from "../interfaces/resource";
import { ResourceService } from "../services/resource.service";



export const createAutomaticallyRessource = async () => {
    for (const r of RESOURCES) {
        await ResourceService.CreateResource(r, true);
    }
}