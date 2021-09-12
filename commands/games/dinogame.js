const Discord = require('discord.js');
const ms = require('ms');
   
module.exports = {
 name: 'dinochrome',
 category: 'Fun Command',

 run : async(client, message, args) => {

  let msg = await message.channel.send(`---------------🦖`)
  let time = 1*1000

  setTimeout(function(){
    msg.edit(`-----------🦖----`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`----------🦖------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`--------🦖--------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`------🦖-----------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`-------🦖-----------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`---🌵-----🦖---------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`---🌵-🦖-------------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`🦖\n ---🌵--------------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`------🦖---🌵--------------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`----🦖-----🌵----------------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`-🌵🌵-----🦖-------🌵--------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`----🌵🌵-🦖----------🌵------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`🦖\n ---🌵🌵-------------🌵---`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`-----🦖---🌵🌵-------------🌵--`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`-------🦖-----🌵🌵-------------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`🎂----🦖--------🌵🌵-----------`)
  }, time)
  time += 1.5*1000

  setTimeout(function(){
    msg.edit(`---🎂--🦖----------🌵🌵---------`)
  }, time)
  time += 1.5*1000
  
  setTimeout(function(){
    msg.edit(`**Ⓜⓘⓢⓢⓘⓞⓝ Ⓒⓞⓜⓟⓛⓔⓣⓔⓓ !**\n ---🎂🦖----------🌵🌵-------------`)
   }, time)
 }
}