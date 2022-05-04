
import InfoBaseUsersManager from './global/InfoBaseUsersManager.js'


class crm {
    #global = {}
    constructor(knex, req) {
        this.knex = knex;
        this.req = req;
    }
    get InfoBaseUsersManager() {
        if (!this.#global.InfoBaseUsersManager) {
            this.#global.InfoBaseUsersManager = new InfoBaseUsersManager(this.knex, this.req.user);
        }
        return this.#global.InfoBaseUsersManager;
    }
}


export default crm