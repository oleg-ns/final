$('#modalLogIn').on('shown.bs.modal', function () {
    $('#myInput').focus()
})
$('#modalSignIn').on('shown.bs.modal', function () {
    $('#myInput').focus()
})

$('img').on("mouseover", function () {
    var target = $( event.target );
    if (target.is('#barcelona')) {
        $('.barcelonaAbout').css({
            "display": "block"
        })
        }
    if (target.is('#paris')) {
        $('.parisAbout').css({
            "display": "block"
        })
    }
    if (target.is('#kiev')) {
        $('.kievAbout').css({
            "display": "block"
        })
    }
    })
$('img').on("mouseout", function () {
    var target = $( event.target );
    if (target.is('#barcelona')) {
        $('.barcelonaAbout').css({
            "display": "none"
        })
    }
    if (target.is('#paris')) {
        $('.parisAbout').css({
            "display": "none"
        })
    }
    if (target.is('#kiev')) {
        $('.kievAbout').css({
            "display": "none"
        })
    }
})

