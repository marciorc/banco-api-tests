const { expect } = require("chai")
const { describe, beforeEach } = require("mocha")
const { obterToken } = require('../helpers/autenticacao.js')
const request = require('supertest')
const postTransferencias = require('../fixtures/postTransferencias.json')
require('dotenv').config()

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        
        let token

        beforeEach( async () => {
            token = await obterToken('julio.lima', '123456')
        })

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
})