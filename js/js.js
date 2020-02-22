// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBclKw9m-KFAiSXq5AJ_5VWLXaa9W9i40k",
    authDomain: "luan-general-projects.firebaseapp.com",
    databaseURL: "https://luan-general-projects.firebaseio.com",
    projectId: "luan-general-projects",
    storageBucket: "luan-general-projects.appspot.com",
    messagingSenderId: "583062617411",
    appId: "1:583062617411:web:d8c258abe7ef4f15ea43f6",
    measurementId: "G-89KBJPBW5T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$( document ).ready(function() {

    firebase.database().ref('inssstats').once('value', function(snapshot) {
        var statsofpage = snapshot.val();
        var novoacesso = statsofpage.acessos + 1;
        // console.log(novoacesso)
        firebase.database().ref('inssstats').update({
            "acessos": novoacesso
        });
    })

    firebase.database().ref('inssstats').on('value', function(snapshot) {
        var statsofpage = snapshot.val();
        // .then(function(){
        $("#valinss").text(statsofpage.calculos)
        $("#valacessos").text(statsofpage.acessos)
    });
});

function arrendondar(numero,decimais) {
    var decimaisarredondar = Math.pow(10, decimais);
    var numeroarredondar = (Math.round( numero * decimaisarredondar )/decimaisarredondar).toFixed(2);
    return numeroarredondar
}
$("#botaocalcular").on("click", function() {

    firebase.database().ref('inssstats').once('value', function(snapshot) {
        var statsofpage = snapshot.val();
        var novocalculo = statsofpage.calculos + 1;
        // console.log(novoacesso)
        firebase.database().ref('inssstats').update({
            "calculos": novocalculo
        });
    })

    firebase.database().ref('inssstats').on('value', function(snapshot) {
        var statsofpage = snapshot.val();
        // .then(function(){
        $("#valinss").text(statsofpage.calculos)
        $("#valacessos").text(statsofpage.acessos)
    });

    var valoracalcular = $("#inputcalcular").val();
    var valorfaixa1 = 0;
    var valorfaixa2 = 0;
    var valorfaixa3 = 0;
    var valorfaixa4 = 0;
    var aliquotafaixa1 = 0;
    var aliquotafaixa2 = 0;
    var aliquotafaixa3 = 0;
    var aliquotafaixa4 = 0;
    if (valoracalcular <= 1045) {
        valorfaixa1 = valoracalcular;
        aliquotafaixa1 = valorfaixa1*0.075;
        valoracalcular = 0;
    }
    if (valoracalcular > 1045 && valoracalcular <= 2089.6) {
        valorfaixa1 = 1045;
        aliquotafaixa1 = valorfaixa1*0.075;
        valorfaixa2 = valoracalcular - valorfaixa1;
        aliquotafaixa2 = valorfaixa2*0.09;
    }
    if (valoracalcular > 2089.60 && valoracalcular <= 3134.4) {
        valorfaixa1 = 1045;
        aliquotafaixa1 = valorfaixa1*0.075;
        valorfaixa2 = 1044.60;
        aliquotafaixa2 = valorfaixa2*0.09;
        valorfaixa3 = valoracalcular - valorfaixa1 - valorfaixa2;
        aliquotafaixa3 = valorfaixa3*0.12;
    }
    if (valoracalcular > 3134.4 && valoracalcular <= 6101.06) {
        valorfaixa1 = 1045;
        aliquotafaixa1 = valorfaixa1*0.075;
        valorfaixa2 = 1044.60;
        aliquotafaixa2 = valorfaixa2*0.09;
        valorfaixa3 = 1044.80;
        aliquotafaixa3 = valorfaixa3*0.12;
        valorfaixa4 = valoracalcular - valorfaixa1 - valorfaixa2 - valorfaixa3;
        aliquotafaixa4 = valorfaixa4*0.14;
    }
    if (valoracalcular > 6101.06) {
        valorfaixa1 = 1045;
        aliquotafaixa1 = valorfaixa1*0.075;
        valorfaixa2 = 1044.60;
        aliquotafaixa2 = valorfaixa2*0.09;
        valorfaixa3 = 1044.80;
        aliquotafaixa3 = valorfaixa3*0.12;
        valorfaixa4 = 2966.66;
        aliquotafaixa4 = valorfaixa4*0.14;
    }
    $("#contribfaixa1").text("R$ "+arrendondar(valorfaixa1,2));
    $("#valorfaixa1").text("R$ "+arrendondar(aliquotafaixa1,2));
    $("#contribfaixa2").text("R$ "+arrendondar(valorfaixa2,2));
    $("#valorfaixa2").text("R$ "+arrendondar(aliquotafaixa2,2));
    $("#contribfaixa3").text("R$ "+arrendondar(valorfaixa3,2));
    $("#valorfaixa3").text("R$ "+arrendondar(aliquotafaixa3,2));
    $("#contribfaixa4").text("R$ "+arrendondar(valorfaixa4,2));
    $("#valorfaixa4").text("R$ "+arrendondar(aliquotafaixa4,2));
    $("#valorconttotal").text("R$ "+arrendondar((valorfaixa1+valorfaixa2+valorfaixa3+valorfaixa4),2));
    $("#valortotal").text("R$ "+arrendondar((aliquotafaixa1+aliquotafaixa2+aliquotafaixa3+aliquotafaixa4),2));

    // window.alert(valorfaixa1)
    // window.alert(valorfaixa2)
    // window.alert(valorfaixa3)
    // window.alert(valorfaixa4)
    // window.alert(valoracalcular)
})
