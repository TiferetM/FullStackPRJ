import access from "./access.js";

class DesignAccess extends access {
    constructor() {
        super();
    }   

    async create(design) {
        try {
            console.log("create design at designAccess")
            const newDesign = await this.db.collection("designs").insertOne({
                title: design.title,
                body: design.body,
                category: design.category,
                pic: design.image
            });
            return newDesign;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async read(id) {
        try {
            console.log("read design at designAccess")
            const design = await this.db.collection("designs").findOne({ where: { id: id } });
            return design;
        }
        catch (error) {
            return { error: error.message };
        }
    }

    async readById(id) {
        try {
            console.log("read design at designAccess")
            const designID = new ObjectId(id);
            const design = await this.db.collection("designs").findOne({ _id: designID });
            return design;
        }
        catch (error) {
           throw new Error(error.message);
        }
    }
    
    async update(design) {
        try {
            console.log("update design at designAccess")
            const updatedDesign = await this.db.collection("designs").update(design, {
                where: { id: design.id }
            });
            return updatedDesign;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async delete(id) {
        try {
            console.log("delete design at designAccess")
            await this.db.collection("designs").destroy({
                where: { id: id }
            });
            return { message: "design deleted" };
        }
        catch (error) {
            return { error: error.message };
        }
    }

}
export default DesignAccess = new DesignAccess();