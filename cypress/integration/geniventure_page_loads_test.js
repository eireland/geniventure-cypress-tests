// const gv_pages = ["/home","/1/1/1","/1/2/1","/1/2/2","/1/2/3","/1/2/4","/2/1/1","/2/1/2","/2/2/1","/2/2/2","/2/2/3","/2/3/1","/2/3/2","/2/3/3","/2/3/4","/2/3/5","/3/1/1","/3/1/2","/3/1/3","/3/1/4","/3/1/5","/3/1/6","/3/1/7","/3/1/8","/3/2/1","/3/2/2","/3/2/3","/3/2/4","/3/3/1","/3/3/2","/3/3/3","/3/4/1","/3/4/2","/3/4/3","/4/1/1","/4/1/2","/4/1/3","/4/1/4","/4/1/5","/4/1/6","/4/1/7","/4/1/8","/4/2/1","/4/2/2", "/4/2/3","/4/2/4","/4/2/5","/4/3/1","/4/3/2","/4/3/3","/5/1/1","/5/1/2","/5/1/3", "/6/1/1","/6/1/2","/6/1/3","/6/1/4","/6/2/1","/6/2/2","/6/3/1","/6/3/2","/6/4/1","/6/4/2","/6/5/1","/6/5/2","/6/5/3"]
// const GV_BASE_URL = "https://geniventure.concord.org/#"

// function click_on_challenge_hotspot(challenge){
//     if (challenge=="breeding barn"){
//         cy.get('.notification').click(0,-25);
//     } else {
//         cy.get('#enter-challenge-hotspot').click();
//     }

// }
// // context('it will load all the pages in Geniventure', ()=>{
// //     it('will load each page with some waits', ()=>{
// //         gv_pages.forEach((page)=>{
// //             cy.visit(GV_BASE_URL+page);
// //             cy.wait(5000);
// //             cy.get('.challenge-container .loading-images', { timeout: 60000 }).should('not.exist')
// //             // cy.wait(30000);
// //             if ((page.include("/4/2/")) || (page.include( "/4/3/")) || (page.include( "5/1/" )) || (page.include( "6/4/" )) || (page.include( "6/5/" )))
// //             {
// //                     click_on_challenge_hotspot("breeding barn")
// //                     cy.wait(5000);
// //             }
// //             else if (page != "/home" )
// //             {
// //               click_on_challenge_hotspot("sim room")
// //               cy.wait(5000)
// //             }
// //         })
// //     })
// // })