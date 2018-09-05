var expect  = require('chai').expect;
var request = require('request');

/*it('Main page content', function(done) {
    request('http://localhost:8080' , function(error, response, body) {
        expect(body).to.equal('Hello World');
        done();
    });
    
});
*/

it('Get JSON', function(done) {
    request('http://localhost:8080/campaigns?id=123' , function(error, response, body) {
        expect(body).to.equal('Hello World');
        done();
    });
});