exports.seed = function (knex) {

    return knex('users')
        .del()
        .then(function () {
            // insert seed entries
            return knex('users').insert([
                { name: 'Abigail', email: 'addoa350@gmail.com', password: 'mainAdmin', profile_photo: 'https://media.istockphoto.com/id/450100369/photo/portrait-of-a-businesswoman.jpg?s=612x612&w=0&k=20&c=WK4vKnf6wNGwTqygZ62MzQ_l3fjd4H2ArcOXZ4UJmBY=' },
            ]);
        });
};
