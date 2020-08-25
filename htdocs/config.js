(function() {
    var config = window.viConfig;
    if (!config) {
        config = window.viConfig = {};
    }

    config.language = 'ru';
    config.languages = 'en|English;ru|Русский';
    config.assetsUrl = 'assets/';
    
    config.ledgerName = 'Karma';
    config.apiUrl = 'https://hlf-explorer.karma.n-t.io';

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
