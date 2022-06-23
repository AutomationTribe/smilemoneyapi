///<reference types="cypress" />

describe("BVN Validation",function(){

    before("Load BVN data from fixture",function(){

        cy.fixture("BVN").then(function(data){
           // console.log(data.validBVN);
            this.validBVN = data.validBVN;
            this.invalidBVN = data.invalidBVN;
        })

    })
    it("should validate valid BVN",function(){
        cy.request({
            method:"POST",
            url:"https://smilemoney-sandbox.renmoney.com/agent/bvn_validation",
            body: {
                "bvn": this.validBVN
            }
        }).should((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body.status).to.eq("successful")
            expect(response.body.message).to.eq("Successful")
        });
    })

    it("should not validate invalid BVN",function(){
        cy.request({
            method:"POST",
            url:"https://smilemoney-sandbox.renmoney.com/agent/bvn_validation",
            failOnStatusCode : false,
            body: {
                "bvn": this.invalidBVN
            }
        }).should((response) =>{
            expect(response.status).to.eq(404)
            expect(response.body.status).to.eq("failed")
            expect(response.body.message).to.eq("BVN not found")
        });
    })

    it("should not validate empty BVN",()=>{
        cy.request({
            method:"POST",
            url:"https://smilemoney-sandbox.renmoney.com/agent/bvn_validation",
            failOnStatusCode: false,
            body:{
                "bvn":""
            }
        }).should((response)=>{
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq("failed");
            expect(response.body.message).to.eq("BVN is empty or invalid");
        })
    })
    
})