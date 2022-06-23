///<reference types="cypress" />

describe("Register Agent",function(){
    before("Check if an agent exists",()=>{

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
    })

    it("should register a valid agent",()=>{
            cy.request({
                method: "POST",
                url:"https://smilemoney-sandbox.renmoney.com/agent/registration",
                failOnStatusCode: false,
                body:{
                    "email":"adada@yopmail.com",
                    "bvn" : "22200279145",
                    "nin":"55345376897",
                    "password" : "NoLimit@2022",
                    "networkKey" : "4342424"
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
                        "email":"adada@yopmail.com",
                        "bvn" : "22200279145",
                        "nin":"55345376897",
                        "password" : "NoLimit@2022",
                        "networkKey" : "4342424"
                    }
                }).should((response) =>{
                    expect(response.status).to.eq(406);
                    expect(response.body.status).to.eq("failed");
                    expect(response.body.message).to.eq("Agent email address already exist");
                })
            })
   
})