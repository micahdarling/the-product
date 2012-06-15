/* ---------------------------------------------------------------------
Global JavaScript & jQuery

Target Browsers: All
Authors: Micah Darling
------------------------------------------------------------------------ */

var NERD = NERD || {};

(function($){

    $(function() {

        // Initialize!
        NERD.ExternalLinks.init();
        NERD.AutoReplace.init();

    });

}(jQuery));

/* ---------------------------------------------------------------------
ExternalLinks
Author: Micah Darling
Launches links with a rel="external" in a new window
------------------------------------------------------------------------ */

NERD.ExternalLinks = {
    init: function() {
        $('a[rel=external]').attr('target', '_blank');
    }
};

/* ---------------------------------------------------------------------
AutoReplace
Author: Micah Darling
Mimics HTML5 placeholder behavior

Additionally, adds and removes 'placeholder-text' class, used as a styling
hook for when placeholder text is visible or not visible

Additionally, prevents forms from being
submitted if the default text remains in input field - which we may 
or may not want to leave in place, depending on usage in site
------------------------------------------------------------------------ */
NERD.AutoReplace = {
    $fields: undefined,

    init: function() {
        var $fields = $('[placeholder]');

        if ($fields.length !== 0) {
            var self = this;
            self.$fields = $fields.addClass('placeholder-text');
            self.bind();
        }
    },

    bind: function() {
        var self = this;
    
        self.$fields.each(
            function() {
                var $this = $(this);
                var defaultText = $this.attr('placeholder');
                $this.attr('placeholder', '').val(defaultText);

                $this.focus(
                    function() {
                        if ($this.val() === defaultText) {
                            $this.val('').removeClass('placeholder-text');
                        } 
                    }
                );

                $this.blur(
                    function() {
                        if ($this.val() === '') {
                            $this.val(defaultText).addClass('placeholder-text');
                        }
                    }
                );

                $this.parents('form').submit(
                    function() {
                        if ($this.is('.required') && $this.val() === '') {
                            return false;
                        } else {
                            $this.val('');
                        }
                    }
                );
            }
        );
    }
};

