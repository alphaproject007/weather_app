module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      reporters: ['progress', 'coverage'], 
      coverageReporter: {
        type: 'html',
        dir: 'coverage/',
        subdir: '.',
        check: {
          global: {
            statements: 70,  
            branches: 70,    
            functions: 70,   
            lines: 70  
          }
        }
      },
      browsers: ['ChromeHeadless'],
      singleRun: true
    });
  };
  