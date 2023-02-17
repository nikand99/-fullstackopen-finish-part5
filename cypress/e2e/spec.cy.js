describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    const user = {
      name: 'Niklas Andersson 99',
      username: 'nikand',
      password: 'test',
    }
    const user2 = {
      name: 'Niklas Andersson 88',
      username: 'nikand8',
      password: 'test8',
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      // ...
      cy.get('#username').type('nikand')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Niklas Andersson 99 logged in')
    })
    it('fails with wrong credentials', function() {
      // ...
      cy.get('#username').type('nikand2')
      cy.get('#password').type('test2')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong usernamne or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should("have.css", "border-style", "solid")

      cy.get("html").should("not.contain", "Niklas Andersson 99 logged in");

    })
  })
  // 5.18
    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('nikand')
        cy.get('#password').type('test')
        cy.get('#login-button').click()
        cy.contains('Niklas Andersson 99 logged in')
      })
      // step 3
      it('A blog can be created', function() {
        cy.get('#showBlog').click()

        cy.get('#title').type('Bok titel')
        cy.get('#author').type('Författare')
        cy.get('#url').type('http://test.nu.se')
        cy.get('#createBlog').click()

        cy.contains('Bok titel Författare')
        cy.get('html').should('contain', 'Bok titel Författare')
      })
      // bloglist end to end testing, step4
      it('Users can like a blog.', function() {
        cy.get('#showBlog').click()
        cy.get('#title').type('Bok titel')
        cy.get('#author').type('Författare')
        cy.get('#url').type('http://test.nu.se')
        cy.get('#createBlog').click()

        cy.get('#viewOneBlog').click()
        cy.get('.buttonLike').click()
        cy.get('html').should('contain', 'likes: 1')
      })

      // User who created a blog can delete it, step5
      it('User who created a blog can delete it.', function() {
        cy.get('#showBlog').click()
        cy.get('#title').type('Bok titel')
        cy.get('#author').type('Författare')
        cy.get('#url').type('http://test.nu.se')
        cy.get('#createBlog').click()

        cy.get('#viewOneBlog').click()
        cy.get('#removeBlog').click()
        cy.get('html').should('not.contain', 'Bok titel Författare')
      })

      // User who created a blog can delete it, step6
      it('Other users but the creator do not see the delete button', function() {
        cy.get('#showBlog').click()
        cy.get('#title').type('Bok titel')
        cy.get('#author').type('Författare')
        cy.get('#url').type('http://test.nu.se')
        cy.get('#createBlog').click()

        // 
        cy.get('#logout').click()
        cy.get('#username').type('nikand8')
        cy.get('#password').type('test8')
        cy.get('#login-button').click()

        cy.get('#viewOneBlog').click()
        cy.get('html').should('not.contain', '#removeBlog')
      })
    })
    describe('When logged in 2', function() {
      // blogs are ordered according to likes with the blog with the most likes being first step 7
      
      beforeEach(function() {
        cy.get('#username').type('nikand')
        cy.get('#password').type('test')
        cy.get('#login-button').click()
        cy.contains('Niklas Andersson 99 logged in')
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500) 
        cy.get('#showBlog').click()
        cy.get('#title').type('A1')
        cy.get('#author').type('The title with the third most likes')
        cy.get('#url').type('http://test.nu.se')
        cy.get('#createBlog').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500) 

        cy.get('#title').type('B2')
        cy.get('#author').type('The title with the most likes')
        cy.get('#url').type('http://test.nu.se')
        cy.get('#createBlog').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500) 
        
        cy.get('#title').type('C3')
        cy.get('#author').type('The title with the second most likes')
        cy.get('#url').type('http://test.nu.se')
        cy.get('#createBlog').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500) 
      })
      it('blogs are ordered according to likes with the blog with the most likes being first', function() {
        
        cy.contains('A1 The title with the third most likes').contains('view').click()
        cy.contains('B2 The title with the most likes').contains('view').click()
        cy.contains('C3 The title with the second most likes').contains('view').click()
        

        // clicks on B2
        cy.get('.buttonLike').then($elements => {cy.wrap($elements[1]).click()})
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000) 
        // B2 swaps places with A1 to become the first element - clicks on B2
        cy.get('.buttonLike').then($elements => {cy.wrap($elements[0]).click()})
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000) 
        // C3 is the last element - clicks on C3
        cy.get('.buttonLike').then($elements => {cy.wrap($elements[2]).click()})  

        cy.get('.togglableContent').eq(0).should('contain', 'The title with the most likes')
        cy.get('.togglableContent').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.togglableContent').eq(2).should('contain', 'The title with the third most likes')

      })
  })
})
