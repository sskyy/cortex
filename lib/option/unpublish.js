'use strict';

var node_path   = require('path');
var node_url    = require('url');
var profile     = require('cortex-profile');
var fs          = require('fs-sync');


exports.options = {
    force: {
        short: 'f',
        type: Boolean,
        info: 'whether to force unpublishing.',
        value: false
    },

    cwd: {
        type: node_path,
        short: 'c',
        value: process.cwd(),
        info: 'specify the current working directory.'
    },

    module: {
        type: String,
        info: 'the package to be unpublished.',

        // cortex unpublish --pkg a
        // cortex unpublish a

        // @returns {Array.<string>} ATTENSION!
        value: function(module, parsed, tools) {
            if(!module){
                var remain = parsed.argv.remain;

                if( remain.length ){
                    module = remain[0];

                }else{
                    var package_file = node_path.join( parsed.cwd, 'package.json' );

                    if( fs.exists(package_file) ){
                        var json = fs.readJSON(package_file);

                        module = json.name;

                    }else{
                        return tools.error('You must specify a package to unpublish.');
                    }
                }
            }

            return module;
        }
    }
};

exports.info = 'Unpublish a package.';

exports.usage = [
    '{{name}} unpublish [options]',
    '{{name}} unpublish <project>[@<version>] [options]'
];
