function InitCanvas(name) {
    var g = {};
    g.canvas = document.getElementById(name);
    g.ctx = g.canvas.getContext('2d'); // Получаем 2D контекст
    // Ниже выполняем рисование
    // Закрашиваем весь canvas
    g.ctx.fillStyle = "#FCFCF3";
    g.ctx.fillRect(0, 0, g.canvas.width, g.canvas.height);
    return g;
}

function Start() {
    document.writeln("<p>Тут будут строиться Ханойские башенки!</p>"); // jshint ignore:line
    var HModel = new HanoiModel(8);
    var HVModel = new HanoiView(HModel, "HanoiTower");
    HVModel.DrawAll();
}

function circle(n, vm) {
    if (!vm) vm = HVModel; // Если вью-модель не передали - модель по умолчанию.
    this.vm = vm; // Запоминаем в каком окружении работаем
    this.state = 'free';
    this.n = n;
    var w = vm.canvas.width, h = vm.canvas.height;
    this.h = 0 ^ (h / 2 / Math.max(vm.N, 5)); // Толщина кольца (считая, что меньше 5-ти не бывает)
    this.r = 0 ^ ((w / 80) + (vm.N - n) * ((w / 7) - (w / 80)) / vm.N); // радиус кольца
    this.color = vm.circleColors[n];
    this.ok = function () {
        return !(0 >= this.n || this.n > vm.N);
    };
    this.onStick = function (s, p) {
        this.state = 'onStick';
        this.s = s;
        this.p = p;
        var w = this.vm.canvas.width, h = this.vm.canvas.height;
        this.x = 0 ^ (w / 6 * (s * 2 + 1)); // Центр стержня по горизонтали
        this.y = h - this.h * (p + 2); // Верхняя точка кольца
        this.ok = function () {
            return !(0 >= this.s || this.s > 2 || 0 >= this.p || this.p > this.vm.N || 0 >= this.n || this.n > this.vm.N);
        };
        return this;
    };
    this.Draw = function () {
        if (this.state != 'onStick') return false;
        this.vm.ctx.fillStyle = this.color;
        var ctx = this.vm.ctx; 
        var $h = 0 ^ this.h / 2; // Половина высоты для скругленных краев
        var $r = $h * 1.3, $s = 0^$h*0.53; 
        ctx.fillRect(this.x - this.r + $s, this.y, this.r * 2 - 2*$s, this.h);
        ctx.beginPath();
        ctx.arc(this.x - this.r + $r, this.y + $h, $r, Math.PI * 0.71, Math.PI * 1.29, false);
        ctx.closePath();
        ctx.fill(); // Заливка окружности
        ctx.beginPath();
        ctx.arc(this.x + this.r - $r, this.y + $h, $r, Math.PI * 1.71, Math.PI * 0.29, false);
        ctx.closePath();
        ctx.fill(); // Заливка окружности
        return true;
    };
}

function HanoiView(hmodel, canvasName) {
    var g = InitCanvas(canvasName); 
    this.canvas = g.canvas;
    this.ctx = g.ctx;
    this.model = hmodel;
    this.N = hmodel.N;
    this.circleColors = (function (n) {
        var cc = [];
        for (var i = 0; i < n; i++) {
            cc[i] = '#' +
                (0 ^ (Math.random() * (200))+16).toString(16) + // +16 - чтобы было двузначное число
                (0 ^ (Math.random() * (200))+16).toString(16) +
                (0 ^ (Math.random() * (200))+16).toString(16);
        }
        return cc;
    })(this.N);
    this.DrawCircle = function (s, p, n) {
        return (new circle(n, this)).onStick(s, p).Draw();
    };
    this.DrawAll = function () {
        for (var i = 0; i < this.model.Sticks.length; i++) {
            for (var j = 0; j < this.model.Sticks[i].length; j++) {
                this.DrawCircle(i, j, this.model.Sticks[i][j]);
            }
        }
    };
}


