///<reference types="cypress" />
describe("Customer Creation",function(){

    this.beforeEach("authenticate", ()=>{
        cy.authenticate().as("authToken");
    })

    before("Remove test user",()=>{

        cy.task('queryDb',"select * from smilemoney.customer where bvn = 22271677774;").then((result) =>{
            
            if(result.length > 0){

                cy.task("queryDb","Delete from smilemoney.customer where bvn = 22271677774").then((result)=>{
                    cy.log('deleted');
                })

            }else {
                cy.log("Not found")
            }

        })
        
    });


    it("should create customer successfully",()=>{
        cy.get('@authToken').then(($token) =>{
            cy.request({
                method: "POST",
                url:"https://smilemoney-sandbox.renmoney.com/customer/creation",
                failOnStatusCode: false,
                headers:{
                    Authorization: `Bearer ${$token}`
                },
                body:{
                   "bvn":"22271677774",
                   "phoneNumber" : "07068181972",
                   "bankId" : "000013",
                   "accountNumber" : "0040054466",
                   "pin":"293748"
                }
            }).should((response) =>{
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq("successful");
                expect(response.body.message).to.eq("Customer created Successfully");
            })
        })
        })

        it("should not create customer with already exisitng phone number",()=>{
            cy.get('@authToken').then(($token) =>{
                cy.request({
                    method: "POST",
                    url:"https://smilemoney-sandbox.renmoney.com/customer/creation",
                    failOnStatusCode: false,
                    headers:{
                        Authorization: `Bearer ${$token}`
                    },
                    body:{
                       "bvn":"22271677774",
                       "phoneNumber" : "07068181972",
                       "bankId" : "000013",
                       "accountNumber" : "0040054466",
                       "pin":"293748"
                    }
                }).should((response) =>{
                    expect(response.status).to.eq(406);
                    expect(response.body.status).to.eq("failed");
                    expect(response.body.message).to.eq("Customer phone number already exist");
                })
            })
            })
})