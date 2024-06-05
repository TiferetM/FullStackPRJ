import accessUsers from '../repositories/designs.js'

class DesignService {
    constructor(){
    }
    async create(design){
        console.log("create design at designService")
        return accessDesign.create(design);
    }

    async read(id){
        console.log("read design at designService")
        return accessDesign.read(id);
    }

    async update(design){
        console.log("update design at designService")
        return accessDesign.update(design);
    }

    async delete(id){
        console.log("delete design at designService")
        return accessDesign.delete(id);
    }
}

export default DesignService = new DesignService();