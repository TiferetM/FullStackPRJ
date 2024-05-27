import accessUsers from '../repositories/designs.js'

class designService {
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

export default designService = new designService();