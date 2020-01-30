module.exports = {
    dialect: 'postgres', // qual o banco utilizado
    host: 'localhost', // servidor onde o banco esta hospedado
    username: 'postgres', // nome do container
    password: 'docker', // senha do container
    database: 'fastfeet', // nome do db
    define: {
        // algumas configurações extras
        timestamps: true, // garante dentro de cada tabela as colunas "createdAt", "updatedAt"
        underscored: true,
        underscoredAll: true,
    },
};
