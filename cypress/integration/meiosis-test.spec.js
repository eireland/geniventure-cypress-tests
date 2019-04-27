import MeiosisObject from "../support/elements/MeiosisObject";
import MissionFooterObject from "../support/elements/MissionFooterObject";

const meiosis = new MeiosisObject;
const footer = new MissionFooterObject;

context('Meiosis challenges tests', ()=>{
    describe('Challenge 1.2.1', ()=>{
        before(()=>{
            cy.visit('https://geniventure.concord.org/#/1/2/1');
            cy.waitForLoadingImage()
            cy.get('#enter-challenge-hotspot').click();
            cy.waitForLoadingImage()
        })
        it('verify meiosis hints come up', ()=>{
            footer.getTutorialTitle().should('be.visible').and('contain', "Male/Female button");
            cy.get('.change-sex-toggle-group').then(($el)=>{
                // expect($el).to.have.class('tutorial')
                // expect($el).to.have.class('mini-pulse')
            })
            footer.closeTutorialDialog(); 
            footer.getTutorialTitle().should('not.exist'); 
            footer.getTutorialButton().click();
            footer.getTutorialTitle().should('be.visible');
            footer.closeTutorialDialog(); 
        });
        it('test dropdown are working',()=>{
            meiosis.addTrait('Arms')
            meiosis.addTrait('Legs')
            meiosis.addTrait('Wings')
            //verify that your drake has all traits
            meiosis.parseDrakeLink('current').should('include','allLimb')
            meiosis.parseDrakeLink('current').should('include','wing')  
            meiosis.removeTrait('Arms')
            meiosis.removeTrait('Legs')
            meiosis.removeTrait('Wings')
            //verify that your drake has all traits removed
            meiosis.parseDrakeLink('current').should('not.include','allLimb')
            meiosis.parseDrakeLink('current').should('not.include','fore')
            meiosis.parseDrakeLink('current').should('not.include','hind')
            meiosis.parseDrakeLink('current').should('include','noWing')   
        })
        it('will try to get the target drake', ()=>{
            cy.waitForTargetDrake();
            meiosis.parseDrakeLink('target').then((target)=>{
                //st,m,wing,fore,a5,flair,horn,noRostral,healthy
                cy.log("target: "+target);
                meiosis.parseDrakeLink('current').then((current)=>{
                    cy.log("current: "+current);

                    if (target.includes('wing')){
                        cy.log('has wings')
                        meiosis.addTrait('Wings')
                    };
                    if (target.includes('noWing')){
                        cy.log('has wings')
                        meiosis.addTrait('Wings')
                    };
                    if (target.includes('allLimb')){
                        cy.log('has both arms and legs')
                        meiosis.addTrait('Arms')
                        meiosis.addTrait('Legs')
                    }
                    if (target.includes('noLimb')) {
                        meiosis.removeTrait('Arms');
                        meiosis.removeTrait('Legs');
                    }
                    if (target.includes('fore')){
                        cy.log('has arms only')
                        meiosis.addTrait('Arms')
                        meiosis.removeTrait('Legs');
                    }
                    if (target.includes('hind')) {
                        cy.log('has legs only')
                        meiosis.addTrait('Legs')
                        meiosis.removeTrait('Arms');
                    }
                    if ((target.includes('m')) && (current.includes('f'))){
                        cy.log('is male')                    
                        meiosis.selectGender("m")
                    } 
                    if ((target.includes('f')) && (current.includes('m'))){
                        cy.log('is female')
                        meiosis.selectGender('f')
                    }
                })
                meiosis.parseDrakeLink('current').then((current)=>{
                    cy.log("current: "+current);
                    cy.log("target: "+target);
                    cy.log(current.every(t=>target.includes(t)))//A.every( e => B.includes(e) )
                })    
            })
        })

    })
    describe.only('Challenge 1.1.1', ()=>{
        before(()=>{
            cy.visit('https://geniventure.concord.org/#/1/1/1');
            cy.waitForLoadingImage()
            cy.get('#enter-challenge-hotspot').click();
            cy.waitForLoadingImage()
        })
        it('verify hint is visible and can be paged through', ()=>{
            footer.getTutorialTitle().should('be.visible').and('contain', "Chromosomes");
            cy.get('.change-sex-toggle-group').then(($el)=>{
                // expect($el).to.have.class('tutorial')
                // expect($el).to.have.class('mini-pulse')
            })
            footer.clickNextButton();
            footer.getTutorialTitle().should('be.visible').and('contain', "Genes");
            footer.clickNextButton();
            footer.getTutorialTitle().should('be.visible').and('contain', "Alleles");
            footer.clickNextButton();
            footer.getTutorialTitle().should('be.visible').and('contain', "Tutorial button");
            footer.clickBackButton();
            footer.getTutorialTitle().should('be.visible').and('contain', "Alleles");
            footer.clickBackButton();
            footer.getTutorialTitle().should('be.visible').and('contain', "Genes");
            footer.closeTutorialDialog(); 
            footer.getTutorialTitle().should('not.exist'); 
            footer.getTutorialButton().click();
            footer.getTutorialTitle().should('be.visible');
            footer.closeTutorialDialog(); 
        })
        it('verify drakes appear in the stable', ()=>{

        })
    })


})