exports.seed = function (knex) {

return knex('users')
.del()
.then(function () {
    // insert seed entries
    return knex('users').insert([
        {name: 'Abigail', email: 'addoa350@gmail.com', password: 'mainAdmin'},
        {name: 'Tiana', email: 'tiana@gmail.com', password: 'Admin123' },
    ]);
});
};
