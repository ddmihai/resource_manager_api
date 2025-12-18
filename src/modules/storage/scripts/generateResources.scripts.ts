import { RESOURCES } from '../data/resources';
import { ResourceService } from '../services/ressource.service';


export const generateResourceAuto = async () => {
    for (const resource of RESOURCES) {
        const exists = await ResourceService.ResourceExists(resource.name);

        if (exists) {
            continue; // skip this one, but keep going
        }

        await ResourceService.createResource(resource);
    }
};
