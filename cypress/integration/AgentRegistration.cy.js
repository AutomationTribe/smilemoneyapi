///<reference types="cypress" />

describe("Register Agent",function(){
    before("Check if an agent exists",function(){

        //cy.authenticate().as("authToken");

        cy.task('queryDb',"select * from smilemoney.agent where bvn = 22200279145;").then((result) =>{
            
            if(result.length > 0){

                cy.task("queryDb","Delete from smilemoney.agent where bvn = 22200279145").then((result)=>{
                    cy.log('deleted');
                })

            }else {
                cy.log("Not found")
            }

        })

        cy.fixture("agent").then(function(data){

            console.log(data.agentRegister.invalidEmail);
           this.email =  data.agentRegister.email;
            this.bvn  = data.agentRegister.bvn;
            this.nin = data.agentRegister.nin;
            this.password = data.agentRegister.password;
            this.networkKey = data.agentRegister.networkKey;

            this.invalidEmail =  data.agentRegister.invalidEmail;
            this.invalidBVN = data.agentRegister.invalidBVN;
            this.invalidNIN =data.agentRegister.invalidNIN;

        })
    })

    
    it.only("should not register an agent with invalid BVN",function(){
        cy.request({
            method: "POST",
            url:"https://smilemoney-sandbox.renmoney.com/agent/registration",
            failOnStatusCode: false,
            body:{
                "email":this.email,
                "bvn" : this.invalidBVN,
                "nin":this.nin,
                "password" : this.password,
                "networkKey" : this.networkKey
            }
        }).should((response) =>{
           expect(response.status).to.eq(400);
           expect(response.body.status).to.eq("failed");
           expect(response.body.message).to.eq("Invalid BVN");
        })
    })
    it("should register an valid agent",function(){
            cy.request({
                method: "POST",
                url:"https://smilemoney-sandbox.renmoney.com/agent/registration",
                failOnStatusCode: false,
                body:{
                    "email":this.email,
                    "bvn" : this.bvn,
                    "nin":this.nin,
                    "password" : this.password,
                    "networkKey" : this.networkKey
                }
            }).should((response) =>{
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq("successful");
               // expect(response.body.message).to.eq("User found");
            })
    })

    it("should not register an already existing agent",()=>{
                cy.request({
                    method: "POST",
                    url:"https://smilemoney-sandbox.renmoney.com/agent/registration",
                    failOnStatusCode: false,
                    body:{
                        "email":this.email,
                        "bvn" : this.bvn,
                        "nin":this.nin,
                        "password" : this.password,
                        "networkKey" : this.networkKey
                    }
                }).should((response) =>{
                    expect(response.status).to.eq(406);
                    expect(response.body.status).to.eq("failed");
                    expect(response.body.message).to.eq("Agent email address already exist");
                })
            })
   
})