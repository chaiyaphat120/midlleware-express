let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server.js')

//Assertion Style


chai.should()

chai.use(chaiHttp)

describe('User Api', () => {
    /**
     * Test GET ROUT
     */
    describe('GET /menu', () => {
        it('It should get all menu', (done) => {
            chai.request(server)
                .get('/menu')
                .end((err, response) => {
                    const {user} = response.body
                    response.should.have.status(200)
                    user.should.be.a('array')
                    user.length.should.be.eq(2)
                    user[0].should.have.property("_id")
                    user[0].should.have.property("name").eq("chaiyaphat")
                    user[0].should.have.property("price")
                    user[0].should.have.property("createdAt")
                    user[0].should.have.property("updatedAt")
                    user[0].should.have.property("price_vat").eq(214)
                })
                    done();  // MAGIC == EVIL.
        })
    })
})


/*
 expect(res.body).to.have.property('nome');
                expect(res.body.nome).to.equal('abc');
                expect(res.body).to.have.property('email');
                expect(res.body.email).to.equal('a@a.com');
                expect(res.body).to.have.property('criacao');
                expect(res.body.criacao).to.not.equal(null);
                expect(res.body).to.have.property('atualizado');
                expect(res.body.atualizado).to.not.equal(null);
                expect(res.body).to.have.property('datanascimento');
                expect(res.body.datanascimento).to.not.equal(null);
                expect(res.body).to.have.property('username');
                expect(res.body.username).to.equal('abcdef');
                expect(res.body).to.have.property('statusmsg');
                expect(res.body.statusmsg).to.equal('status');
                expect(res.body).to.have.property('genero');
                expect(res.body.genero).to.equal('M');
                expect(res.body).to.have.property('descricao');
                expect(res.body.descricao).to.equal('descricao');

*/