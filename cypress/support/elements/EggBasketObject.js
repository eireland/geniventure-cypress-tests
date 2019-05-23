class EggBasketObject {
    getEggs(){
        return cy.get('.clutch-egg')
    }
    getBaskets(){
        return cy.get('.basket-hover')
    }
    getBasketLabels(){
        return cy.get('.basket-label')
    }
    getGeneLabelText(){
        return cy.get('.fv-gene-label-text')
    }
    getNotificationMessage() {
        return cy.get('.its-hint')
    }
    getChromosomeArea(){
        return cy.get('.geniblocks.genome')
    }
    selectEgg(num){
        this.getEggs().eq(num)
            .click({force:true})
        cy.wait(3000) 
    }
     getChromosomeValues(){
        var traits = {arms:false, legs:false, wings:false};
        this.getGeneLabelText().each(($el, index, $el_list)=>{
            cy.wrap($el).text()
                .then((text)=>{
                    if (text=='Arms') {
                        traits.arms=true;
                    }
                    if (text=='Legs') {
                        traits.legs=true;
                    }
                })
        });   
        return traits;
    }
}
export default EggBasketObject