const fs = require('fs')

const users = {
    fileName: 'src/data/users.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    findAll: function(){
        return this.getData();
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user.id === id)
        return userFound
    },

    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user[field] === text)
        return userFound
    }


}
module.exports = users