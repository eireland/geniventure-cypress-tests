import MeiosisObject from "../support/elements/MeiosisObject";

const meiosis = new MeiosisObject;

context('Meiosis challenges tests', ()=>{
    before(()=>{
        cy.visit('https://geniventure.concord.org/#/1/2/1');
        cy.waitForLoadingImage()
        cy.get('#enter-challenge-hotspot').click();
        cy.waitForLoadingImage()
        cy.get('.tutorial-close').click();
    })
    describe('Challenge 1.2.1', ()=>{
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
        // })
        // it('verify meiosis hints come up', ()=>{

        // });
        // it('verify drakes appear in the stable', ()=>{

        // })
    })


})