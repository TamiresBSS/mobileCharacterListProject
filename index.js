// $(document).ready(function () {
//     $('#sortOpt').click(function () {
//         const sortChars = $('#sortChars');

//         if (sortChars.hasClass('show')) {
//             sortChars.removeClass('show');
//             setTimeout(function () {
//                 sortChars.css('display', 'none');
//             }, 500);
//         } else {
//             sortChars.css('display', 'block');
//             setTimeout(function () {
//                 sortChars.addClass('show');
//             }, 10);
//         }
//     });
// });
// Versão com clique em qualquer lugar fora da tela
$(document).ready(function () {
    $('#sortOpt').click(function (event) {
        event.stopPropagation();
        // Evita que o evento de clique se propague para o documento
        const sortChars = $('#sortChars');

        if (sortChars.hasClass('show')) {
            sortChars.removeClass('show');
            setTimeout(function () {
                sortChars.css('display', 'none');
            }, 500);
        } else {
            sortChars.css('display', 'block');
            setTimeout(function () {
                sortChars.addClass('show');
            }, 10);
        }
    });
    // Adiciona um evento de clique no documento inteiro
    $(document).click(function (event) {
        const sortChars = $('#sortChars');
        // Verifica se o clique não ocorreu dentro de #sortChars
        if (!sortChars.is(event.target) && !sortChars.has(event.target).length) {
            sortChars.removeClass('show');
            setTimeout(function () {
                sortChars.css('display', 'none');
            }, 500);
        }
    });
});
