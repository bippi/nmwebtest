var postcss = require('postcss');
 
module.exports = postcss.plugin('minirleikir', function minirleikir(options) {
 
    return function (css) {
 
        options = options || {};
         
        css.walkRules(function (rule) {
            rule.walkDecls(function (decl, i) {
                //Header
                if(rule.selector == '.Header__header'){
                    switch(decl.prop){
                        case 'background':
                            decl.value = options.colors.headerBgColor;
                            break;
                        case 'border-bottom':
                            decl.value = '0.3rem solid ' + options.colors.headerBorderColor;
                            break;
                    }
                }
                
                if(rule.selector == '.Header__header h1'){
                    switch(decl.prop){
                        case 'color':
                            decl.value = options.colors.headerColor;
                            break;
                    }   
                }
                
                //Burger
                if(rule.selector == '.Burger__burger > div'){
                
                    switch(decl.prop){
                        case 'background':
                            decl.value = options.colors.burgerColor;
                            break;
                    }      
                }

                //Bottom Nav
                if(rule.selector == '.BottomNav__bottomNav a'){
                    switch(decl.prop){
                        case 'background':
                            decl.value = options.colors.bottomNavBgcolor;
                            break;
                        case 'color':
                            decl.value = options.colors.bottomNavColor;
                            break;
                        case 'border':
                            decl.value = '0.1rem solid ' + options.colors.bottomNavBorderColor;
                            break;
                    }
                }

                if(rule.selector == '.BottomNav__bottomNav a.BottomNav__active'){
                    switch(decl.prop){
                        case 'background':
                            decl.value = options.colors.bottomNavBgActiveColor;
                            break;
                        case 'color':
                            decl.value = options.colors.bottomNavActiveColor;
                            break;
                        case 'border-color':
                            decl.value =  options.colors.bottomNavBorderActiveColor;
                            break;
                    }   
                }
                //Loader
            	if(rule.selector == '.Loader__spinner'){
                    switch(decl.prop){
                        case 'border':
                            decl.value = '0.2rem solid ' + options.colors.loaderPrimary;
                            break;
                        case 'border-right-color':
                            decl.value =  options.colors.loaderSecondary;
                            break;
                        case 'border-top-color':
                            decl.value =  options.colors.loaderSecondary;
                            break;
                        case 'box-shadow':
                            decl.value = '0 0 0 0.2rem '+ options.colors.loaderPrimary + ', inset 0 0 0 0.2rem ' + options.colors.loaderPrimary;
                            break;
                    }   
                }

                //SideNav
                if(rule.selector == '.SideNav__menuWrapper'){
                    switch(decl.prop){
                        case 'background':
                            decl.value = options.colors.navBgColor;
                            break;
                    }   
                }
                if(rule.selector == '.SideNav__menu li'){
                     switch(decl.prop){
                        case 'border-bottom':
                            decl.value = '0.1rem solid ' +options.colors.navBorderColor;
                            break;
                    }      
                }
                if(rule.selector == '.SideNav__menu li a'){
                     switch(decl.prop){
                        case 'color':
                            decl.value = options.colors.navColor;
                            break;
                    }         
                }
                if(rule.selector == '.SideNav__menu li a.SideNav__activeItem'){
                     switch(decl.prop){
                        case 'color':
                            decl.value = options.colors.navActiveColor;
                            break;
                    }   
                }
            });
         
        });
    }
});