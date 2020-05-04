(function() {
    var config = window.viConfig;
    if (!config) {
        config = window.viConfig = {};
    }

    config.language = 'ru';
    config.languages = 'en|English;ru|Русский';
    config.assetsUrl = 'assets/';

    //config.apiUrl = '/api';
    //config.socketUrl = '';
    
    config.apiUrl = 'http://localhost:3001/api';
    config.socketUrl = 'http://localhost:3001/';

    // config.apiUrl = 'http://10.244.26.15:3000/api';
    // config.socketUrl = 'http://10.244.26.15:3000/';

    config.theme = 'dark';
    config.themes = [
        {
            name: 'light',
            isDark: false,
            styles: {
                chartBarColorFABRIC: '#81D4FA',
                chartLineColorFABRIC: '#039BE5'
            }
        },
        {
            name: 'dark',
            isDark: true,
            styles: {
                chartBarColorFABRIC: '#585858',
                chartLineColorFABRIC: '#4fc3f7'
            }
        }
    ];
})();
