const { expect } = require("chai")
const { describe, beforeEach } = require("mocha")
const { obterToken } = require('../helpers/autenticacao.js')
const request = require('supertest')
const postTransferencias = require('../fixtures/postTransferencias.json')
require('dotenv').config()

describe('Transferências', () => {
    let token

    beforeEach( async () => {
        token = await obterToken('julio.lima', '123456')
    })

    describe('POST /transferencias', () => {
        
        

        it('Deve retornar sucesso com 201 quando valor da transferência for acima de R$ 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(response.status).to.equal(201)
        })

        it('Deve retornar erro com 422 quando valor da transferência for abaixo de R$ 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(response.status).to.equal(422)
        })
    })

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferência contido no BD quando o id for valido', async () => {
            const response = await request(process.env.BASE_URL)
                .get(`/transferencias/${id}`)
                .set('Authorization', `Bearer ${token}`)

            console.log(response.body)
            expect(response.status).to.equal(200)
        })
    })

    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginacao quando informar limite de 10 registros', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit-10')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).to.equal(200)
            expect(response.body.limit).to.equal(10)
            expect(response.body.transferencias).to.have.lenghOf(10)

        })

    })
})