import MeiosisObject from "../support/elements/MeiosisObject";
import MissionFooterObject from "../support/elements/MissionFooterObject";
import GeniventureObject from "../support/elements/GeniventureObject";

const meiosis = new MeiosisObject;
const footer = new MissionFooterObject;
const geniventure = new GeniventureObject;

const gems=['blue','yellow','red','black'];

context('Meiosis challenges tests', ()=>{
    describe('Challenge 1.1.1', ()=>{
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
            meiosis.getSTABLE_COUNTER().should('contain','0 / 5');
            meiosis.getHATCH_DRAKE_BUTTON().click();
            meiosis.getSTABLE_COUNTER().should('contain','1 / 5');
            meiosis.getSTABLE_DRAKE().should('have.length',1);            
            meiosis.selectGender('m');
            cy.wait(1000)
            meiosis.saveDrake();
            cy.wait(1000)
            meiosis.getSTABLE_COUNTER().should('contain','2 / 5');
            meiosis.getSTABLE_DRAKE().should('have.length',2);
        })
        it('verify error message appears if the drake has been previously submitted', ()=>{
            meiosis.selectGender('f')
            cy.wait(1000)
            meiosis.saveDrake();
            cy.wait(1000)
            geniventure.getITSHint().should('be.visible').and('contain','You already have a drake that looks just like that!')
            geniventure.closeNotification();
            meiosis.getSTABLE_COUNTER().should('contain','2 / 5');
            meiosis.getSTABLE_DRAKE().should('have.length',2);
        })
    })
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
            cy.parseDrakeLink('current').should('include','allLimb')
            cy.parseDrakeLink('current').should('include','wing')  
            meiosis.removeTrait('Arms')
            meiosis.removeTrait('Legs')
            meiosis.removeTrait('Wings')
            //verify that your drake has all traits removed
            cy.parseDrakeLink('current').should('not.include','allLimb')
            cy.parseDrakeLink('current').should('not.include','fore')
            cy.parseDrakeLink('current').should('not.include','hind')
            cy.parseDrakeLink('current').should('include','noWing')   
        })
    })
    describe('Challenge 1.2.2', ()=>{    
        before(()=>{
            cy.visit('https://geniventure.concord.org/#/1/2/2');
            cy.waitForLoadingImage()
            cy.get('#enter-challenge-hotspot').click();
            cy.waitForLoadingImage()
        })
        it('will submit the correct target drake and verify gem', ()=>{
            cy.waitForTargetDrake();
            cy.parseDrakeLink('target').then((target)=>{
                //st,m,wing,fore,a5,flair,horn,noRostral,healthy
                cy.log("target: "+target);
                cy.parseDrakeLink('current').then((current)=>{
                    cy.log("current: "+current);

                    if (target.includes('wing')){
                        cy.log('has wings')
                        meiosis.addTrait('Wings')
                    };
                    if (target.includes('noWing')){
                        cy.log('has no wings')
                        meiosis.removeTrait('Wings')
                        meiosis.removeTrait('Wings')
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
                cy.parseDrakeLink('current').then((current)=>{
                    cy.log("current: "+current);
                    cy.log("target: "+target);
                    cy.log(current.every(t=>target.includes(t)))//A.every( e => B.includes(e) )
                    if(current.every(t=>target.includes(t))) {
                        meiosis.saveDrake();
                    } 
                    geniventure.getNOTIFICATION_FOOTER().should('be.visible').and('contain', 'Challenge completed!')
                    var color = footer.getActionColor()
                    cy.log("color: "+color)
                        footer.getGem().should('have.class','gem-fill-'+gems.indexOf(color))
                }) 
            })
            
        })
    })    
    describe('Challenge 1.2.3', ()=>{    
        before(()=>{
            cy.visit('https://geniventure.concord.org/#/1/2/3');
            cy.waitForLoadingImage()
            cy.get('#enter-challenge-hotspot').click();
            cy.waitForLoadingImage()
        })
        it('will submit the wrong target drake by selecting the wrong gender', ()=>{
            cy.waitForTargetDrake();
            cy.parseDrakeLink('target').then((target)=>{
                //st,m,wing,fore,a5,flair,horn,noRostral,healthy
                cy.log("target: "+target);
                if (target.includes('wing')){
                    cy.log('has wings')
                    meiosis.addTrait('Wings')
                };
                if (target.includes('noWing')){
                    cy.log('has no wings')
                    meiosis.removeTrait('Wings')
                    meiosis.removeTrait('Wings')
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
                cy.log("gender: "+meiosis.getCurrentGender())
                if ((target.includes('m')) && (meiosis.getCurrentGender()=='m')){ 
                    cy.log('is male')                    
                    meiosis.selectGender("f")
                } 
                if ((target.includes('f')) && (meiosis.getCurrentGender()=='f')){
                    cy.log('is female')
                    meiosis.selectGender('m')
                }
                meiosis.saveDrake();
                cy.wait(3000)
                geniventure.getITSHint().should('be.visible').and('contain', "That's not the drake!");
            })
        })
        it('will submit the wrong gender drake and verify remeditiation is shown', ()=>{
            geniventure.closeNotification();
            cy.parseDrakeLink('target').then((target)=>{
                cy.log("gender: "+meiosis.getCurrentGender())
                if ((target.includes('m')) && (meiosis.getCurrentGender()=='m')){ 
                    cy.log('is male')                    
                    meiosis.selectGender("f");
                } 
                if ((target.includes('f')) && (meiosis.getCurrentGender()=='f')){
                    cy.log('is female')
                    meiosis.selectGender('m');
                }
                meiosis.saveDrake();
                geniventure.closeNotification();
                meiosis.saveDrake();
                cy.wait(3000)
                geniventure.getITSHint().should('be.visible').and('contain', "Let's do a bonus challenge now");
            })
        })
        it('will verify user is taken to remediation', ()=>{
            geniventure.gotoNext();
            geniventure.getITSHint().should('be.visible').and('contain', "simplify things");
            geniventure.closeNotification();
        }) 
    })
})