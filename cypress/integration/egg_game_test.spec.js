import EggBasketObject from "../support/elements/EggBasketObject";
import GeniventureObject from "../support/elements/GeniventureObject";

const eggBasket = new EggBasketObject;
const geniventure = new GeniventureObject;

context('Egg Basket Game tests Challenge 2.1.2', ()=>{

    describe('ui elements', ()=>{
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
                .click({force:true})
            eggBasket.getChromosomeArea()
                .should('be.visible')
        })
        it('verify baskets and labels are visible', ()=>{
            eggBasket.getBasketLabels().should('have.length', 3)
            eggBasket.getBaskets().should('have.length', 3)
                .each(($el, index, $el_list) => {
                    cy.wrap($el).parent().parent('.basket').should('have.class','selected')
                })
            // eggBasket.getBaskets().eq(2).click({force:true});
            // eggBasket.getBaskets().eq(2).parent().parent('.basket').should('have.class','selected')
            // eggBasket.getBaskets().eq(0).parent().parent('.basket').should('not.have.class', 'selected')
            // eggBasket.getBaskets().eq(1).parent().parent('.basket').should('not.have.class', 'selected')
        })
    })
    describe('play game', ()=>{
        describe('drop egg in correct basket', ()=>{
            it('will get chromosome values, and verify basket clicked on is highlighted', ()=>{
                var traits;
                var arms=false, legs=false;
                eggBasket.getGeneLabelText().each(($el, index, $el_list)=>{
                    cy.wrap($el).text()
                        .then((text)=>{
                            if (text=='Arms') {
                                arms=true;
                            }
                            if (text=='Legs') {
                                legs=true;
                            }
                        })
                })
                // eggBasket.getChromosomeValues()
                    .then(()=>{
                    if ((arms) && (legs)) {
                        eggBasket.getBasketLabels().contains('Drakes with arms and legs').siblings().click({force:true});
                        eggBasket.getBasketLabels().contains('Drakes with arms and legs').parent().parent('.basket').should('have.class','selected')
                        eggBasket.getBasketLabels().contains('Drakes with only legs').parent().parent('.basket').should('not.have.class', 'selected')
                        eggBasket.getBasketLabels().contains('Drakes with only arms').parent().parent('.basket').should('not.have.class', 'selected')
                    } else if (legs) {
                        eggBasket.getBasketLabels().contains('Drakes with only legs').siblings().click({force:true});
                        eggBasket.getBasketLabels().contains('Drakes with arms and legs').parent().parent('.basket').should('not.have.class','selected')
                        eggBasket.getBasketLabels().contains('Drakes with only legs').parent().parent('.basket').should('have.class', 'selected')
                        eggBasket.getBasketLabels().contains('Drakes with only arms').parent().parent('.basket').should('not.have.class', 'selected')
                    } else if (arms){
                        eggBasket.getBasketLabels().contains('Drakes with only arms').siblings().click({force:true});
                        eggBasket.getBasketLabels().contains('Drakes with arms and legs').parent().parent('.basket').should('not.have.class','selected')
                        eggBasket.getBasketLabels().contains('Drakes with only legs').parent().parent('.basket').should('not.have.class', 'selected')
                        eggBasket.getBasketLabels().contains('Drakes with only arms').parent().parent('.basket').should('have.class', 'selected')
                    }
                })
            })
            it('verify correct dragon shows when egg is dropped', ()=>{
                
            })
            it('verify score is incremented', ()=>{
                cy.get('#egg-hatch').should('be.visible');
                cy.wait(2000)
                geniventure.getScoreCount().invoke('text')
                    .then((text)=>{
                        expect(text).to.contain('1')
                })
            })
        })
        describe('drop egg in wrong basket', ()=>{
            it('verify chromosomes show when egg is clicked',()=>{
                eggBasket.getEggs().eq(0)
                    .click({force:true})
                eggBasket.getChromosomeArea()
                    .should('be.visible')
                cy.wait(3000)    
            })
            it('will get chromosome values, and verify basket clicked on is highlighted', ()=>{
                var arms=false, legs=false;
                eggBasket.getGeneLabelText().each(($el, index, $el_list)=>{
                    cy.wrap($el).text()
                        .then((text)=>{
                            if (text=='Arms') {
                                arms=true;
                            }
                            if (text=='Legs') {
                                legs=true;
                            }
                        })
                }).then(()=>{
                    if ((arms) && (legs)) {
                        eggBasket.getBasketLabels().contains('Drakes with only arms').siblings().click({force:true});
                    } else if (legs) {
                        eggBasket.getBasketLabels().contains('Drakes with arms and legs').siblings().click({force:true});
                    } else if (arms){
                        eggBasket.getBasketLabels().contains('Drakes with only legs').siblings().click({force:true});
                    }
                })
            })
            it('verify correct ITS message shows when egg is dropped', ()=>{
                geniventure.getITSHint().should('be.visible').and('contain',"egg doesn't belong")
            })
            it('verify score is not incremented', ()=>{
                cy.get('#egg-hatch').should('be.visible');
                cy.wait(2000)
                geniventure.getScoreCount().invoke('text')
                    .then((text)=>{
                        expect(text).to.contain('1')
                })
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