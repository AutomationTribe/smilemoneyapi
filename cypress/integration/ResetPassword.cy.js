///<reference types="cypress" />

let otp,resetToken;
describe("Reset password", ()=>{
    it("should reset password",()=>{


        cy.fixture('passwordrecovery').then((data)=>{
            //this.otp = data.otp;
            //this.resetToken = data.reset_token;
            cy.request({
                "method":"POST",
                "url":"https://smilemoney-sandbox.renmoney.com/agent/reset_password",
                "body":{
                    "otp": data.otp,
                    "token": data.resetToken,
                    "password": "chemistry",
                    "networkKey": "8437483748343"
    
    
                }
            }).then((response)=>{
    
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq('successful');
            })
        })
       
    })

})

