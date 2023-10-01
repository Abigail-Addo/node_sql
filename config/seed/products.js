exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          name: 'Water Wave Lace Front Wig with Baby Hair Glueless',
          price: 4000,
          description: '100% Unprocessed Virgin Human Hair Wigs',
          stocks: 4,
          image: 'http://localhost:7070/uploads/pic1.jpg'
        },
        {
          name: 'Body Wave Lace Front Wig Human Hair',
          price: 6000,
          description: 'Pre Plucked with Baby Hair Glueless Lace 18',
          stocks: 7,
          image: 'http://localhost:7070/uploads/pic2.jpg'
        },
        {
          name: 'Bone Straight HD Lace Front Wigs Human Hair',
          price: 9000,
          description: 'Pre Plucked With Baby Hair High 180% Density',
          stocks: 2,
          image: 'http://localhost:7070/uploads/pic3.jpg'
        },
        {
          name: 'Jmkshair Virgin Hair Wig',
          price: 3000,
          description: 'Bone Straight Sophie Bone Straight',
          stocks: 3,
          image: 'http://localhost:7070/uploads/pic4.jpg'
        },
        {
          name: 'Water Wave Lace Front Wig with Baby Hair Glueless',
          price: 2500,
          description: 'Pre Plucked With Baby Hair High 180% Density',
          stocks: 9,
          image: 'http://localhost:7070/uploads/pic4.jpg'
        },
        {
          name: 'Jmkshair Virgin Hair Wig',
          price: 7000,
          description: 'Bone Straight Sophie Bone Straight',
          stocks: 8,
          image: 'http://localhost:7070/uploads/pic6.jpg'
        },
        {
          name: 'Bone Straight HD Lace Front Wigs Human Hair',
          price: 5000,
          description: 'Pre Plucked With Baby Hair High 180% Density',
          stocks: 6,
          image: 'http://localhost:7070/uploads/pic1.jpg'
        },
        {
          name: 'Body Wave Lace Front Wig Human Hair',
          price: 4500,
          description: 'Pre Plucked with Baby Hair Glueless Lace 18',
          stocks: 7,
          image: 'http://localhost:7070/uploads/pic2.jpg'
        }

      ]);
    });
};
