$('.uf-submit-simple').on('click', function(e) {
 
  var name = $(this).parent().find('input[name="your-name"]');
  var phone = $(this).parent().find('input[name="your-phone"]');
  var mail = $(this).parent().find('input[name="your-mail"]');
  var message = $(this).parent().find('textarea[name="your-message"]');
  var file = $(this).parent().find('input[type="file"]');

  if(check_input_return(name) && check_input_return(phone)){

    name.parent().find('.alert').hide();
    name.parents('form').find('.alert-global').hide();

    var formData = new FormData();
    var ajax_loader = $(this).parents('form').find('.ajax-loader');
    var alert_ok = $(this).parents('form').find('.alert-global-ok');

    //присоединяем остальные поля
    formData.append('name', getVal(name));
    formData.append('phone', getVal(phone));
    
    if(mail.attr('type') != undefined)
      formData.append('mail', getVal(mail));

    if(message.attr('name') == "your-message"){
      formData.append('message', getVal(message));
    }

    if(file.attr('id') != undefined){
      jQuery.each($('#uf-file')[0].files, function(i, thefile) {
        // присоединяем наш файл
        formData.append('file_v', thefile);
      });
    }

    my_ajax_virtual(ajax_loader, alert_ok, formData);
  }

  return false;   
});

function my_ajax_virtual(ajax_loader, alert_ok, formData) {
  alert_ok.show();
}

function my_ajax(ajax_loader, alert_ok, formData) {
  //отправляем через ajax
  $.ajax({
    url: "/send.php",
    type: "POST",
    dataType : "json", 
    cache: false,
    contentType: false,
    processData: false,         
    data: formData, //указываем что отправляем
    beforeSend: function(){
      ajax_loader.css('visibility','visible');
    },
    success: function(data){
      alert_ok.show();
      ajax_loader.css('visibility','hidden');
    }
  });
}


// validation when user writing
$('input[name="your-name"], input[name="your-phone"], input[name="your-mail"]').keyup(function(){check_input(this);});

// functions
function check_input(e){
  var name = $(e);
  if(getVal(name) == ''){
    name.parent().find('.alert').show();
    name.parents('form').find('.alert-global').show();
    name.parents('form').find('.alert-global-ok').hide();
  } else {
    name.parent().find('.alert').hide();
    name.parents('form').find('.alert-global').hide();
  }
}

function check_input_return(name){
  // return (getVal(name) == '') ? false : true;
  if(getVal(name) == ''){
    name.focus();
    name.parent().find('.alert').show();
    name.parents('form').find('.alert-global').show();
    name.parents('form').find('.alert-global-ok').hide();

    return false;
  } else {
    return true;
  }
}
function getVal(name){
  return name.val().trim();
}
