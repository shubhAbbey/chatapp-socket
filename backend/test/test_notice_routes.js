const chai = require("chai");
const chaiHttp = require("chai-http");


const app = require("../server").app;


const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);



describe("Notice Route =>", ()=> {

    let message = `new notice 1`;

    before((done)=> {
        chai.request(app).post("/notice").send({message: message}).end();
        done();
    });


    describe("Adding a new notice", ()=> {

        it("should create a new notice", (done) => {
            chai.request(app)
                .post(`/notice`)
                .send({
                    message: message
                })
                .end((err, res)=> {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal("Notice Sent");
                    done();
                });
        });

    });

});
