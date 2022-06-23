///<reference types="cypress" />

let otp,resetToken;
describe("Reset password", function(){

    before("Get Reset Token and OTP from fixture",function(){
        cy.fixture("passwordrecovery").then(function(data){
            this.token = data.reset_token;
            this.otp = data.otp;
        })

    })
    it("should reset password",function(){


        cy.fixture('passwordrecovery').then((data)=>{
            //this.otp = data.otp;
            //this.resetToken = data.reset_token;
            cy.request({
                "method":"POST",
                "url":"https://smilemoney-sandbox.renmoney.com/agent/reset_password",
                "body":{
                    "otp": this.otp,
                    "token": this.token,
                    "password": "chemistry",
                    "networkKey": "8437483748343"
    
    
                }
            }).then((response)=>{
    
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq('successful');
                expect(response.body.message).to.eq('Password reset succcessful');
            })
        })
       
    })

})

