//add a ! to make the symbol go, e.g a`! would turn into à.  There's probably a better way to change that... 
//add detection of locale
(function (root){
	root.combiner = combiner();
	root.combiner.init();
	function combiner(){
		return {
			options: {
				selector: ".keyboard",
				combineMark: "!"
			},
			combiningAccents: {
				"`":"\u0300",
				".":"\u0308"
			},
			init: function(){
				var selector = this.options.selector,
				keyboards = document.querySelectorAll(selector);
				for (var i = keyboards.length - 1; i >= 0; i--) {
					keyboards[i].oninput = this.comboMaster;
				}
			},
			comboMaster: function(e){
				var input = e.srcElement.value,
					combineMark = input.charAt(input.length-1),
					combineType = input.charAt(input.length-2),
					combineLetter = input.charAt(input.length-3),
					combiner = root.combiner;
					console.log(combineMark);
				if(combineMark === combineType && combiner.combiningAccents[combineType] !== undefined){
					e.srcElement.value = e.srcElement.value.slice(0,-3);
					e.srcElement.value += combineLetter+combiner.combiningAccents[combineType];
				}
				
				console.log(input);
			}
		};
	}



})(this);