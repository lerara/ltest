function ZMZoomMenu(id, options)
{
	var self = this; // default rename of this
	
	self.wrapper = document.getElementById(id); // animation wrapper selected by given id
	if (!self.wrapper)
	{
		throw 'There is no menu element for the given element ID';
	}

	self.content = self.wrapper.querySelector('.zm-content-wrapper');

	self.shown = false; // if true, the menu is currently shown


	// const defines
	self.kCloseClass = 'zm-closed';

	// handle options
	options = options || {};
	self.options = {
		center: options.center || true,
	};

	// center menu if want
	if(self.options.center === true)
	{
		var menu 		= self.wrapper.querySelector('.zm-menu');
		var menuList 	= menu.querySelector('ul');

		var menuHeight 		= menu.clientHeight;	 // get menu height
		var menuListHeight	= menuList.offsetHeight; // get list height with current padding

		if (menuHeight > menuListHeight)
		{
			var padding =  Math.floor((menuHeight - menuListHeight) / 2.0);
			menuList.style.marginTop = padding + 'px';
		}
	}


	// scan links and add click event
	var links = self.wrapper.querySelectorAll('.zm-menu ul li a');

	for (var i = 0; i < links.length; i++)
	{
		var link = links[i];
		link.addEventListener('click', function(){
			self.hide();
		});
	}

	// setup overlayer div for open menu
	self.touchOverlayer = document.createElement('div');
	self.touchOverlayer.className = 'zm-touch';

	self.touchOverlayer.addEventListener('click', function(){
		self.hide();
	});
}

ZMZoomMenu.prototype.show = function()
{
	var self = this; // default rename of this

	var classStr = self.wrapper.getAttribute('class');
	classStr = classStr.replace(self.kCloseClass, '');
	classStr = classStr.trim(' ');

	self.wrapper.setAttribute('class', classStr);

	self.content.appendChild(self.touchOverlayer);
};

ZMZoomMenu.prototype.hide = function()
{
	var self = this; // default rename of this

	var classStr = self.wrapper.getAttribute('class');

	if (classStr.indexOf(self.kCloseClass) === -1)
	{
		classStr += ' '+self.kCloseClass;
	}

	self.wrapper.setAttribute('class', classStr);
	self.content.removeChild(self.touchOverlayer);
};

