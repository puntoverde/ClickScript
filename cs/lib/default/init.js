/**
 * ClickScript - ClickScript is a visual programming language. This is a 
 * data flow programming language running entirely in a web browser.
 * Copyright (C) 2012 Lukas Naef
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * @author lnaef
 */
dojo.provide("cs.lib.default.init");

	/*
	 * ADD DEFAULT TYPES
	 */
	if(!cs.library.hasType("cs.type.String")){
		cs.library.addTypeStructure("cs.type.String","rgba(98,178,19,1)");
	}
	if(!cs.library.hasType("cs.type.Boolean")){
		cs.library.addTypeStructure("cs.type.Boolean","rgba(12,88,150,1)");
	}
	if(!cs.library.hasType("cs.type.Number")){
		cs.library.addTypeStructure("cs.type.Number","rgba(240,180,40,1)");//"rgba(249,74,13,1)");
	}
	
	
	/*
	 * ADD DEFAULT METACOMPONENTS
	 */
	cs.componentContainer.push({
			name: "cs.statement.program",
			description: "This represents a clickscript program.",
			blocks: [
				{name: "PROGRAM"}
			],
			exec : function(state){
				state.blocks.item(0).run();
			}
		});

	
	
	cs.componentContainer.push({
			name: "cs.default.primitive.string",
			description: "This modul represents a single string.",
			inputs: [],
			outputs: [{
				name: "Output string",
				type: "cs.type.String"
			}],
			fields: [{
				name: "single string",
				type: "cs.type.String"
			}],
			image: "",
			blocks: [],
			exec: function(state){
				state.outputs.item(0).setValue(state.fields.item(0).getValue());
			}
		});
	
	
	cs.componentContainer.push({
			name: "cs.default.primitive.number",
			description: "This modul represents a single number.",
			inputs: [],
			outputs: [{
				name: "Output number",
				type: "cs.type.Number"
			}],
			fields: [{
				name: "single string",
				type: "cs.type.Number"
			}],
			image: "",
			exec: function(state){
				state.outputs.item(0).setValue(parseFloat(state.fields.item(0).getValue()));
			},
			blocks: []
		});
	
	
	cs.componentContainer.push({
			name: "cs.default.primitive.boolean",
			description: "This modul represents a single boolean.",
			inputs: [],
			outputs: [{
				name: "Output boolean",
				type: "cs.type.Boolean"
			}],
			fields: [{
				name: "single boolean",
				type: "cs.type.Boolean"
			}],
			image: "",
			exec: function(state){
				var field = state.fields.item(0).getValue();
				var result = false;
				if(field == "1" || field.toUpperCase() == "TRUE" ){
					result = true;
				}
				state.outputs.item(0).setValue(result);
			},
			blocks: []
		});
	
	
	cs.componentContainer.push({
			name: "cs.default.ide.popup",
			description: "This modul outputs a text to an alert-box",
			inputs: [{
				name: "text",
				type: "cs.type.String"
			}],
			outputs: [],
			fields: [],
			image: "ide/alert2.png",
			blocks: [],
			exec: function(state){
				alert(state.inputs.item(0).getValue());
			}
		});
	
	
	/**
	 * Open a page in an iframe
	 */
	cs.componentContainer.push({
		name : "cs.default.ide.timer",
		description : "This modules waits for N seconds",
		inputs : [{
			name: "N - time to wait",
			type: "cs.type.Number"
		}],
		outputs: [],
		image: "ide/wait.png",
		exec : function(state){
		
			// set this execution to async > we have to call forceFinish();
			this.setAsync();
			
			// time to wait
			var ms = state.inputs.item(0).getValue();
			
			var component = this;
			setTimeout(function(){component.finishAsync();},Math.round(ms*1000));
		}
	});
	
	
	cs.componentContainer.push({
			name: "cs.default.ide.textfield",
			description: "This module allows userinput through a textfield",
			inputs: [],
			outputs: [{
				name: "text",
				type: "cs.type.String"
			}],
			fields: [],
			image: "ide/textfield.png",
			blocks: [],
			exec : function(state){
				state.outputs.item(0).setValue(state.view.getValue());	
			},
			view : {
				// how to prevent changing style on each lamp?
				source : "<input type='text' size='8' value='' style='font-size:8pt'/>",
				
				getValue : function(){
					return $(this.getNode()).val();
				}
				
				
			}
		});
	
		
		
	cs.componentContainer.push({
				name: "cs.default.ide.display",
				description: "Shows a text in a display.",
				inputs: [{
					name: "text",
					type: "cs.type.String"
				}],
				outputs: [],
				fields: [],
				image: "ide/leddisplay.png",
				blocks: [],
				exec : function(state){
					state.view.setValue(state.inputs.item(0).getValue());
				},
				view : {
					// how to prevent changing style on each lamp?
					source : "<div style='background-color:black;color:#6ff;width:80px;font-family:Courier,Courier New;'>&nbsp;</div>",
					
					setValue : function(value){
					    var text = value+"";
						$(this.getNode()).html(text);
					}
					
					
				}
			});
	