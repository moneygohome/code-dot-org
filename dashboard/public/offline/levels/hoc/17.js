var appOptions = {"levelId":"custom","sendToPhone":true,"scriptId":17,"levelGameName":"CustomMaze","level":{"skin":"scrat","maze":"[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,2,0,0],[0,0,0,0,0,1,0,0],[0,1,1,3,0,1,0,0],[0,1,0,0,0,1,0,0],[0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]]","instructions":"Ok, let's do that again for practice - this isn't very different, but watch out for the wall!","is_k1":"false","skip_instructions_popup":"false","ideal":"5","disable_param_editing":"true","disable_variable_editing":"false","start_direction":"2","step_mode":"0","step_speed":"2","use_modal_function_editor":"false","toolbox_blocks":"\u003Cxml\u003E\u003Cblock type=\"maze_moveForward\"/\u003E\u003Cblock type=\"maze_turn\"\u003E\u003Ctitle name=\"DIR\"\u003EturnLeft\u003C/title\u003E\u003C/block\u003E\u003Cblock type=\"maze_turn\"\u003E\u003Ctitle name=\"DIR\"\u003EturnRight\u003C/title\u003E\u003C/block\u003E\u003Cblock type=\"maze_forever\"/\u003E\u003Cblock type=\"maze_if\"\u003E\u003Ctitle name=\"DIR\"\u003EisPathLeft\u003C/title\u003E\u003C/block\u003E\u003C/xml\u003E","required_blocks":"\u003Cxml\u003E\u003Cblock type=\"maze_forever\"/\u003E\u003Cblock type=\"maze_moveForward\"/\u003E\u003Cblock type=\"maze_if\"\u003E\u003Ctitle name=\"DIR\"\u003EisPathRight\u003C/title\u003E\u003C/block\u003E\u003Cblock type=\"maze_turn\"\u003E\u003Ctitle name=\"DIR\"\u003EturnRight\u003C/title\u003E\u003C/block\u003E\u003C/xml\u003E","puzzle_number":17,"stage_total":20,"step":false,"stepOnly":false,"edit_blocks":null,"edit_blocks_success":"You successfully edited the blocks.","startDirection":2,"skipInstructionsPopup":false,"isK1":false,"levelBuilderRequiredBlocks":"\u003Cxml\u003E\u003Cblock type=\"maze_forever\"/\u003E\u003Cblock type=\"maze_moveForward\"/\u003E\u003Cblock type=\"maze_if\"\u003E\u003Ctitle name=\"DIR\"\u003EisPathRight\u003C/title\u003E\u003C/block\u003E\u003Cblock type=\"maze_turn\"\u003E\u003Ctitle name=\"DIR\"\u003EturnRight\u003C/title\u003E\u003C/block\u003E\u003C/xml\u003E","toolbox":"\u003Cxml\u003E\u003Cblock type=\"maze_moveForward\"/\u003E\u003Cblock type=\"maze_turn\"\u003E\u003Ctitle name=\"DIR\"\u003EturnLeft\u003C/title\u003E\u003C/block\u003E\u003Cblock type=\"maze_turn\"\u003E\u003Ctitle name=\"DIR\"\u003EturnRight\u003C/title\u003E\u003C/block\u003E\u003Cblock type=\"maze_forever\"/\u003E\u003Cblock type=\"maze_if\"\u003E\u003Ctitle name=\"DIR\"\u003EisPathLeft\u003C/title\u003E\u003C/block\u003E\u003C/xml\u003E","map":[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,2,0,0],[0,0,0,0,0,1,0,0],[0,1,1,3,0,1,0,0],[0,1,0,0,0,1,0,0],[0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]],"disableParamEditing":true,"disableVariableEditing":false,"useModalFunctionEditor":false,"scale":{"stepSpeed":2}},"skinId":"scrat","callouts":"[]","createCallouts":"function() {\n  $.fn.qtip.zindex = 500;\n  this.callouts.every(function(callout) {\n    var selector = callout.element_id; // jquery selector.\n    if ($(selector).length \u003C= 0) { console.log(\"Couldn't find callout target.\"); return true;}\n\n    var defaultConfig = {\n      content: {\n        text: callout.localized_text,\n        title: {\n          button: $('\u003Cdiv class=\"tooltip-x-close\"/\u003E').append($('\u003Cimg src=\"/assets/x_button.png\"/\u003E'))\n        }\n      },\n      style: {\n        classes: \"\",\n        tip: {\n          width: 20,\n          height: 20\n        }\n      },\n      position: {\n        my: \"bottom left\",\n        at: \"top right\"\n      },\n      hide: {\n        event: 'click mousedown touchstart'\n      },\n      show: false // don't show on mouseover\n    };\n\n    var customConfig = $.parseJSON(callout.qtip_config);\n    var config = $.extend(true, {}, defaultConfig, customConfig);\n    config.style.classes = config.style.classes.concat(\" cdo-qtips\");\n\n    var calloutDomElement = $(selector).qtip(config);\n    calloutDomElement.qtip('show');\n\n    return true;\n  });\n}","onInitialize":"function() {\n  this.createCallouts();\n  onInitializeListeners.forEach(function(listener) {\n    listener();\n  });\n  \n}","locale":"en_us","containerId":"blocklyApp","baseUrl":"/blockly/","cacheBust":false}