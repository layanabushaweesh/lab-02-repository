

// Constructor
 function Animal(animal) {
   this.title = animal.title;
   this.image_url = animal.image_url;
   this.description = animal.description;
   this.keyword = animal.keyword;
   this.horns = animal.horns;
  Animal.all.push(this);
 }
Animal.all = [];





















 
Animal.prototype.renderFirst = function() {
    const container = $('#photo-template').clone();
    $('main').append(container);
   container.find('h2').text(this.title);
   container.find('p').text(this.description);
   container.find('img').attr('src', this.image_url);

   container.removeAttr('id', '#photo-template').attr('id', this.title);
   container.attr('class', `animal ${this.keyword}`);
 };
 
 

 
 // ajax
 const ajaxSettings = {
    method: 'get',
    dataType: 'json',
  };
  
  $.ajax('../data/page-1.json', ajaxSettings).then((data) => {
    data.forEach(item => {
      let newObject = new Animal(item);
      
      newObject.renderFirst();
      newObject.renderFil();
    });
  });
  




 
Animal.prototype.renderFil = function() {
   let counter = 1;
  Animal.all.forEach(element => {
     if (element.keyword === this.keyword){
       counter --;
     }
   });
   if (counter === 0){
     const optClone = $('#filter').clone();
     $('#filter').after(optClone);
     optClone.text(this.keyword);

     optClone.removeAttr('id', 'filter');
     optClone.removeAttr('value', 'default').attr('value', `${this.keyword}`);
   }
 };
 




 // filter selection event
 $('select').change(function() {
   
  Animal.all.forEach(element => {
     if ('default' === this.value){
       $(`.${element.keyword}`).show();
     } else if (element.keyword !== this.value) {
       $(`.${element.keyword}`).hide();
     } else {
       $(`.${element.keyword}`).show();
     }
   });
 });