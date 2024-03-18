$("#jeux").ready(function () {
    game = new plateau("#jeux");
    game.start()
});

$.fn.plugin = function (options) {
    game.plateau()
    game.style()
    $(".col").click(function (e) {
        game.play(e.target.parentNode)
        game.player_1(e.target.parentNode)
        game.player_2(e.target.parentNode)
    })
}