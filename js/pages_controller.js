﻿exports.home = function (req, res) {
  res.render('pages/home', {
      title: 'Главная страница пустая'
    , message: 'Проверка работы страницы на "pages" controller-е'
  })
}
exports.about = function (req, res) {
  res.render('pages/about', {
      title: 'О чем это все...'
    , p1: 'Знакомство с технологиями Node.js'
    , p2: 'Простой пример странички на Bootstrup-е'
  })
}
exports.htest = function (req, res) {
  res.render('pages/htest', {
      title: 'UNUT тесты (QUnit)'
  })
}
exports.hanoi = function (req, res) {
  res.render('pages/hanoi', {
      title: 'Ханойские башни'
    , htower:'Ханойская башня'
    , text1: '<b>Ханойская башня</b> является одной из популярных головоломок XIX века. Даны три стержня, на один из которых нанизаны восемь колец, причем кольца отличаются размером и лежат меньшее на большем. Задача состоит в том, чтобы перенести пирамиду из восьми колец за наименьшее число ходов на другой стержень. За один раз разрешается переносить только одно кольцо, причём нельзя класть большее кольцо на меньшее.'
    , text2: 'Вот, например, ход решения головоломки с четырьмя дисками.'
    , hello: 'Привет из Ханоя!'
  })
}
