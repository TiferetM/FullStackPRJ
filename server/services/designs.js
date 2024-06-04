import accessUsers from '../repositories/designs.js'

class DesignService {
    constructor(){
    }
    async create(design){
        return accessDesign.create(design);
    }

    async read(id){
        return accessDesign.read(id);
    }

    async update(design){
        return accessDesign.update(design);
    }

    async delete(id){
        return accessDesign.delete(id);
    }
}

export default DesignService = new DesignService();