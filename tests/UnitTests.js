// Тест модели Ханойских башенок
module("Модель Ханойских башенок");
var HM = new HanoiModel(5);
function okCircles(nStick, arr) {
    for (var i = 0; i < arr.len; i++) {
        if (HM.Sticks[nStick][i] != arr[i]) return false;
    }
    return HM.Sticks[nStick].length;
}
test("Модель должна существовать", function () {
    ok(HM, "Модель башенок должна существовать");
    equal(okCircles(0, [0, 1, 2, 3, 4]),5, 'Все кольца в порядке');
    strictEqual(HM.Sticks[2].length, 0, 'нет колец на 2-ом стержне');
});
test("Перемещение кольца", function () {
    // Переводим тест в режим "пауза"
    stop();
    setTimeout(function () {
        HM.MoveHead(4, 0, 2);
        equal(okCircles(0, [0, 1, 2, 3]), 4, 'Все кольца в порядке');
        equal(okCircles(2, [4]), 1, 'Все кольца в порядке');
        // После вызова утверждения продолжаем тест
        start();
        (new HanoiView(HM, "TestHanoiView")).DrawAll();
    }, 100);
});

/*/ Тест интерфейса Ханойских башенок
module("Визуализация Ханойских башенок");
var HM = new HanoiModel(59);
var HV = new HanoiView(HM, "TestHanoiView");
test("Визуализация должна существовать", function () {
    ok(HV.ctx.fillStyle, "viewModel для нашей формы проинициалзировалась");
    ok(HV.DrawCircle(0, 0, 0),"Нарисовали нижнее кольцо на первом штыре"); // Штырь, позиция снизу, номер кольца
    ok(HV.DrawCircle(2, 58, 58),"Нарисовали нижнее кольцо на первом штыре");
});
/*/