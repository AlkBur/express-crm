class InfoBaseUser {
    constructor(user) {
        this.user = user;
    }
}


export default class InfoBaseUsersManager {
    #user = ''
    #db = {}
    #tableName = 'v8users'
    constructor(db, user) {
        this.#user = user;
        this.#db = db;
    }
    static toString() {
        return this.name;
    }
    async FindByName(name) {
        let users
        users = await this.#db.select().table(this.#tableName).where('name', name);
        if (users.length != 0) {
            return new InfoBaseUser(users[0]);
        }
        return undefined;
    }
    async GetUsers() {
        const arr = new Array();
        let users = await this.#db.select().table(this.#tableName);
        for (let user of users) {
            arr.push(new InfoBaseUser(user));
        }
        return arr;
    }
    async FindByUUID(uuid) {
        let users = await this.#db.select().table(this.#tableName).where('name', uuid);
        if (arr.length == 0) {
            return undefined
        }
        return new InfoBaseUser(users[0]);

    }
    async CurrentUser() {
        return FindByName(this.#user);
    }
}