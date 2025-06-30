const request = require('supertest')

const obterToken = async (user, pass) => {
    const responseLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': user,
            'senha': pass
        })

    return responseLogin.body.token
}

module.exports = {
    obterToken
}