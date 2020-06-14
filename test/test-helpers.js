function makeUsersArray() {
  return [
    {
      id: 1,
      email: "test-user-1@gmail.com",
      password: "password",
    },
    {
      id: 2,
      email: "test-user-2@gmail.com",
      password: "password",
    },
    {
      id: 3,
      email: "test-user-3@gmail.com",
      password: "password",
    },
  ];
}

function makeMovieListsArray(users) {
  return [
    {
      id: 1,
      name: "Tuesday Thrillers",
      user_id: users[0].id,
    },
    {
      id: 2,
      name: "RomCom Saturdays",
      user_id: users[1].id,
    },
    {
      id: 3,
      name: "Friday Zoom Night",
      user_id: users[2].id,
    },
  ];
}

function makeMoviesArray(lists) {
  return [
    {
      id: 1,
      title: "Ad Astra",
      overview:
        "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
      genre: "Science Fiction",
      runtime: "123 minutes",
      poster_path: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
      movielist_id: lists[0].id,
      votes: 0
    },
    {
      id: 2,
      title: "The Lovebirds",
      overview:
        "A couple experiences a defining moment in their relationship when they are unintentionally embroiled in a murder mystery. As their journey to clear their names takes them from one extreme – and hilarious - circumstance to the next, they must figure out how they, and their relationship, can survive the night.",
      genre: "romantic-comedy",
      runtime: "120 minutes",
      poster_path: "/5jdLnvALCpK1NkeQU1z4YvOe2dZ.jpg",
      movielist_id: lists[1].id,
      votes: 0
    },
    {
      id: 3,
      title: "Sonic the Hedgehog",
      overview:
        "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.",
      genre: "action",
      runtime: "90 minutes",
      poster_path: "/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
      movielist_id: lists[2].id,
      votes: 0
    },
    {
      id: 4,
      title: "Bad Boys for Life",
      overview:
        "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.",
      genre: "action",
      runtime: "100 minutes",
      poster_path: "/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg",
      movielist_id: lists[0].id,
      votes: 0
    },
    {
      id: 5,
      title: "1917",
      overview:
        "At the height of the First World War, two young British soldiers must cross enemy territory and deliver a message that will stop a deadly attack on hundreds of soldiers.",
      genre: "action",
      runtime: "150 minutes",
      poster_path: "/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
      movielist_id: lists[0].id,
      votes: 0
    },
    {
      id: 6,
      title: "The Lion King",
      overview: "Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny. But not everyone in the kingdom celebrates the new cub's arrival. Scar, Mufasa's brother—and former heir to the throne—has plans of his own. The battle for Pride Rock is ravaged with betrayal, tragedy and drama, ultimately resulting in Simba's exile. With help from a curious pair of newfound friends, Simba will have to figure out how to grow up and take back what is rightfully his.",
      genre: "childrens",
      runtime: "90 minutes",
      poster_path: "/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg",
      movielist_id: lists[1].id,
      votes: 0
    },
    {
      id: 7,
      title: "Parasite",
      overview:
        "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
      genre: "thriller",
      runtime: "115 minutes",
      poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      movielist_id: lists[2].id,
      votes: 0
    },
  ];
}

function makeExpectedMovieList(users, lists, movies = []) {
  const user = users.find((user) => user.id === movies.movielist_id);

  const number_of_movies = movies.filter(
    (movies) => movies.movielist_id === lists.id
  ).length;

  return {
    id: article.id,
    style: article.style,
    title: article.title,
    content: article.content,
    date_created: article.date_created.toISOString(),
    number_of_comments,
    author: {
      id: author.id,
      user_name: author.user_name,
      full_name: author.full_name,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  };
}

function makeExpectedArticleComments(users, articleId, comments) {
  const expectedComments = comments.filter(
    (comment) => comment.article_id === articleId
  );

  return expectedComments.map((comment) => {
    const commentUser = users.find((user) => user.id === comment.user_id);
    return {
      id: comment.id,
      text: comment.text,
      date_created: comment.date_created.toISOString(),
      user: {
        id: commentUser.id,
        user_name: commentUser.user_name,
        full_name: commentUser.full_name,
        nickname: commentUser.nickname,
        date_created: commentUser.date_created.toISOString(),
        date_modified: commentUser.date_modified || null,
      },
    };
  });
}


function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        movienight_lists,
        movienight_movies,
        movienight_users
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(
            `ALTER SEQUENCE movienight_lists_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE movienight_movies_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE movienight_users_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('movienight_lists_id_seq', 0)`),
          trx.raw(`SELECT setval('movienight_movies_id_seq', 0)`),
          trx.raw(`SELECT setval('movienight_users_id_seq', 0)`),
        ])
      )
  );
}

function seedMovieListTables(db, lists, movies, users = []) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async (trx) => {
    await trx.into("movienight_users").insert(users);
    await trx.into("movienight_lists").insert(lists);
    // update the auto sequence to match the forced id values
    await Promise.all([
      trx.raw(`SELECT setval('movienight_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ]),
      trx.raw(`SELECT setval('movienight_lists_id_seq', ?)`, [
        lists[lists.length - 1].id,
      ]),
    ]);
    // only insert comments if there are some, also update the sequence counter
    if (movies.length) {
      await trx.into("movienight_movies").insert(movies);
      await trx.raw(`SELECT setval('movienight_movies_id_seq', ?)`, [
        movies[movies.length - 1].id,
      ]);
    }
  });
}


module.exports = {
  makeUsersArray,
  makeArticlesArray,
  makeExpectedArticle,
  makeExpectedArticleComments,
  makeCommentsArray,

  makeArticlesFixtures,
  cleanTables,
  seedArticlesTables,
};
