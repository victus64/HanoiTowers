// Модель Ханойских башенок
/* Зависимости (пока модулю самому ничего не нужно)
var EventEmitter = require('events').EventEmitter
  , spawn = require('child_process').spawn;
 */
/**
 * Модуль отдает объект HanoiModel;
 */
// Состояние
function HanoiModel(n) {
    // Стержни
    this.N = n;
    // 3 стержня. Самая нижняя позиция на стержне 0, вверх не больше 63
    this.Sticks = [(function (n) {
        //assert
        var stick = [];
        for (var i = 0; i < n; i++) {
            stick.push(i);
        }
        return stick;
    })(n), [], []];
    this.MoveHead = function (lvl, from, to) {
        if (lvl == this.Sticks[from].length - 1) {
            // Перемещаем самое верхнее кольцо
            this.Sticks[to].push(this.Sticks[from].pop());
        }
    };
}
