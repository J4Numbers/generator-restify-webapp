describe('the application on HTTP', function () {
  it('should be reachable through HTTP', function (done) {
    request(server())
      .get('/')
      .then((response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.html;
        done();
      });
  });

  describe('error pages', function () {
    it('should display a 404-page for non-existent URLs', function (done) {
      request(server())
        .get('/this-path-will-never-exist')
        .then((response) => {
          expect(response).to.have.status(404);
          expect(response).to.be.html;
          done();
        });
    });
  });
});
