<p align="center">
  <img alt="FastFeet-Logo" src="https://user-images.githubusercontent.com/49238044/73901634-2a37e800-4872-11ea-9c65-c6c5ddcf4eda.png"        width="450px" />
  <h4 align="center">> RESTful API of a fictitious cargo transport company.</h3>
</p>

---

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Nouani/FastFeet-API.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Nouani/FastFeet-API.svg">

  <a href="https://www.codacy.com/app/Nouani/FastFeet-API?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Nouani/FastFeet-API&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy grade" src="https://img.shields.io/codacy/grade/1b577a07dda843aba09f4bc55d1af8fc.svg">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Nouani/FastFeet-API.svg">
  <a href="https://github.com/Nouani/FastFeet-API/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Nouani/FastFeet-API.svg">
  </a>

  <a href="https://github.com/Nouani/FastFeet-API/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/Nouani/FastFeet-API.svg">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/Nouani/FastFeet-API.svg">
</p>


<p align="center">
  <a href="#page_with_curl-description">Description</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#blue_book-references">References</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#person_with_blond_hair-author-info">Author Info</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

## :page_with_curl: Description

This API was developed to be used in a web / mobile application for a fictitious cargo transport company. It was developed in the GoStack bootcamp. The objective was to put into practice the concepts of RESTful API using a relational database (SQL) and one of the KEY / VALUE type.

We use Sequelize to connect to PostgreSQL and we also use Redis to optimize the sending of emails through queues. We also apply the MVC architecture type and JWT authentications together with Middlewares.

Remember that we did as many validations as possible on each route, always using HTTP responses.

#### :rocket: Technologies

- Docker
- PostgreSQL
- NodeJS
- ExpressJS
- Sequelize
- Multer
- JWT
- Yup
- Nodemailer
- Handlebars
- ESLint
- Prettier
- EditorConfig

## :information_source: How To Use

```bash
# Clone this repository
$ git clone https://github.com/Nouani/FastFeet-API.git

# Go into the repository
$ cd FastFeet-API

# Install dependencies
$ yarn

# Run the app
$ yarn dev

# Run the queues with redis
$ yarn queue
```

#### Note: You must have installed the [Yarn](https://yarnpkg.com/) package manager globally. In addition, a PostgreSQL and Redis database (I recommend [Docker](https://www.docker.com/)). To test sending emails use the [Mailtrap](https://mailtrap.io/). Finally, set the environment variables using the ".env.example" file as a base.

## :blue_book: References

- [Rocketseat](https://docs.rocketseat.dev/)
- [Stackoverflow](https://stackoverflow.com/)
- [Mailtrap](https://mailtrap.io/)

## :person_with_blond_hair: Author Info

- Twitter - [@sanches_coo](https://twitter.com/sanches_coo)
- LinkedIn - [Nouani Sanches](https://www.linkedin.com/in/nouani-sanches-a8b39419b/m)

## :memo: License
This project is under the MIT license. See the [LICENSE](https://github.com/Nouani/FastFeet-API/blob/master/LICENSE) for more information.


