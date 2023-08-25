import { response } from "express";

describe('BE Resto Test', () => {

    // Test for all restaurants
    it('should return all restaurants', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/api/restaurants'
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect((response.body)).to.be.an('array');
        });
    });

    // Test for a specific restaurant
    it('should return a specific restaurant', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/api/restaurants/Burger King'
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('IRestaurantFrontEnd');
        });
    });

    // Test to add restaurant
    it('should add a restaurant', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/api/restaurants',
            body: {
                    name: 'test restaurant',
                    phoneNumber: '123456789',
                    website: 'www.test.com'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    // Test to edit restaurant
    it('should edit a restaurant', () => {
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8081/api/restaurants/test restaurant',
            body: {
                    name: 'test restaurant',
                    phoneNumber: '987654321',
                    website: 'www.test123.com'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('IRestaurantBackEnd');
        });
    });

    // Test to delete restaurant
    it('should delete a restaurant', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8081/api/restaurants/test restaurant'
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('string');
        });
    });
})