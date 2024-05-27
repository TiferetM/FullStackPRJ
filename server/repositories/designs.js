import access from "./access";

class designAccess extends access {
    constructor() {
        super();
    }   

    async create(design) {
        try {
            const newDesign = this.db.designs.create({
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
            const design = this.db.designs.findOne({ where: { id: id } });
            return design;
        }
        catch (error) {
            return { error: error.message };
        }
    }
    
    update(design) {
        try {
            const updatedDesign = this.db.designs.update(design, {
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
            await this.db.designs.destroy({
                where: { id: id }
            });
            return { message: "design deleted" };
        }
        catch (error) {
            return { error: error.message };
        }
    }

}
export default userAccess = new designAccess();