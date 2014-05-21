
adc(app, function(calback) {
   setTimeout(function() {
       var timer = 0;
       callback(null, {
           encoder0Pin: function(pin) {
               console.log('MOCK adc.encoder0Pin', pin);
           },
           encoder1Pin: function(pin) {
               console.log('MOCK adc.encoder1Pin', pin);
           },
           encoder0Threshold: function(threshold) {
               console.log('MOCK adc.encoder0Threshold', threshold);
           },
           encoder1Threshold: function(pin) {
               console.log('MOCK adc.encoder1Threshold', threshold);
           },
           encoder0Delay: function(delay) {
               console.log('MOCK adc.encoder0Pin', delay);
           },
           encoder1Delay: function(delay) {
               console.log('MOCK adc.encoder1Pin', delay);
           },
           start: function() {
               console.log('MOCK adc.start');
               timer = 0;
           },
           stop: function() {
               console.log('MOCK adc.stop');
           },
           values: function() {
               console.log('MOCK adc.values');
               return [0, 1, 2, 3, 4, 5, 6, 7];
           },
           encoder0Values: function() {
               console.log('MOCK adc.encoder0Values');
               return [1, 2, 3, 4, 5];
           },
           encoder1Values: function() {
               console.log('MOCK adc.encoder1Values');
               return [1, 2, 3, 4, 5];
           },
           encoder0Ticks: function() {
               console.log('MOCK adc.encoder0Ticks');
               return 123;
           },
           encoder1Ticks: function() {
               console.log('MOCK adc.encoder1Ticks');
               return 345;
           },
           encoder0Speed: function() {
               console.log('MOCK adc.encoder0Speed');
               return 0.6;
           },
           encoder1Speed: function() {
               console.log('MOCK adc.encoder1Speed');
               return 0.5;
           },
           timer: function() {
               return ++timer;
           }
       });
   });
});
