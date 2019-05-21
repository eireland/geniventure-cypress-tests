import EggBasketObject from "../support/elements/EggBasketObject";

const eggBasket = new EggBasketObject

context('Egg Basket Game tests Challenge 2.1.2', ()=>{

    describe.only('ui elements', ()=>{
        before(()=>{
            cy.visit('https://geniventure.concord.org/#/2/1/2');
            cy.waitForLoadingImage()
            cy.get('#enter-challenge-hotspot').click();
            cy.waitForLoadingImage()
        })
        it('verify there are 8 eggs to be sorted', ()=>{
            eggBasket.getEggs()
                .should('have.length', 8)
                .and('be.visible')
        })
        it('verify chromosomes show when egg is clicked',()=>{
            eggBasket.getEggs().eq(2)
                .should('be.visible')
                .click({force:true})
                
        })
        it('verify baskets and labels are visible', ()=>{
            eggBasket.getBasketLabels().should('have.length', 3)
            eggBasket.getBaskets().should('have.length', 3)
                .each(($el, index, $el_list) => {
                    cy.wrap($el).parent().parent('.basket').should('have.class','selected')
                })
            eggBasket.getBaskets().eq(2).click({force:true});
            eggBasket.getBaskets().eq(2).parent().parent('.basket').should('have.class','selected')
            eggBasket.getBaskets().eq(0).parent().parent('.basket').should('not.have.class', 'selected')
            eggBasket.getBaskets().eq(1).parent().parent('.basket').should('not.have.class', 'selected')
        })
    })
    describe('play game', ()=>{
        describe('drop egg in correct basket', ()=>{
            it('verify correct dragon shows when egg is dropped', ()=>{
                
            })
            it('verify score is incremented', ()=>{
                
            })
        })
        describe('drop egg in wrong basket', ()=>{
            it('verify correct ITS message shows when egg is dropped', ()=>{
                
            })
            it('verify score is decremented', ()=>{
                
            })
        })
        describe('verify correct score',()=>{
            it('will finish game and verify correct score', ()=>{

            })
            it('verify correct gem', ()=>{

            })
        })
    })
})