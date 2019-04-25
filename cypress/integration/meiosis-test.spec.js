import MeiosisObject from "../support/elements/MeiosisObject";

const meiosis = new MeiosisObject;

context('Meiosis challenges tests', ()=>{
    before(()=>{
        cy.visit('https://geniventure.concord.org/#/1/2/1');
    })
    describe('Challenge 1.2.1', ()=>{
        // it.only('test dropdown locators',()=>{
        //     meiosis.addTrait('Arms')
        //     meiosis.addTrait('Legs')
        //     meiosis.addTrait('Wings')
        //     meiosis.removeTrait('Arms')
        //     meiosis.removeTrait('Legs')
        //     meiosis.removeTrait('Wings')

        // })

        // it('test dropdowns are working', ()=>{
        //     var targetDrakeTraits = [], 
        //         currentDrakeTraits = [],

        //     targetDrakeTraits = meiosis.parseDrakeLink('target');
        //     currentDrakeTraits = meiosis.getCurrentDropDownValues();
            
        //     if ((targetDrakeTraits.include("allLimb")) || ((targetDrakeTraits.include("fore")))) {
        //         if (!currentDrakeTraits.include("Arms")) { 
        //             meiosis.addTrait('Arms');
        //         }
        //     }
        //     if ((targetDrakeTraits.include("allLimb")) || ((targetDrakeTraits.include("hind")))) {
        //         if (!currentDrakeTraits.include("Legs")) { 
        //             meiosis.addTrait('Legs');
        //         }
        //     }
        //     if (targetDrakeTraits.include("wing")) {
        //         if (!currentDrakeTraits.include("Wings")) { 
        //             meiosis.addTrait('Wings');
        //         }
        //     }
        //     if (targetDrakeTraits.include("wing")) {
        //         if (!currentDrakeTraits.include("Wings")) { 
        //             meiosis.addTrait('Wings');
        //         }
        //     }

            
        //     //Have to make sure both alleles are -less when noWing and noLimb 
        //     while(meiosis.getDrakeLink('current') != meiosis.getDrakeLink('target')) {
        //         if (targetDrakeTraits.include("noWing")) {
        //             if (currentDrakeTraits.include("Wings")) { 
        //                 meiosis.addTrait('Wingless');
        //             }
        //         }
        //         if (targetDrakeTraits.include("noLimb")) {
        //             if (currentDrakeTraits.include("Arms")) { 
        //                 meiosis.addTrait('Armless');
        //             }
        //             if (currentDrakeTraits.include("Leg")) { 
        //                 meiosis.addTrait('Legless');
        //             }
        //         }
        //     } 
        //     //while loop makes sure that dominant traits do not exist if the trait is not there.
            
        // })
        // it('verify meiosis hints come up', ()=>{

        // });
        // it('verify drakes appear in the stable', ()=>{

        // })
    })


})