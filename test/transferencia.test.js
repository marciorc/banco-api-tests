const { expect } = require("chai")
const { describe, beforeEach } = require("mocha")
const { obterToken } = require('../helpers/autenticacao.js')
const request = require('supertest')
require('dotenv').config()

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        
        let token

        beforeEach( async () => {
            token = await obterToken('julio.lima', '123456')
        })

        it('Deve retornar sucesso com 201 quando valor da transferência for acima de R$ 10,00', async () => {
            
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 11,
                    'token': ''
                })
            expect(response.status).to.equal(201)
        })

        it('Deve retornar erro com 422 quando valor da transferência for abaixo de R$ 10,00', async () => {

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 7,
                    'token': ''
                })
            expect(response.status).to.equal(422)
        })
    })
})