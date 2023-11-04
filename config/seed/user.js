exports.seed = function (knex) {

    return knex('users')
        .del()
        .then(function () {
            // insert seed entries
            return knex('users').insert([
                { name: 'Abigail', email: 'addoa350@gmail.com', password: 'mainAdmin', profile_photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
            ]);
        });
};
