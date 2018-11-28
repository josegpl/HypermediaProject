import wixData from "wix-data";

$w.onReady(() => {
  loadCategorias();
  /*wixData.query('Categorias')
	  .find()
	  .then(res => {
	  	let options = [{"value": '', "label": 'All Categoria'}];
	  	options.push(...res.items.map(categoria => {
	  		return {"value": categoria.title, "label": categoria.title};
	  	}));
	  	$w('#iCategory').options = options;
	  });*/
});

let lastFilterTitle;
let lastFilterCategoria;
let debounceTimer;
export function iTitle_keyPress(event, $w) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = undefined;
  }
  debounceTimer = setTimeout(() => {
    filter($w('#iTitle').value, lastFilterCategoria);  
  }, 500);
}

export function iCategoria_change(event, $w) {
	filter(lastFilterTitle, $w('#iCategory').value);
}

function filter(title, categoria) {
  if (lastFilterTitle !== title || lastFilterCategoria !== categoria) {
    let newFilter = wixData.filter();
    if (title)
      newFilter = newFilter.contains('nome', title);
    if (categoria)
      newFilter = newFilter.contains('categoria', categoria);
    $w('#dataset1').setFilter(newFilter);		
    lastFilterTitle = title; 
    lastFilterCategoria = categoria;
  }
}

function loadCategorias() {
  wixData.query('Categorias')
	  .find()
	  .then(res => {
	  	let options = [{"value": '', "label": 'All Categoria'}];
	  	options.push(...res.items.map(categoria => {
	  		return {"value": categoria.title, "label": categoria.title};
	  	}));
	  	$w('#iCategory').options = options;
	  });

}
