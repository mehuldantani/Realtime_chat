const users = [];

function adduser(id, username){
    const user = { id, username};

    // add user to the users arrayss
    users.push(user);
}

function getcurrentuser(id){
   // find username with socketid
    return users.find(users => users.id === id);
    
}

module.exports = {adduser, getcurrentuser};