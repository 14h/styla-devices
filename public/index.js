
$.getJSON("https://spreadsheets.google.com/feeds/list/1KAQoniKQTf6JbftzhjwyZawk1YN63g6vWmaupwdiw58/od6/public/values?alt=json", function(data) {
  //first row "title" column
  let devices = data.feed.entry;
  let devices_container = $("#devices-container");
  devices.forEach((e)=>{
    // console.log(e)
    let name = e.gsx$_cn6ca? e.gsx$_cn6ca.$t : "DEPO";
    let type = e.gsx$macbook ? e.gsx$macbook.$t : "";
    let processor = e.gsx$processor ? e.gsx$processor.$t : "";
    let memory = e.gsx$memory ? e.gsx$memory.$t : "";
    let storage = e.gsx$storage ? e.gsx$storage.$t : "";
    let graphics = e.gsx$graphics ? e.gsx$graphics.$t : "";
    let tag = e.gsx$macbooktag ? e.gsx$macbooktag.$t : "";
    let color = ()=>{
      if(name.toUpperCase().includes("DEPO")){
        // return " lime accent-3"
        return " gradient-green"
      }
      if(name.toUpperCase().includes("SELL")){
        // return "deep-orange"
        return "gradient-orange"
      }
      // return "orange lighten-5"
      return "gradient"
    }

    let card = '<div class="col s12 m4 "><div class="card '+color()+'"><div class="card-content black-text"><span class="card-title name">'+ name+'</span><table class="order-details"><tbody><tr><th>Type</th><td>'+type+'</td></tr><tr><th>Processor</th><td>'+processor+'</td></tr><tr><th>Memory</th><td>'+memory+'</td></tr><tr><th>Storage</th><td>'+storage+'</td></tr><tr><th>Graphics</th><td>'+graphics+'</td></tr><tr><th>Tag</th><td class="tag-number">'+tag+'</td></tr></tbody></table></div></div></div>';
    if(e.gsx$macbooktag) devices_container.append(card);


  })
});
$(".switch :checkbox").change(() =>{
    let devices_container = $("#devices-container");
    let devices = devices_container[0].children;


    // this will contain a reference to the checkbox
    if ($("input#depo-only-checkbox")[0].checked) {
      // the checkbox is now checked
      for (e of devices){
        if(! e.innerText.toUpperCase().includes("DEPO")){
          e.style.display = 'none';

        }
      }
      $("input#sell-only-checkbox").attr("disabled", true);
      $("#search-input").attr("disabled", true);
    } else {
      // the checkbox is now no longer checked    for (e of devices){
      for (e of devices){
        if(! e.innerText.toUpperCase().includes("DEPO")){
          e.style.display = 'block';

        }
      }
      $("input#sell-only-checkbox").removeAttr("disabled");
      $("#search-input").removeAttr("disabled");
    }

});
$("input#sell-only-checkbox").change(() =>{
    let devices_container = $("#devices-container");
    let devices = devices_container[0].children;



    if ($("input#sell-only-checkbox")[0].checked) {
      // the checkbox is now checked
      for (e of devices){
        if(! e.innerText.toUpperCase().includes("SELL")){
          e.style.display = 'none';

        }
      }
      $("input#depo-only-checkbox").attr("disabled", true);
      $("#search-input").attr("disabled", true);
    } else {
      // the checkbox is now no longer checked    for (e of devices){
      for (e of devices){
        if(! e.innerText.toUpperCase().includes("SELL")){
          e.style.display = 'block';

        }
      }
      $("input#depo-only-checkbox").removeAttr("disabled");
      $("#search-input").removeAttr("disabled");
    }
  });




$("#search-input").on('input', function() {
  let devices_container = $("#devices-container");
  let devices = devices_container[0].children;
  for (e of devices){
        e.style.display = 'none';
  }

  for (e of devices){

      if(isNaN($("#search-input")[0].value)){
        if( e.innerText.toUpperCase().includes($("#search-input")[0].value.toUpperCase())){
          e.style.display = 'block';
        }

      }else{
        if(e.getElementsByClassName("tag-number")[0].innerText.includes($("#search-input")[0].value.toUpperCase())){
          e.style.display = 'block';
        }
      }

  }

});
