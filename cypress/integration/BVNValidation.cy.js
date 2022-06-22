///<reference types="cypress" />

describe("BVN Validation",function(){
    it("should validate valid BVN",()=>{
        cy.request({
            method:"POST",
            url:"https://smilemoney-sandbox.renmoney.com/agent/bvn_validation",
            body: {
                "bvn": "22150443595"
            }
        }).should((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body.status).to.eq("successful")
            expect(response.body.message).to.eq("Successful")
        });
    })

    it("should not validate invalid BVN",()=>{
        cy.request({
            method:"POST",
            url:"https://smilemoney-sandbox.renmoney.com/agent/bvn_validation",
            failOnStatusCode : false,
            body: {
                "bvn": "221504435x5"
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