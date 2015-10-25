var specIsRunningTooLobg = 15000;

describe("animation", function() {

	it("should beDone shield", function(done) {
		document.addEventListener("canvas_done", function() {
			expect(false).toBeTruthy();
			done();
		});
	}, specIsRunningTooLobg);

});