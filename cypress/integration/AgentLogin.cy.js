///<reference types="cypress" />
describe("Agent Login",function(){
    before("Load data from fixture",function(){
        cy.fixture("agent").then(function(data){

            this.email = data.agentLogin.email;
            this.password = data.agentLogin.password;
            this.invalidEmail = data.agentLogin.invalidEmail;
            this.invalidPassword = data.agentLogin.invalidPassword;
        })
    })
    it("should log agent in with valid email and password",function(){
        cy.request({
            method:"POST",
            url: "https://smilemoney-sandbox.renmoney.com/agent/login",
            failOnStatusCode: false,
            body:{
                "email": this.email,
                "password": this.password,
                "networkKey": "4342424"
            }
        }).should((response)=> {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq("successful");
            expect(response.body.message).to.eq("Login Successful");
            expect(response.body.data.access_token).to.exist;
            expect(response.body.data.ExpiresIn).to.exist;

        })
    })

    it("should not login with wrong email or password",function(){
        cy.request({
            method:"POST",
            url: "https://smilemoney-sandbox.renmoney.com/agent/login",
            failOnStatusCode: false,
            body:{
                "email": this.invalidEmail,
                "password": this.invalidPassword,
                "networkKey": "4342424"
            }
        }).should((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq("failed");
            expect(response.body.message).to.eq("Invalid email");

        })
    })

    it("should not login with empty email and password",function(){
        cy.request({
            method:"POST",
            url: "https://smilemoney-sandbox.renmoney.com/agent/login",
            failOnStatusCode: false,
            body:{
                "email": "",
                "password": "",
                "networkKey": "4342424"
            }
        }).should((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq("failed");
            expect(response.body.message).to.eq("Email is empty or invalid,Invalid email,Password is empty or invalid");

        })
    })
    it("should not login with empty email",function(){
        cy.request({
            method:"POST",
            url: "https://smilemoney-sandbox.renmoney.com/agent/login",
            failOnStatusCode: false,
            body:{
                "email": "",
                "password": this.email,
                "networkKey": "4342424"
            }
        }).should((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq("failed");
            expect(response.body.message).to.eq("Email is empty or invalid,Invalid email");

        })
    })

    it("should not login with empty password",function(){
        cy.request({
            method:"POST",
            url: "https://smilemoney-sandbox.renmoney.com/agent/login",
            failOnStatusCode: false,
            body:{
                "email": this.email,
                "password": "",
                "networkKey": "4342424"
            }
        }).should((response)=> {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq("failed");
            expect(response.body.message).to.eq("Password is empty or invalid");

        })
    })
})