$('#contact-form').on('submit', function (event) {
    event.preventDefault(); // предотвратим отправку формы - действие по умолчанию
    var that = $(event.target); // получаем ссылку на источник события - форму #contact-form            
    $.ajax({ // отправляем данные          
        // URL развернутого скрипта Google Apps Script
        url: 'https://script.google.com/macros/s/AKfycbz7GcbYnZGb2Y7rgVfrjZxbtXfRyFnIi8WsWfC_6vc-fQFJlFdI/exec',
        data: $(this).serialize(), // собираем запрос
        jsonp: 'cb', // имя параметра запроса
        jsonpCallback: 'bingo', // имя функции
        dataType: 'jsonp', // тип данных
        success: function bingo(data) {
            console.log(data); // проверим данные, полученные с бэкэнда
            if (data == 'Error') {
                alertForm({ form: that, type: 'alert-danger', msg: 'Не удалось отправить сообщение' });
                return;
            }
            alertForm({ form: that, type: 'alert-success', msg: 'Ваше сообщение отправлено' });
            that.find('textarea').val('');
        },
        error: function () {
            alertForm({ form: that, type: 'alert-danger', msg: 'Не удалось отправить сообщение' });
        }
    });
});

// функция вывода сообщений в модальную форму
function alertForm(alert) {
    var div = $('<div class="alert ' + alert.type + '" style="display: none;">' + alert.msg + '</div>');
    alert.form.prepend(div);
    div.slideDown(400).delay(3000).slideUp(400, function () {
        alert.form.closest('.modal').modal('hide');
        div.remove();
    });
}
